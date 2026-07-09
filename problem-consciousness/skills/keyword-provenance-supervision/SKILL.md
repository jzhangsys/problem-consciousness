---
name: keyword-provenance-supervision
description: 【B章·監督】 審查每條關鍵字都錨某 problem_id(無孤兒)、標了 target_source/register、concept×entity 無截斷遺漏。當關鍵字組合產出、要放行進驗證章前觸發。逐條查 provenance 完整性與配對覆蓋。
---
# [B·監督] 關鍵字 provenance 監督

## 職責
查 [[keyword-register-split-strategy]] / [[keyword-permutation-coverage-strategy]] 產出的每條關鍵字的**可追溯性與覆蓋**,不評語域對錯(那是批判的事)。

## 稽核清單
1. **無孤兒**:每條 combo 的 `anchor_problem_id` 都對得上框架裡存在的 problem_id。對不上=孤兒,FAIL。
2. **欄位齊**:每條有 `axis`、`target_source`(paper|patent)、`register`(mechanism|structure)。缺欄位 FAIL。
3. **配對覆蓋矩陣**:把 concept×entity 畫成矩陣,標出**沒被生成的格子**;若是截斷造成(非物理無關)→ FAIL,回策略補。
4. **每瓶頸至少有查詢**:每個 problem_id 至少被一條 combo 覆蓋;零覆蓋的瓶頸列出(白地種子漏了)。
5. **雙源平衡**:concept 類是否真的有論文側查詢、entity 類是否真的有專利側查詢(不可全擠專利側)。

## ★對抗注意力稀釋
- **反序逐條**核 provenance(從最後一條往前)。
- **計數斷言**:combo 總數 = Σ各 problem_id 的 combo 數;每 problem_id 覆蓋數列表,零覆蓋者紅旗。

## 通關條件
無孤兒 ∧ 欄位齊 ∧ 無截斷空格 ∧ 每瓶頸≥1 查詢 ∧ 雙源平衡。否則回策略。隸屬 [[pc-genesis-loop]] B 章,與 [[keyword-breadth-balance-supervision]] 並列監督。
