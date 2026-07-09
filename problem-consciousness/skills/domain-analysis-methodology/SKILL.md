---
name: domain-analysis-methodology
description: >
  Universal, theory-grounded methodology for analyzing ANY technology domain's patents and
  academic literature. Decomposes a domain along 5 orthogonal axes (Principle / Material /
  Structure / Function / Method), each with hierarchical granularity levels, then runs a
  theory-coverage + statistical white-space analysis BEFORE/around embedding. Use when the user
  wants to: build a technology taxonomy, structure a patent/paper landscape, find statistically
  defensible technology white-space, or ground a patent embedding analysis in domain theory — for
  any technology domain. Swap the taxonomy JSON to
  switch domains. Keywords: white-space, 白地, patent landscape, technology taxonomy, 技術地圖,
  coverage matrix, domain analysis, 專利分析方法論.
---

# Domain Analysis Methodology(通用領域 理論驅動分析法)

把「無理論的 embedding」升級為「**多軸理論座標 + 計數顯著性**」。可遷移到任何技術領域:換 taxonomy JSON 即可。

## 為何這樣設計(實證教訓)
embedding-only 分析撞牆:無自然結構、白地易假象、跨模態/跨語言分離。**理論先行**才有可解釋、可辯護的結構。
(依據:`../MULTIMODAL_FINDINGS.md`、`../HARVEST_FINDINGS.md`、`../EMBEDDING_STANDARD.md`)

## 多軸 × 多階 Taxonomy(細緻框架)
領域沿 **5 正交軸**分解,每軸有**階層**(見 `taxonomy_schema.md`):
- **P 原理**(P0 基礎定律 / P1 機制 / P2 模型 / P3 計算) — 為何成立
- **M 材料**(M0 大類 / M1 具體 / M2 性質 / M3 製備) — 用什麼
- **S 結構**(S0 範式 / S1 元件 / S2 製造 / S3 特徵) — 怎麼造
- **F 功能**(F0 領域 / F1 問題 / F2 規格 / F3 脈絡) — 做什麼·哪用
- **E 方法**(E1 表徵 / E2 設計最佳化 / E3 度量) — 怎麼研究·量
一個項目得到**多軸座標**;白地可在「單分支」或**跨軸 cell**(如 `M.<material> × F.<function>`)任意粒度檢定。

## 三層分析(都已工具化、領域無關)
**Layer 1｜理論軸(嚴謹內容)** = taxonomy JSON。用文獻接地建,別杜撰。
**Layer 2｜覆蓋矩陣**(⚠️低精準類別需 LLM 語境精修,見 PLAYBOOK_LLM_CLASSIFY)：`classify_domain.py taxonomy_<d>.json <patents.jsonl> <papers.jsonl> <prefix>`
→ 各軸分支 + 跨軸 cell 的 {專利數, 論文數, 論文/專利比}。
**Layer 3｜計數顯著性**：`layer3_domain.py <prefix>_coverage.json`
→ 每分支/cell 的 2×2 hypergeometric + BH-FDR。**白地 = q<0.05 且專利<期望**(論文相對富集)。
不需脆弱的跨模態對齊。**可選**:對候選分支再做分支內 embedding 細定位(canonical 標準 + `../whitespace_multimodal.py` ridge 對齊)。

## 實例化新領域(4 步)
1. **harvest 文獻接地**:OpenAlex 撈該領域 review/foundational(過濾領域詞 + relevance 排序,**不要 cite 排序**——會撈到跨域名論文)。
2. **萃取軸分支**:從文獻 title/concept 整理出各軸分支(LLM 輔助 + 人工剪枝)。
3. **填 keywords** → `taxonomy_<domain>.json`(格式見 schema)。
4. **跑 Layer 2 → Layer 3**;對候選白地交叉商業訊號(成長率/申請人)+ 逐字接地。

## 紅線
- 顯著性**相對於取樣語料**;跨分支相對排名穩,絕對宣稱需更完整專利普查複核。
- 注意**偏斜幅度**:q 顯著但專利仍多(如某分支 235→755)= 「論文成長較快」;專利≈0 且 q 極小(如基礎模擬/新機制/新介質類別)= 「基礎科學/新方法,IP 近乎空白」= 最強白地。
- 逐字接地;寧報 0 不報假陽性;Lorentzian/演化時空僅探索不入結論。

