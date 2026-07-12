---
name: framework-downstream-impact-critique
description: 【A章·批判】 從下游(KG/RAG/語域扭曲/幾何/翻譯/census)反推,批判框架 schema 夠不夠用:每個下游步驟要的欄位這裡有沒有?schema 餵下去會不會崩?當框架/schema 要定案前觸發。
---
# [A·批判] 下游衝擊批判

## 立場
框架是全 pipeline 的根 schema。本 skill 站在**每個下游步驟的立場**反問:「你給我的這份 schema,我接得住嗎?」缺欄位→駁回 schema,回 [[framework-schema-genesis-strategy]] 補。

## 逐下游反推(每個都要問)
1. **KG**([[problem-spine]] [[three-layer-relations]]):有穩定 `problem_id` 當節點?concept↔entity `links` 當邊?三層(基礎/應用/專利)勾稽得上嗎?
2. **RAG**:`canonical_term` + `aliases` 夠做檢索維度與 chunk 標註嗎?
3. **語域扭曲**([[register-distortion]] 普查對稱閘(母體對稱/同語域計數)):有 `mechanism_register` vs `structure_register` 雙語域欄嗎?沒有→後面對稱 census 無法做,直接駁回。
4. **幾何**([[geometry-whitespace]]):層級/座標語意可由 `layer` 推得嗎?
5. **翻譯**:`canonical_term` 是穩定對齊鍵嗎?中英術語對得上嗎?
6. **物理閘**(critic-natural-sciences):`metric` 結構化(量綱+值)可被自動取數嗎?
7. **census**:每條可被分子/分母兩側對稱計數嗎?

## ★對抗注意力稀釋
- **逐下游清單跑完**,不可跳過任一下游。每個下游一行「需要的欄位 / schema 有沒有 / PASS|FAIL」。
- 特別防：最常被漏的是雙語域欄與 census 對稱性——這兩個源頭不給,下游永遠補不回(本專案 node9 幻影白地的教訓,見 普查對稱閘(母體對稱/同語域計數))。

## 通關條件
七個下游全部 PASS(要的欄位都在)。任一 FAIL→回 [[framework-schema-genesis-strategy]]。全 PASS 才同意 gate A,開 B 章。隸屬 [[pc-genesis-loop]] A 章。
