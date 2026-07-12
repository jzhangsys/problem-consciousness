---
name: narrow-keyword-backfill
description: ★通用補救手法:當某問題節點(problem_id)有下游覆蓋、卻在驗證階段缺(寬詞紅海未過精準度閘)→ 用窄關鍵字回填閉合其問題意識鏈斷點。任何工作端點偵測到「節點下游有料但無 valid 關鍵字」時都觸發,非單一 case。
---
# 窄關鍵字回填(node-level 問題意識鏈斷點補救)

## 何時觸發(任何端點都適用)
任一階段的監督/矩陣發現:某 problem_id **下游有覆蓋(語料/census/幾何/HMM 都有)**,但在 **④驗證缺 valid 關鍵字**。
成因:該節點是**紅海/廣域**(某高頻/廣域瓶頸),其寬詞組合命中爆量、被「精準度優先」閘剔除 → 問題意識鏈在 ④ 斷。
偵測工具:`_pc_node_matrix.py`(每節點×每階段矩陣,列出 `④驗證` 缺的節點)。

## 手法(可重用)
1. **生成窄組合**:node `canonical + 首2別名` × **具體前沿脈絡**(該領域的目標平台 / 應用場景 / 世代節點 / 尺度 / 材料類等具體限定詞)。窄=把紅海寬詞收斂到精準 slice。
2. **探針**:GP(openclaw 真瀏覽器,host)+ OpenAlex(API);num=20,抓 title+snippet/abstract。
3. **驗證**:套既有精準度優先閘 [[validation-precision-first-strategy]](命中鐘形、領域、深度量化/機制、off 比例)。
4. **回填**:通過者補進 `kw_valid`(標 `source=narrow_backfill`),閉合斷點。
實作:`_narrow_backfill.py`(host 探針 → `narrow_probe.json`;Docker `--validate` → 併入 kw_valid)。

## 實證(2026-06-17,本手法首次建立)
C05/E09/E23 三紅海節點在 ④驗證缺 → 88 窄組合探針 → **17 條過驗證(C05:2/E09:9/E23:6)**;節點矩陣 54/57 → **57/57 全貫串**。效益顯著故固化為通用手法。
範例窄詞形式:`<canonical> <別名> <具體前沿脈絡>`(把某廣域瓶頸的寬詞,收斂成綁定具體應用脈絡的精準組合)。

## 鐵律
- 一律走 [[pc-downstream-loop]] / [[pc-genesis-loop]]:retrieval 走 openclaw(host),驗證/分析走 Docker;每條窄組合仍錨 problem_id(問題意識貫串)。
- 窄≠亂加詞:脈絡須具體前沿(去泛詞,見 [[keyword-context-inflation-critique]]);通過精準度閘才算數。
- 接在【每一個】出現此狀況的端點,不限單一 case。
