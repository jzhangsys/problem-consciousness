---
name: geometry-supervision
description: 【下游·監督】 審查幾何分析:點數是否過 manifold 閘(n夠)、是否嚴格分模態(無跨模態 cosine)、每值是否錨 problem_id、嵌入一致。當幾何結果產出、要放行前觸發。
---
# [下游·監督] 幾何監督

## 稽核清單
1. **點數閘**:每節點每模態 n ≥ 下限(本專案用 ≥8;density 需 M2+,見 [[manifold-grading-gate]]);不足者標 `under_power`,不得當白地證據。
2. **register 純度**:確認幾何只在【單一模態子集】內算;掃程式確認無 patent×paper cosine。
3. **problem_id 錨**:每個密度值掛 problem_id+modality;覆蓋率可被 `_pcgen_thread_audit` 驗。
4. **嵌入一致**:同一 whitened embedding、同欄位;換 embedding 要重診斷(見 [[manifold-diagnostics]])。

## ★對抗注意力稀釋
逐節點×模態列出 n 與 density,反序抽查;under_power 全標記不可漏。

## 通關
點數達標(或明標 under_power)∧ 無跨模態 cosine ∧ 全錨 problem_id ∧ 嵌入一致。否則回 [[geometry-strategy]]。隸屬 [[pc-downstream-loop]]。
