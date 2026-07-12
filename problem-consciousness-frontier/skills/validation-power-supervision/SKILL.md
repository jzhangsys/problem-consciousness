---
name: validation-power-supervision
description: 【C章·監督】 審查驗證的統計檢定力與穩健:樣本量是否足(非只 5 筆)、是否抓了 abstract、語言偏(只英文)、denylist 脆弱、可重現性。當驗證結果產出、要放行進 harvest 前觸發。
---
# [C·監督] 驗證檢定力監督

## 職責
查 [[validation-precision-first-strategy]] / [[validation-multisource-strategy]] 的**方法健康度**,不評單條判定對錯(那是批判)。

## 稽核清單
1. **樣本量**:每條 combo 是否看了 ≥20 筆?只看 5 筆的判定一律標「低檢定力」退回。
2. **抓了 abstract 嗎**:是否只用 title 判?只用 title=訊號不足,FAIL。
3. **語言偏**:是否只認英文標題?非英文/縮寫命中被漏會低估(舊版 `boron nitride composite` 12.5 萬件卻被判 on=1,疑似語言/縮寫漏認)。要求容忍多語/別名。
4. **denylist 脆弱**:OFF 是有限黑名單,抓不全真雜訊(heat pipe 的 HVAC/地熱/汽車不在表內)。監督要點名「denylist 涵蓋不足」,推動改用比例/語意判而非固定表。
5. **可重現**:同 input 重跑得同判定?判準是確定性規則嗎?

## ★對抗注意力稀釋
- 對驗證**逐條**核樣本量,不抽樣放行(一條低檢定力就可能放雜訊桶或殺好組合)。
- 反序抽查 abstract 是否真被讀過(非空、非 boilerplate)。

## 通關條件
樣本量達標 ∧ 有 abstract ∧ 語言不偏 ∧ denylist 已升級為比例/語意 ∧ 可重現。否則回策略。隸屬 [[pc-genesis-loop]] C 章,與 [[validation-gate-symmetry-supervision]] 並列監督。