## 完整決策流程(換領域照走)
```
0. 連通性 + 來源盤點 ........ PLAYBOOK_SOURCES.md(哪些能用、怎麼抓)
1. harvest 論文(權威期刊+頂會+snowball擴充)+ 專利(Google Patents /en + CPC)
2. 資料清洗/正規化 .......... PLAYBOOK_DATA_HYGIENE.md(語言/prefix/去重/去污染)
3. 建 taxonomy_<domain>.json . taxonomy_schema.md(5軸×多階)
4. Layer 2 計數覆蓋 ......... classify_domain.py(只需文字)
5. Layer 3 顯著性 ........... layer3_domain.py(hypergeometric+FDR;白地只在 M/S/F 軸)
6. #1 嵌入深掘驗證 .......... branch_drilldown.py(校正關鍵詞低估)
7. CPC 定論 ................. Google Patents 全庫 total_num_results 查真實 IP 量
8. (主題層全飽和→無真白地).. claim-level 分析找真機會(請求項 vs 論文貢獻 gap)
9. 從白地+文獻推論新可能性 .. PLAYBOOK_INFERENCE.md(5算子→全庫複核→文獻反查→遞迴下推)
   全程方法+失敗教訓 ........ PLAYBOOK_WHITESPACE_METHOD.md(含「主題層白地在成熟領域不存在」核心發現)
```
> ⭐ **核心定位**:本法穩健「排除假白地」(主題層),不幻想機會。成熟領域主題層已飽和(連新興 niche 全庫都數千專利)→ 真機會在 claim/參數層,需另做 claim-level 分析。

## Playbook(整個專案實證的「路徑」,永久活用)
- **`PLAYBOOK_SOURCES.md`** — 來源連通性地圖 + OpenAlex/Google Patents harvest 配方 + snowball 擴充
- **`PLAYBOOK_DATA_HYGIENE.md`** — canonical 嵌入標準 + 去污染/去重/checkpoint + 背景作業韌性踩坑
- **`PLAYBOOK_WHITESPACE_METHOD.md`** — 計數+驗證主流程 + **已排除的 9 種失敗路徑**(別重試)
- **`../EMBEDDING_STANDARD.md`** — 四個隱藏變數(語言/prefix/文本基礎/模態)
- **`PLAYBOOK_LIMITATIONS.md`** — ⚠️嚴格自審:方法限制與效度威脅(用前必讀,含實證 400× 計數不穩)
- **`PLAYBOOK_LLM_CLASSIFY.md`** — ⭐兩階段分類(關鍵詞→LLM語境精修);純關鍵詞精準度差(gyroid 40%→LLM 90%),計數用於白地前必過
- **`PLAYBOOK_DEMAND_REFRAME.md`** — ⭐⭐根本修正:白地是『需求前沿−已達成』非『供給缺席』(缺席法必然歸零);demand_frontier.py 雛形
- **`ROADMAP_HARDENING.md`** — 細緻強化路線(Wave 0-4,換壞尺→對照→重測→硬化→決策就緒)

## 可重用工具清單
| 階段 | 工具 |
|---|---|
| 論文 harvest | harvest_semi_authoritative.py / harvest_round2_sources.py / discover_sources.py / harvest_semi_papers.py |
| 專利 harvest | harvest_symmetric.py / harvest_embed.py / extract_xlsx_patents.py |
| 清洗正規化 | normalize_corpus.py / build_domain_focus.py / build_desc_en.py |
| 嵌入 | chemi_c2_pipeline.py(prefix 版)/ embed_unified.py |
| 分析 | classify_domain.py / layer3_domain.py / branch_drilldown.py / whitespace_multimodal.py |

## 檔案
- `taxonomy_schema.md`、`taxonomy_<domainA>.json`、`taxonomy_<domainB>.json`(實例,可當新領域樣板)
- `classify_domain.py`、`layer3_domain.py`、`branch_drilldown.py`、`discover_sources.py`
- 結果:`<domain>_*.json`
- 進一步細粒度特化:另建 `taxonomy_<domain>.json` 樣板即可,流程不變。
