---
name: framework-schema-genesis-strategy
description: 【A章·策略】 設計問題意識框架的 schema,因為它是全下游(KG/RAG/語域扭曲/幾何/翻譯)的源頭資料結構。當要決定 pc_frame 的欄位、problem_id、層級、provenance、量化屬性、語域標記時觸發。
---
# [A·策略] Schema 創世策略

## 為什麼
本框架不是給人看的清單,是**下游所有步驟要接的 schema 源頭**。KG 拿它當節點本體、RAG 拿它當檢索維度、語域扭曲拿它分層計數、幾何拿它當座標語意、翻譯拿它對齊術語。schema 設計錯,下游全部要返工。

## 必備欄位(每個瓶頸節點)
```
problem_id        穩定唯一(供 KG/census/關鍵字回指,永不重編)
kind              concept | entity
layer             transport | device | reliability
canonical_term    正規英文術語(KG 節點名、翻譯對齊鍵)
aliases           同義/別名(學術 register + 專利 register 各列,供 register-distortion)
metric            量綱 + 典型值/天花板(供 critic-natural-sciences 數值閘)
mechanism_register  學術語域措辭(論文檢索用)
structure_register  專利語域措辭(專利檢索用)
why               為何是瓶頸(一句)
links             關聯 problem_id(concept↔entity 橋,供 mechanism-bridge)
```

## 設計準則
1. **雙語域分欄**(`mechanism_register` vs `structure_register`):這是後面避免語域扭曲、做對稱 census 的根。源頭不分,後面補不回來。見 [[register-distortion]]。
2. **concept↔entity 橋顯式化**(`links`):機制與器件的對應供 [[mechanism-bridge]] [[three-layer-relations]] 直接接。
3. **metric 結構化**(量綱+值),供 critic-natural-sciences 自動查數字。
4. **problem_id 穩定**:一旦發出永不改號,否則 KG/census 對不上。

## 交棒
schema 草案交 [[framework-downstream-impact-critique]] 從下游反推驗證(每個下游步驟要的欄位這裡有沒有),再交監督查一致。隸屬 [[pc-genesis-loop]] A 章。
