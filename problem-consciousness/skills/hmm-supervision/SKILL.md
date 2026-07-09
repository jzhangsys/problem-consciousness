---
name: hmm-supervision
description: 【下游·監督】 審查時間軸/生命週期:年份覆蓋率是否足、sparse 節點是否標記不判、lead-lag 雙側都有年、可重現、每值錨 problem_id。當 HMM/生命週期結果產出、放行前觸發。
---
# [下游·監督] HMM/時間監督

## 稽核清單
1. **年覆蓋**:每節點帶 year 的文件數;n<5 標 `sparse` 不下生命週期結論。
2. **lead-lag 雙側齊**:paper 與 patent 都要有足夠帶年文件才算 lead;單側缺→不算。
3. **可重現**:同語料同年序得同分級(確定性規則,非「這次剛好」)。
4. **problem_id 錨**:每個生命週期/lead 值掛 problem_id;可被 thread audit 驗。
5. **年份驗真**:year 來源可信(回源驗真,非臆測;見 [[manifold-corpus-control]])。

## ★對抗注意力稀釋
逐節點列 n_year、median_year、stage;sparse 全標,反序抽查。

## 通關
年覆蓋達標(或標 sparse)∧ lead 雙側齊 ∧ 可重現 ∧ 全錨。否則回 [[hmm-strategy]]。隸屬 [[pc-downstream-loop]]。
