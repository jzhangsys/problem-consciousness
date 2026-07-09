---
name: literature-harvest
description: 免費網路巨量抓取學術論文與專利(零 API key、合法、可在本機跑)。涵蓋 OpenAlex/Crossref/Semantic Scholar/Google Patents/Espacenet 來源選擇、反封鎖、可續跑、回源驗真。當要建語料、擴採論文/專利、補引用或全文、做 census 時觸發。整合本專案數萬件抓取的全部教訓。
---
# 文獻抓取:免費、巨量、可續、不被封

> 本專案實證:**不需商用資料庫(Derwent/PatSnap/Lens)**。免費網路即可巨量抓到 5 萬+ 完整專利+論文。但要按來源特性選對工具、做好反封鎖與可續。

## 來源選擇(對症下藥,別都用同一個)
| 需求 | 用 | 為何 |
|---|---|---|
| 學術論文(量、metadata、引用) | **OpenAlex**(works API,免key,有 referenced_works/oaid) | 最完整、引用網現成;高速會 IP-429,需退避 |
| 把「雜亂引用字串」配回論文 | **Crossref `query.bibliographic`** | 設計來配引用字串;比 OpenAlex search 準(本專案 0.75%→60%) |
| 補論文 abstract(by DOI) | **Semantic Scholar** `/paper/DOI:..` | 但老/會議論文覆蓋低(~10–20%),別期待全補到 |
| 專利號搜尋/普查計數 | **Google Patents `xhr/query`**(精確片語!) | 回 JSON total_num_results;**鬆散 OR 會灌水,務必用引號片語** |
| 專利完整內容(claims/description) | **Google Patents `/patent/{id}/en`** 靜態 HTML 解析(`metadata_patent_pipeline.extract_google_patent_sections`) | itemprop 結構在靜態 HTML;NPL 引用在 `detailedNonPatentLiterature`、被引專利在 `backwardReferences` |
| 大規模專利(數萬件) | **openclaw 瀏覽器路線**(`openclaw_mcp_server`/Docker 代理) | raw HTTP 大量會 503;瀏覽器用真實 session 繞過 |
| Espacenet | `espacenet_selenium_crawler`(Cloudflare-safe) | — |

## 反封鎖(本專案血淚)
- **Google Patents 大量 raw HTTP → 503 IP 封鎖**(我們 NPL 2855 件 + census 連打就中)。解:① 走**瀏覽器 in-page fetch**(真實 session,本專案 census 靠此繞過);② 退避重試(5/10/20s 指數);③ 量大用 openclaw Docker 代理;④ IP 熱了就**等冷卻**(`ft_census_watch.py`)。
- **OpenAlex 高速 → 429**。解:`mailto=` 進 polite pool + 退避 + 間隔 ≥0.3s。
- **CN 專利幾乎不引 NPL**(跨模態引用橋對 CN 是資料天花板,補不了)。

## 鐵律:可續 + 自癒(沒這個別開大量抓)
- **逐 id checkpoint**(每 100–200 寫一次),idempotent by id,kill 後重跑自動接續。
- **每請求 timeout + 重試**;失敗記哨兵值(−1/None),下輪自動重做。
- **nohup 脫離** harness(否則發訊息會殺到背景工作)。
- **自癒哨兵**:進程掛了拉起、服務停滯自動重啟(本專案 `_pf_classify_watch.sh` 範式)。
- **不並行搶同一後端**:ollama 嵌入與 ollama 生成同跑會搶記憶體互相卡死 → 序列化。

## 回源驗真(品質,別信幻覺)
- harvest 後跑 `verify_sources.py`/`verify_harvest_wf.py`:DOI/專利號/URL 可解析才入庫(揪 LLM 幻覺的假來源)。
- 語言正規化:嵌入前一律英文(專利用 `/en`),CJK 比例應≈0(見 EMBEDDING_STANDARD)。
- 年份回填(`patent_years.py`)、去重(真實標題跨來源比對)。

## 與脈絡接口
種子來自 [[problem-anchored-harvest]](用驗證問題當查詢,非窄關鍵詞);產業/法規面用 [[harvest-industry-news]]/[[harvest-regulation]];抓回的語料進 EMBEDDING_STANDARD 正規化。資產:`academic_harvest`/`ft_massive_papers`/`ft_recent_academic`/`harvest_symmetric`/`harvest_domain_ids`/`google_patent_consistent_fetcher`/`_kg_npl_harvest`/`_kg_cited_resolve`。
