---
name: keyword-register-split-strategy
description: 【B章·策略】 關鍵字生成必須雙語域分流——機制/概念查詢走論文源(學術語域),器件/結構查詢走專利源(專利語域),不可把機制詞丟給專利庫(會低 recall)。當要從問題意識框架生成檢索關鍵字時觸發。
---
# [B·策略] 關鍵字雙語域分流策略

## 核心教訓(本專案實證,2026-06-17)
專利幾乎不寫學術機制詞。實證:一條機制/概念軸查詢(學術措辭)在 Google Patents 命中僅個位數,而對應的器件/結構措辭命中數十萬。**不是白地,是語域不符 → 概念軸查詢在專利側系統性低 recall**。見 [[register-distortion]]。

## 規則
1. **機制/概念瓶頸(kind=concept)→ 論文源**:用 `mechanism_register` 措辭(領域的機制/現象/界面措辭),投 OpenAlex/arXiv/Crossref/Semantic Scholar(見 [[literature-harvest]])。
2. **器件/結構瓶頸(kind=entity)→ 專利源**:用 `structure_register` 措辭(領域的器件/裝置/結構措辭)+ CPC 語域,投 Google Patents/Espacenet(走 openclaw 真瀏覽器)。
3. **橋接查詢(concept×entity)→ 雙投**:同一瓶頸對兩源各生一版查詢(機制版投論文、結構版投專利),供後續對稱 census(普查對稱閘(母體對稱/同語域計數))。
4. **每條查詢標 `target_source`**(paper|patent)與 `register`(mechanism|structure),供驗證章分流判準。

## 為什麼這是創世級重要
這一步決定了論文側與專利側「能不能被公平地撈到」。源頭語域分流錯,後面對稱 census 就只能修一邊 → 製造幻影白地(node9 教訓)。所以**雙語域是源頭強制,不是事後補**。

## 交棒
產出交 [[keyword-provenance-supervision]] 查每條有 provenance 與 target_source,交 [[keyword-register-mismatch-critique]] 攻語域是否真的對得上源。隸屬 [[pc-genesis-loop]] B 章。
