---
name: validation-multisource-strategy
description: 【C章·策略】 驗證要專利+論文雙源都做,不只 Google Patents;深度問題意識閘移到此處的 harvest/抽取輸入端。當要驗證關鍵字有效性、且系統目標是「專利+文獻」前沿時觸發。對稱雙源是後續 census 的前提。
---
# [C·策略] 多源驗證策略

## 推翻舊版
舊版**只探 Google Patents**,論文側完全沒驗 → 「文獻」這半邊是盲的,且後續無法做對稱 census(普查對稱閘(母體對稱/同語域計數),node9 幻影白地的病根)。

## 規則
1. **雙源並驗**:
   - **專利側**:Google Patents / Espacenet,走 openclaw 真瀏覽器(零付費),參考 openclaw_workspace 既有 `_selenium_get_session` 機制。
   - **論文側**:OpenAlex / Crossref / Semantic Scholar / arXiv(見 [[literature-harvest]]),機制語域查詢。
2. **對稱性要求**:每個瓶頸 problem_id 在**兩側都要有驗證查詢與命中**,供後續分子/分母對稱計數。只驗一側=禁止(會製造幻影白地)。
3. **基礎研究回收**:論文側要納入「只講機制、不指定用途」的基礎研究,經 [[mechanism-bridge]] 語義回收,別被應用語域漏掉。
4. **provenance 一致**:兩源命中都記 `{problem_id, axis, source, register, query}`,供 KG/census/RAG 共用。

## ★對抗最近性偏誤
- 不得因「專利源好抓、論文源要 API」就偏專利、略論文。難易不決定覆蓋。
- 兩源都要可重現(同 input 同查詢得同結果),不靠「這次剛好抓到什麼」。

## 交棒
交 [[validation-gate-symmetry-supervision]] 查雙源對稱、交 [[validation-false-kill-critique]] 攻誤殺。隸屬 [[pc-genesis-loop]] C 章。
