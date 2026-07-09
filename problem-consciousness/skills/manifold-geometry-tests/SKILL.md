---
name: manifold-geometry-tests
description: 流形診斷的幾何測試(M04–M11):whitening 審計、距離/鄰域定義、內在維度穩定、局部平坦/tangent(local PCA)、鄰域穩定(bootstrap kNN Jaccard)、kNN 圖連通、測地穩健。當 manifold-diagnostics 觸發,或要驗證子群的幾何是否支撐 density/geodesic 時觸發。每項皆須逐子群、附敏感度,不可只靠全域或 UMAP。
---
# 幾何測試(M04–M11)

## M04 Whitening 審計
whitening 前後 cosine 分布(mean/var/hubness)比較;all-but-top-k 的 **k=0/2/4/8 敏感度**(白地詞彙 Jaccard);whitening 後 top-k NN 人工合理;不過度壓縮(關鍵痛點 cosine 不全趨同);保留可重現 npz。**只能說『降低可觀察偏差』,不可稱完全消除模態偏置。**

## M05 距離/鄰域
距離明確(本專案 whitened cosine + L2);kNN 的 k 有理據/敏感度(k=10/15/30/50);局部範圍定義;鄰域以高維 kNN graph 為主,不靠 UMAP 鄰近。

## M07 內在維度穩定
全域 + **逐簇 TwoNN ID**;不同 k/block 穩定;**bootstrap CI**;對照 PCA effective dim / MLE;小簇不報。低且穩定(≪環境維)才支持低維結構。

## M08 局部平坦 / tangent
每點 **k-NN 局部 PCA**(非整簇 PCA):前 d 維解釋變異(本專案 M3 簇 ~0.60–0.67)、reconstruction error 低、tangent dimension 穩定;邊界點標不確定。

## M09 鄰域穩定
**bootstrap(80% 重抽)後 10-NN Jaccard**(本專案 0.76–0.83);metric/embedding 敏感度;top-k 語意一致。高穩定 Jaccard>0.5;<0.3 不進高信心。

## M10 圖連通
逐簇 kNN graph 的 connected components 與 **giant component ratio**(>0.9 可支撐局部連通;<0.7 不建議 geodesic)。

## M11 測地穩健
geodesic 在**高維 kNN graph**(非 UMAP 2D);不同 k 距離排序 Spearman 穩定;**disconnected 標 inf/排除,不可默轉大數**;邊界/低密度標不確定。**geodesic 僅代表語意-拓樸路徑,非工程/侵權/市場距離。**

實作:`manifold_verify.py`(全域 ID/巨分量/曲率)、`sensitivity_topology.py`(k 敏感度)、`local_manifold_diag.py`(逐簇 ID/tangent/鄰域/連通)、`validation_p1.py`(M04 k-sens、M07 bootstrap CI)。
