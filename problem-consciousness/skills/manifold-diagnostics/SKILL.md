---
name: manifold-diagnostics
description: 局部語意/專利流形幾何診斷層(主控)。在對任何 embedding 語料做 density / geodesic / topological isolation / whitespace 幾何分析『之前』,先判斷哪些局部子群具備足夠穩定的「流形樣結構」。不主張整體母體為黎曼流形;採條件化局部假設,逐子群 M0–M4 分級後才放行下游。**當換語料/換領域/換 embedding/whitening/距離度量,或要做拓樸孤立、測地距離、密度白地時,務必先觸發本診斷層。** 子檢核交 manifold-corpus-control / manifold-geometry-tests / manifold-bias-coherence / manifold-grading-gate。
---
# 局部流形幾何診斷層(主控)

## 規格立場(必背)
不主張整體專利/文獻母體=單一黎曼流形。採「**條件化局部語意流形假設**」:在特定領域×表徵×正規化×距離下,子群若通過 內在維度穩定 / 局部平坦 / 鄰域穩定 / 圖連通 / 語意一致,且**非**由 assignee/family/source/法律模板造成,才視為「局部流形樣結構」,用於 density / geodesic / topology isolation。

## 何時啟動(觸發)
- **換 input**:新語料、新領域、新 embedding 模型、新 whitening k、新距離度量 → 必跑。
- 要做 density / 測地距離 / 拓樸孤立 / 幾何白地 → 必先跑並依 M-grade 閘控。

## 流程(18 檢核 → M0–M4)
1. M01–M03 語料/表徵控制 → `manifold-corpus-control`
2. M04–M11 幾何測試(whitening/距離/ID/局部平坦/鄰域/連通/測地)→ `manifold-geometry-tests`
3. M12–M14 偏置與語意一致 → `manifold-bias-coherence`
4. M15–M18 視覺化邊界/替代法/分級/白地邊界 → `manifold-grading-gate`

## M0–M4 分級與下游許可
| 級 | 條件 | 可做 |
|---|---|---|
| M0 | 語意不一致 / 圖破碎 / 家族-assignee 主導 / 樣本小 | 不做幾何分析 |
| M1 | 有鄰域但 ID/語意不穩 | 僅探索 |
| M2 | 鄰域穩定+連通+語意大致一致 | **density** |
| M3 | +低 ID+局部平坦(tangent)+高連通 | **geodesic / topology isolation** |
| M4 | M3 + 多 embedding/多 k/專家確認仍穩 | 高信心幾何證據 |
**閘控規則**:geodesic/孤立 只用 M3+;density 只用 M2+;**M0 一律排除**。前沿若僅 M2 → **不得宣稱拓樸孤立**,改以 痛點×學術×解法稀疏×統計富集 支撐。

## 不可宣稱
① 母體=黎曼流形 ② UMAP 圖證明流形 ③ TwoNN≈k=本質 k 維 ④ geodesic=工程/侵權/市場距離 ⑤ 局部流形=白地(須再過富集/勾稽/時間/專家)。

## 本專案實作(pipeline 已嵌)
`local_manifold_diag.py`(逐簇 M0–M4 + 閘控,於 `p5_solution_space.py` 前執行)→ `ws_local_manifold`;`p5` 讀 grademap 閘控;`validation_p1.py`/`representation_check.py` 補 M03/M04/M07/M12/M15;報告 🧪 分頁 ⓪。換 input 跑 `rerun_analysis.sh` 即自動重評。
