---
name: framework-coverage-supervision
description: 【A章·監督】 審查問題意識框架的覆蓋是否完整、有無注意力稀釋與最近性偏誤。當 framework-completeness-strategy 產出瓶頸清單、要放行進關鍵字章前觸發。對照外部基準(教科書/CPC-IPC/roadmap)逐項查漏,反序重掃,顯式計數。
---
# [A·監督] 框架覆蓋監督

## 職責(查紀律,不重做策略)
對 [[framework-completeness-strategy]] 的清單做覆蓋稽核,輸出每項 PASS/FAIL + 缺漏清單。**監督不補內容**,只指出哪裡缺、要策略補。

## 稽核清單
1. **外部基準對齊**:逐一比對——領域教科書的瓶頸大項、對應的 CPC/IPC 分類大類、近 3 年領域 roadmap。每個基準大項問「框架裡有對應 problem_id 嗎?」沒有→記缺漏。資料走 openclaw_workspace 真瀏覽器。
2. **三類齊全**:concept / entity / pains 三類數量是否失衡(如 concept 18 但 pains 只 10,痛點是否漏綁某些 concept)。
3. **量綱齊備**:每條 metric 有量綱?無量綱者列出退回。
4. **分層覆蓋**:transport/device/reliability 三層都有料,不可某層空。

## ★對抗注意力稀釋(本 skill 的核心動作)
- **反序重掃**:從清單**最後一項往前**再查一次(策略寫到後面常草率)。
- **隨機抽 3 條深查**:不只看頭尾,中段隨機抽 3 條逐條驗 metric 與 why。
- **計數斷言**:核對「宣稱 N 項 = 實得 N 項」,逐項打勾,數字不符即 FAIL。

## ★對抗最近性偏誤
- 檢查清單是否偏向熱門/近期題目而漏老承重項。特別點名查:老而承重的基礎材料、關鍵界面、成熟主力結構——這些不夯但承重,常被漏。
- 重跑同 input 是否得同清單(確定性)。

## 通關條件
外部基準無未解釋缺漏 ∧ 三類齊全 ∧ 量綱齊備 ∧ 反序+隨機抽查通過 ∧ 計數一致。否則帶缺漏清單回 [[framework-completeness-strategy]]。隸屬 [[pc-genesis-loop]] A 章,與 [[framework-layer-consistency-supervision]] 並列監督。
