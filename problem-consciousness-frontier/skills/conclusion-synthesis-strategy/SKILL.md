---
name: conclusion-synthesis-strategy
description: 【結論·策略】 怎麼把 deterministic 判決(幾何/HMM/census/物理)寫成「結論草稿」——沿 KG 脈絡、調用 RAG 引用、按問題意識八層結構鋪陳,每句鎖在拓樸/HMM 合法語域。當要為某 problem_id 的決策卡寫/重寫結論草稿時觸發。是 pc-conclusion-loop 的策略角色。
---
# [結論·策略] deterministic 判決 → 結論草稿

## 鐵律(對抗「LLM 自己標註」)
**判決(INVESTIGATE/WATCH/EXCLUDE/REFRAME)是 deterministic 給的,草稿只「說明為什麼成立 + 前提 + 反證」,絕不翻案。** 若你覺得判決錯 → 不是改標籤,而是寫進「不確定/需重算」交給驗證角色,由 deterministic 層處理。

## 草稿怎麼組(每個 pack 來自 `conclusion_packs.json`)
1. **錨問題意識**:開頭點出 problem_id + 瓶頸(bottleneck/metric)+ kind(概念=機制軌 / 實體=器件材料軌)。
2. **deterministic 訊號先行**:用 pack 的 geometry / hmm / census / physics_headroom / 四件套材料,**這些是判決依據**。
   - 幾何句鎖 [[topology-language]](只講研究結構,M2+ 才下密度,禁白地/跨模態)。
   - HMM 句鎖 [[hmm-language]](只講生命週期/lead-lag,禁預測,禁「萌芽=機會」)。
3. **沿 KG 脈絡**:用 pack 的 concept_entity_links 把概念↔實體接起來(機制根因 ↔ 落地實作)。
4. **調用 RAG 引用**:每個事實主張都引 pack `rag_evidence.supporting / counter` 的 citation(id+modality+score);**沒有 citation 的主張不准寫**(交 [[citation-gate]])。
5. **八層收尾**:支持證據 → 最大反證(用 counter RAG / card_counter)→ 不確定性 → 下一步任務。

## 各決策態的敘事重點
- **INVESTIGATE**:為何是真機會(物理 headroom 或 研究領先+轉化落差+萌芽+真群集),且 moat/penalty 反證已列。
- **REFRAME**:框架哪裡錯(framing_reason)、應重定義成什麼、為何原問法誤導。
- **EXCLUDE**:為何工程上排除(成熟+擁擠+已轉化+無物理),非僅 count 少。

產出 `conclusion_out_*.json` 每筆:{pid, claimed_decision(=deterministic), conclusion, citations, rounds, passed}。交 [[conclusion-evidence-supervision]] → [[conclusion-adversarial-critique]]。
