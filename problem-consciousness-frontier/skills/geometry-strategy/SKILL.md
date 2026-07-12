---
name: geometry-strategy
description: 【下游·策略】 跑幾何分析時,如何 register-safe 且 problem_id 錨定:每節點【分模態】(paper-only/patent-only)各算局部密度,絕不跨模態 cosine,重用 geom_lib。當要對 corpus 做幾何/密度/白地分析時觸發。
---
# [下游·策略] 幾何策略(register-safe)

## 規則
1. **分模態算**:每 problem_id 對 paper-only 與 patent-only 子集**各自**算 `geom_lib.manifold_geom`(FIXED-d 局部密度);兩模態的數值可分別解讀或 z-score 比較,**絕不**把專利向量與論文向量直接 cosine(語域假象,見 [[register-distortion]])。
2. **重用既有**:用 `geom_lib.py`(已驗證 FIXED-d 跨點數可比);別重造。方法本體見 [[geometry-whitespace]] [[manifold-diagnostics]]。
3. **problem_id 錨**:每個密度值掛 problem_id + modality,可被 thread audit 驗到。
4. **嵌入一致**:用同一 whitened embedding(mxbai,`embed_lib`),欄位一致(title+abstract)。

## 交棒
產出交 [[geometry-supervision]] 查點數/register/錨,交 [[geometry-critique]] 攻 under-power/假象。隸屬 [[pc-downstream-loop]]。
