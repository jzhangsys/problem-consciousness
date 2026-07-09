---
name: conclusion-evidence-supervision
description: 【結論·監督】 審查結論草稿:每句是否對得上 deterministic 訊號(幾何/HMM/census)、每個事實主張是否有 RAG citation、problem_id 是否錨定、是否逾越拓樸/HMM 合法語域、四禁是否滿足、是否與 deterministic 判決衝突。當結論草稿產出、要交批判前觸發。是 pc-conclusion-loop 的監督角色。
---
# [結論·監督] 結論草稿逐句驗證

## 逐項查(任一 FAIL → 退回 [[conclusion-synthesis-strategy]] 重寫,不放行)
1. **判決一致**:草稿 claimed_decision == pack 的 deterministic decision?衝突 = FAIL(LLM 不准翻案;真有疑慮標「需重算」)。
2. **幾何句合法**:每個幾何主張對得上 pack.geometry(M/n/cr),且鎖 [[topology-language]]——M0–M1 不下密度、無「白地/機會」、無跨模態 cosine。逾越 = FAIL。
3. **HMM 句合法**:每個時序主張對得上 pack.hmm(lifecycle/trend),且鎖 [[hmm-language]]——無預測外推、無「萌芽=機會」、sparse 標不判定。逾越 = FAIL。
4. **census 句合法**:轉化落差/lead-lag 對得上 pack.census,且若 census_verdict=inconclusive 不下強結論。
5. **citation 完整**:每個事實主張都引 pack.rag_evidence 的真 citation(id+modality);無引述的主張 = FAIL([[citation-gate]])。
6. **problem_id 錨定**:全程錨 pid;無孤兒句。
7. **四禁滿足**:有 支持 + 反證 + 下一步;無裸標籤;不以 hit count 替代證據;不以概念推論替代事實。
8. **register-safe**:概念節點走機制語、實體節點走器件材料語;未混語域(來源語域 ≈ modality)。

## 輸出
每筆:verify_pass(bool)+ verify_notes(逐項 PASS/FAIL + 哪句違規)。FAIL → 標明須修哪句、缺哪個 citation,退策略角色;PASS → 交批判角色。
對抗:不准「看起來有引號就算有 citation」——citation 必須在 pack.rag_evidence 裡找得到對應 id。
