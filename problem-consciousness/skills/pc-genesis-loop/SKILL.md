---
name: pc-genesis-loop
description: ★問題意識「創世步驟」總控:input 一進來就發動,是全 pipeline 所有問題意識邏輯的開端。三角色(策略/監督/批判)互鎖 loop,三章(框架→關鍵字→驗證)依序闖關,只有通關才能往下一步。當要框定問題、生成/驗證關鍵字、建立 KG/RAG schema 與語料的源頭時觸發。下游 KG/RAG/扭曲度/幾何/翻譯全部依賴本步產出的 schema 與語料。
---
# 問題意識創世 loop(input → 全 pipeline 的根)

## 為什麼這步最重要(用戶 2026-06-17 定調)
input 一進來**就在這裡**展開所有「問題意識邏輯」。後面 KG、RAG、語域扭曲、幾何白地、翻譯、問題意識再應用、整條 pipeline——**全部依靠這一步產出的 schema 與語料**。這裡草率,後面全錯且無法挽救。所以本步要「極盡所能的細緻、嚴謹」。

## 三角色(每章都必須三角色齊備,各≥2 skills)
- **策略 (Strategy)**:提出方案(框架/關鍵字/驗證設計)。目標=覆蓋與正確,不是省事。
- **監督 (Supervision)**:檢查「過程與覆蓋」的紀律——有沒有漏、有沒有偏、量綱對不對、provenance 全不全。監督**不重做**策略的工作,只查紀律。
- **批判 (Critique)**:敵對審查者,假設策略是錯的,主動找反例、誤殺、套套邏輯、缺漏。**不確定時預設駁回**。

三角色**必須是分開的 pass**,策略不准替自己打分;批判不准看策略的自我辯護。

## 三章順序(只有通關才往下一步)
```
A 問題意識框架  →[gate A]→  B 關鍵字生成  →[gate B]→  C 驗證方法  →[gate C]→  harvest/KG/RAG
```
每章內部跑:**策略產出 → 監督審 → 批判攻 → 任一不過則帶著意見回策略重做 → 直到監督∧批判皆 PASS → gate 開**。
★節點斷點標準補救:任何 gate 用 `_pc_node_matrix.py` 驗「每節點×每階段」;若某 problem_id 下游有覆蓋卻在驗證缺(紅海寬詞被精準度閘剔)→ 觸發 [[narrow-keyword-backfill]] 補窄關鍵字閉合斷點(實證 54/57→57/57)。此補救接在【每一個】出現此狀況的端點,非單一 case。
每個 gate 寫一筆紀錄到 `claim_pilot/genesis_gate.json`:`{chapter, round, strategy_skills, supervision_verdicts, critique_verdicts, pass:bool, unresolved:[...]}`。**gate 未 pass,禁止啟動下一章的任何動作**(含 harvest)。

## ★鐵律一:去除注意力稀釋(attention dilution)
清單一長,後段就被草率對待——禁止。
1. **逐項等權**:第 N 項要跟第 1 項一樣嚴。監督 pass 必須**反序 / 隨機序**重掃一遍(別總是從頭開始)。
2. **禁止 `...` 截斷**:任何「前 12 個」「等等」「略」一律視為缺陷。要嘛全做,要嘛寫明被排除者與理由。
3. **顯式計數斷言**:每份清單結尾寫「應有 N 項、實得 N 項、逐項已查」,數字對不上即 FAIL。

## ★鐵律二:去除最近性偏誤(recency bias)
1. **不得偏重熱門/近期題目**:老而承重的瓶頸與新潮題目同等對待。
2. **不得被「剛看到的證據」主導**:判準必須是**確定性、可重現**的規則,不是「我這次探針剛好看到什麼」。同樣 input 重跑要得同樣結論。
3. **外部基準對齊**:覆蓋以外部清單(教科書瓶頸、CPC/IPC 大類、roadmap)校,不以記憶。找資料一律走 openclaw_workspace 機制(真瀏覽器,零付費)。

## 與既有 skill 的關係
本 loop 把以下既有 skill 編成三角色:策略借 [[problem-framing]] [[problem-decomposition]] [[problem-anchored-harvest]];批判借 領域專家批判 [[expert-critique-chain]] [[register-distortion]] 普查對稱閘(母體對稱/同語域計數);閘借 [[pc-control-loop]] [[problem-validation]]。本步產出的 schema 是 [[problem-spine]] [[three-layer-relations]] 的根。
