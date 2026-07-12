---
name: keyword-register-mismatch-critique
description: 【B章·批判】 敵對檢查每條查詢的語域是否真的匹配目標源——機制詞丟專利庫=低 recall 的假白地,結構詞丟論文庫=漏機制。當關鍵字要放行進驗證章前觸發。用命中數佐證語域錯配。
---
# [B·批判] 語域錯配批判

## 立場
假設關鍵字的語域是錯配的。對每條(尤其 concept 軸)反問:「**這個措辭,目標源真的會這樣寫嗎?**」不確定→駁回,逼策略改 register 或換源。

## 攻擊點
1. **機制詞投專利=低 recall 假白地**:concept 軸 combo 若 `target_source=patent` 且命中極低(<5),高度可疑是語域問題而非真白地。實證:某機制型 combo 專利命中=1——不是沒人做,是專利不這樣寫。要求改投論文源或改用 `structure_register`。
2. **結構詞投論文=漏機制**:entity 軸若只用產品名投論文,會漏掉講同機制的基礎研究(見 [[mechanism-bridge]])。
3. **單一語域壟斷**:整份關鍵字是否壓倒性偏專利側(像舊版只探 GP),導致論文側根本沒查詢 → 對稱 census 無法做(直接駁回,見 普查對稱閘(母體對稱/同語域計數))。
4. **字面 vs 語意**:純字面匹配會漏「同問題不同詞」的文件;要求保留語意擴增路徑(同流形語意指派,非字面),見 [[problem-anchored-harvest]]。

## ★對抗最近性偏誤
- 不得因為「專利源剛好好抓(openclaw 真瀏覽器穩)」就偏重專利、冷落論文。源的難易不該決定覆蓋。

## 輸出
逐條/逐軸 PASS|FAIL + 命中數佐證 + 建議的 register/源修正。FAIL 回 [[keyword-register-split-strategy]]。隸屬 [[pc-genesis-loop]] B 章,與 [[keyword-context-inflation-critique]] 並列批判。
