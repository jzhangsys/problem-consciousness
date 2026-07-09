---
name: pc-control-loop
description: 問題意識控制環(PC-gate + feedback loop)。pipeline 每個牽涉語意的步驟後面接一個問題意識閘,不過就回圈重做該步、不放行下游(錯誤不延續/不放大);先小批過閘再放大(cheap-first);全程記 ledger。當要跑任何多步、會牽涉語意的 pipeline(harvest/抽取/KG/排序),或要避免錯誤累積、確保每步都錨問題意識時觸發。
---

# 問題意識控制環(不讓錯誤延續/放大,每步指令都有效)

## 為什麼(用戶定調)
不能讓錯誤延續甚至放大、不漏重點、每次指令都有效、不浪費時間。做法:**每個語意步驟後接閘 + 回圈 + cheap-first**。對應 problem-consciousness-every-semantic-step 的 8 步。

## 機制(`pc_gate.py`)
每個語意步驟 S:
1. **錨**:載入 `problem_nodes`(概念/實質/PAIN 痛點)當判準。
2. **做**:執行 S。
3. **閘 GATE(S)**:以問題意識為錨檢查產物(覆蓋夠不夠、schema 全不全、痛點對不對得上瓶頸)→ `{pass, reason, misses}`,寫 `pc_gate_ledger.jsonl`。
4. **不過 → 回圈**:`loop()` 從問題框定重構該步輸入、重做,最多 K 次;**仍不過 → STOP,不放行下游**(這就是「不放大」)。
5. **過 → 放行**:記 before→after,進 S+1。

## ★夠用即止(防 overfitting,用戶定調)
閘的目標是「夠用」不是「完美」:欄位完整度達**~80%** 即放行,不為了衝到 100% 反覆微調 prompt/reduce(會 overfit 到當前小樣本)。fallback 補救**只跑一輪**,補完到 ~80% 就收手進下游。寧可誠實留白(某專利內文確實沒數值/痛點),不要硬擠。

## ★cheap-first(省時間的關鍵)
整條鏈**先跑小批**(如 12 件)逐閘 → 在「抽取審視/確認」設審視點 → 確認對了才放大到全量。錯誤只花小批成本,不是全量跑完才發現錯。

## ★誰判定「對了」= Claude(用戶定調)
「抽取審視/確認」的對錯由 **Claude Code 自己判定**,不丟回用戶每批確認。Claude 對著問題意識錨(節點 PAIN、概念/實質軸)+ 領域專家物理批判(該領域原生量化指標的數值檢查)逐筆判 PASS/FAIL,寫進 ledger 並附理由;只有 Claude 判 PASS 才放大。用戶只在 Claude 判不準/有疑義時介入。

## ★跑死掉應對機制(dead-run handler)
長跑(PDF/ollama/瀏覽器)必須自癒,不可悄悄卡死或丟失進度:
- **per-unit timeout**:每個 PDF 下載 / ollama 呼叫都帶 timeout,單一 hang 不拖垮整跑。
- **per-seed checkpoint**:每處理一筆就存檔(done set),可續跑,重跑只補未完成。
- **heartbeat**:每筆更新 `*_heartbeat.json`(時間戳+進度);watchdog 輪詢。★死活判斷一律用 **heartbeat 時間戳新鮮度**(>300s 沒更新=真卡死),**不要用 `ps`**(python:slim 容器沒有 `ps`,會永遠回 0 = 假死警報,害你誤「續跑」)。卡死才 kill → 從 checkpoint 續(該筆標 failed 跳過)。
- **skip-on-fail**:單筆失敗記錄並跳過,不中斷全跑;連續失敗超過上限 → STOP 並存狀態+具體原因(不靜默卡死)。
- **資源前檢**:跑前檢查磁碟/ollama 存活(本專案踩過磁碟爆+服務沒起)。

## 既有閘(patent-frontier 用,可擴充)
- `gate_coverage(rows)` — 步驟1-3:13 節點 × {concept,entity} 每格 ≥ min;漏格=misses → 觸發再檢索。
- `gate_extraction_schema(extractions)` — 步驟4:每筆抽齊「全套」(痛點/解決方案/材料+量化/新穎性+申請人年份),缺核心欄→丟回重抽。
- `gate_anchor(extractions)` — 步驟5:抽到的痛點要語意對得上 source_node 的 PAIN,離錨→重指派/剔除/人工審。
- `loop(step, act, gate, reformulate, max_k)` — 回圈控制器。
- `ledger(step, status, ...)` — 全程可見,不悄悄改。

## 用法
每加一個語意步驟,就配一個 `gate_*`,接進 `loop()`;跑前先 cheap-first 小批。實證:對 323 件種子跑 `gate_coverage` 當場抓出只覆蓋 14/26 格、漏 12 格——錯誤被攔在進 KG 之前。

相關:problem-consciousness-every-semantic-step、[[patent-frontier-pc]]、普查對稱閘(母體對稱/同語域計數)、[[expert-critique-chain]](確認層可掛物理批判)。
