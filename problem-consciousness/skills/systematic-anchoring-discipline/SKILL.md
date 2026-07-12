---
name: systematic-anchoring-discipline
description: 【錨定·第一層】 全 pipeline 通用的系統性錨定紀律:把任何「宣稱某 item 屬於 problem_id」的錨定主張(corpus/抽取ckpt/量化證據/關鍵字/KG邊)過同一個 deterministic 鑑別閘,判 KEEP/REANCHOR/OFFAXIS/DEMOTE/DROP,deterministic 優先、LLM 只裁模糊。當任何語意步驟產出或修改「item↔problem_id 歸屬」、或要查錨定有無錯節點/錯軸/泛詞時觸發。是 problem-consciousness-every-semantic-step 的執法層,第二層交 領域細緻錨定紀律。
---
# 系統性錨定紀律(第一層,全環節通用)

## 為什麼要這層(2026-06-21 內容稽核發現)
逐筆讀 252 筆量化證據:**不是 AI 捏造**(值/來源/provenance 真,抽取器常自承不符),問題在**錨定紀律**——錨定/fold 階段沒攔下錯放的記錄。實證污染:跨節點錯錨 6%(把某材料/器件的證據放到機制不同的別節點)、泛詞/空錨 49%(只寫節點名無法驗證)、右節點錯單位 33%(把某量的單位泊進量綱不同的節點)。鐵律 problem-consciousness-every-semantic-step 要「每個語意步驟都錨」,但沒有「執法的閘」→ 本 skill 即執法層。

## 單一抽象:錨定主張(anchoring claim)
全 pipeline 每個會宣稱「item 屬於 problem_id P」的環節,統一成 `{item, claimed_pid, anchor_text, quantity, unit, provenance, self_flag}`:corpus 錨定、四件套 ckpt 的 source_node、量化證據、關鍵字、KG 邊、floor/ceiling 值。**一個閘,所有環節共用**(`_anchor_discipline.adjudicate`)。

## 單一事實來源:`node_anchor_registry.json`
每 problem_id 帶 `mechanism_signature`(乾淨錨須命中其一)、`disqualifiers`(命中=屬別節點)、`native_quantity/legit_units/off_axis_units`、`domain_family`、`reanchor_hints`(disqualifier→正確pid)。由 `_build_anchor_registry`(deterministic 底)+ 5 領域 subagent fold 補強(596 signature/524 disqualifier/478 reanchor,目標 pid 全驗證合法)。

## 裁定順序(deterministic 優先;違反物理最毒者先擋)
1. **歸屬閘**:命中 disqualifier → REANCHOR(★目標選擇:disqualifier-hint 與全域 best-node 取較強者;best-node 只回「自身 disqualifier 不被此文觸發」的合法節點,避免把某材料丟到會 disqualify 它的別節點)/ 無目標→DROP。
2. **自承不符**:抽取器寫「node X but item is Y」→ best-node 改派。
3. **語域閘**:單位泊錯軸(把某量的單位泊進別量的節點、把厚度當成阻抗)→ OFFAXIS(值導向 material_headroom,不進該節點的 floor/ceiling)。
4. **會員資格**:signature 命中 → KEEP(high)。
5. **★不浪費資料**:泛詞/空錨但單位在原生軸 → KEEP(low 信心,精簡但有效);否則無法驗證 → DEMOTE。
6. 具體錨文但無 signature 且別節點明顯更配(best-node≥2)→ REANCHOR;否則 → AMBIGUOUS → LLM 單尺裁定。

## focused vs document 兩模式(關鍵教訓)
- **focused**(量化證據 anchored_bottleneck、關鍵字):短而聚焦 → 用完整 `adjudicate`,高精度(實證乾淨度 65%→93%)。
- **document**(corpus 摘要、ckpt 英文欄):長多主題 → 用 `adjudicate_document`,**遠更保守**:只在「自身機制詞完全不在」+「disqualifier-hint 與 best-node 兩個獨立訊號一致」才自動改派;訊號不一致只 FLAG 待審不動。★教訓:長摘要單一關鍵詞會把多主題文件誤拉走(實證:鈍閘把 2675 筆亂搬、C04 某主題論文→錯到 E18;改兩訊號一致後降到 162 筆且 C04→E05 正確)。

## 紀律
- **不偷改**:每筆判決記 verdict+reason+觸發詞,reanchor 寫 before→after 日誌(沿 [[pipeline-rectify]])。
- **加層不刪舊**:DROP 移到 `_dropped`、OFFAXIS/DEMOTE 標 `resistance_eligible=False`(留 KG 當弱證據),不物理刪除。
- **冪等**:判決基於 raw 欄位,重跑收斂同一固定點。
- reanchor 後同步重寫 KG 邊 + RAG 片段(指向正確節點)。
- 下游(floor/ceiling/幾何/census)只吃 eligible 記錄。
