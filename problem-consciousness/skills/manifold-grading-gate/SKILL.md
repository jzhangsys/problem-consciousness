---
name: manifold-grading-gate
description: 流形診斷的視覺化邊界、替代法敏感度、M0–M4 分級與白地使用邊界(M15–M18)。把前述診斷彙整成每子群 M0–M4 等級,並『閘控』下游:density 需 M2+、geodesic/isolation 需 M3+、M0 排除;UMAP 僅探索;結果須對替代 embedding/k/metric 不崩解。當 manifold-diagnostics 收尾、或要決定某子群可否進白地幾何分析時觸發。
---
# 分級與閘控(M15–M18)

## M15 UMAP/視覺化邊界
報告標明 UMAP/3D 點雲**僅供探索**;白地判斷**不用 UMAP 2D 距離**;報 trustworthiness/continuity(本專案 0.962);視覺 cluster 須回高維 kNN/density/語意驗證。警語:投影距離非統計證據。

## M16 替代模型敏感度
換 embedding / distance / clustering / intrinsic-dim 法 / DR / whitening ablation;**核心高優先方向不得完全消失**(Jaccard≥0.6 視穩健;0.4–0.6 中度需註明)。本專案:富集三法一致、相似 0.93、維度三法低維(穩);embedding/clustering 0.45–0.56(中度,已揭露)。

## M17 M0–M4 分級(每子群)
| M0 無流形支撐 | M1 弱 | M2 鄰域穩定(→density) | M3 局部流形樣(→geodesic/isolation) | M4 多法/專家仍穩(→高信心幾何) |
依 M07-M14 結果給級;`ws_local_manifold`。

## M18 白地使用邊界(閘控下游)
- **可支撐**:某子群適合 density / geodesic;某方向相對既有解法群呈語意-拓樸孤立;白地候選具幾何構面。
- **不可支撐**:技術一定可行 / 市場一定採用 / 無侵權風險 / 物理真實距離 / 唯一最佳方向。
- **閘控**:density→M2+、geodesic/isolation→M3+、M0 排除;**僅 M2 的前沿不得宣稱拓樸孤立**。白地結論須再過 痛點×學術×解法稀疏×FDR/log-odds×跨層勾稽×六軸時間×專家批判×實驗室可行(交 expert-critique-router / citation-gate)。

實作:`local_manifold_diag.py`(M0–M4)→ `p5_solution_space.py` 讀 grademap 閘控(geodesic 只 M3+、isolation 只 M3+、M0 排除、inf 標 None);`alt_methods.py`(M16)、`validation_p1.py`(M15 trustworthiness)。

## M19 真實正規化點雲流形分級(v3,取代 kNN-Jaccard 閘)
使用者明確要求「正規化完進行點雲分佈(manifold)」,且 kNN-Jaccard 與 bootstrap log_vol CV 皆**無鑑別力**(前者被質疑、後者結構性 ~0.002 全 M3)。改法(`_geom_manifold.py`):
1. **正規化**:全語料 PCA-whiten(中心化→top-K 主成分→各維單位變異),全域共變異≈I,距離跨節點可比。
2. **n-控制描述子**:每 problem_id×modality 點雲算 `mknn`(平均 k=5 近鄰距)、`eff_rank`(共變異特徵值參與率)、`id_twonn`(TwoNN 內在維,Facco 2017)。**緊緻比 cr = node_mknn / null_mknn**,null = 對全域白化雲抽同 n 隨機樣(去點數假象;跨 n 可比)。
3. **★鑑別陷阱**:與「全域隨機」比,任何主題雲都遠較緊(>15σ)→ trivial、會全 M4。真正鑑別是**跨節點相對百分位**:cr 越小越集中。M4=cr≤p12 且 id≤中位;M3=cr≤p33;M2=cr≤p66;else M1。只有 M2+ 可用於白地。
本專案結果:M1=38/M2=37/M3=32/M4=5(真有散佈)。教訓:null 只用來做 n-control,別用 null 的 z-score 當門檻(會兩極化:全 M3 或全 M4)。
★決定論鐵律:per-node 種子**必用 hashlib(md5)**,不可用 builtin `hash()`——builtin hash 受 PYTHONHASHSEED 跨程序隨機化,會讓邊界節點每次重跑翻 M 級(工程稽核 E8 抓到 7 節點×模態漂移)。`seed=int(hashlib.md5(f"{pid}|{mod}".encode()).hexdigest(),16)%2**32`。
★三支稽核並列(每跑必驗,皆真檢查非寫死):品質 `_audit_v3`、八層貫串 `_pc_thread_v3_audit`、工程 `_eng_audit_v3`(對齊/NaN/孤兒/新鮮度/**決定論重算一致**)。
