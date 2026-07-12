---
name: patent-frontier-pc
description: 用「問題意識邏輯」(概念問題=機制軌 + 實質問題=器件材料軌)驅動 openclaw 做專利前沿提取。每筆專利帶 source_node+axis provenance,可追溯到哪個問題、哪一軌,並回流問題錨定 pipeline。當需要抓 2025+ 目標技術領域的專利前沿、填出版滯後盲區、或把專利接進問題意識 KG 時使用。
---

# 問題意識專利前沿提取(openclaw,概念/實質雙軌)

## 核心紀律(本專案鐵律)
1. **抓取一律用 openclaw 自己的抓法,不自寫 requests 引擎**。`patent_frontier_pc.py` 直接 import 並重用 `company_patent_free_crawler` 的函式(Espacenet OPS 搜尋 `_query_all_espacenet` + biblio `_fetch_espacenet_patent_data`,內含 `robust_get`/`looks_blocked`/限速/UA輪替/反封鎖)。問題意識查詢只走 CQL 文字欄 `field='txt'` + 日期 `date_filter`。★教訓:Google Patents XHR(urllib)會被 HTTP 503 節流且回垃圾(曾把不相干領域的專利配給目標查詢)——已棄用,改 openclaw 的 Espacenet 抓法。
2. **查詢式不是憑空關鍵詞** —— 一律由 `problem_nodes.py` 的雙軌程式化展開:
   - **概念問題(concept / 機制層)**:抽象普遍的物理機制/邊界/極限(如某界面輸運機制、某極限的提升…)——「為什麼難」。
   - **實質問題(entity / 器件材料層)**:被規定的具體器件/材料/結構(如某具體器件/材料/結構…)——「在什麼東西上難」。
3. **provenance 強制**:每筆抓回必帶 `source_node`(問題節點)+`axis`(concept/entity)+`query`,否則無法問題錨定串接 KG/RAG。
4. 不破 CAPTCHA、不繞登入、不用 Sci-Hub。被擋就降速重試或回報,不偽造。

## 標準流程
1. **產生/確認雙軌查詢**:`python3 problem_nodes.py` 印出全展開(13 節點 × concept/entity)。要新增子問題就改 `problem_nodes.py`(單一真實來源,arxiv harvest 也共用)。
2. **派工 openclaw**:把任務訊息送進 openclaw(含關鍵詞「問題意識/專利/前沿」),openclaw_api 的 `detect_intent` 會認成 `patent_frontier_pc` → 跑 `patent_frontier_pc.py`。
   - 或直接在 openclaw 容器執行:`docker exec openclaw_ui python3 patent_frontier_pc.py --years "2025 2026" --per-query 30 --sleep 2`
3. **產出**:`openclaw_channel/outbox/patent_frontier_2025_2026_result.jsonl`,每行
   `{pub_number,title,abstract,assignee,date,source_node,axis,query,track,year}`。checkpoint 在 `claim_pilot/patent_frontier_pc_ckpt.json`,可斷點續跑。
4. **回流 ingest**(抓取完成後):`python3 _ingest_patent_frontier.py` → 去重併入 `unified_corpus` + by-id 嵌入庫,保留 provenance。
5. **全面重跑**:`python3 run_pipeline.py`(2a 問題錨清洗起)→ 專利前沿自然進 KG/脊椎/E1。

## 反節流紀律
- 每查詢式間 `--sleep` ≥ 15s;被擋(例外)時自動 sleep×2 並跳過該式留待續跑。
- UA 輪替已內建;`--num` 控每式上限(預設 50)。
- checkpoint 記「已完成查詢式 + 已見專利號」,重跑只補未完成的,不重抓。

## 驗真
- ingest 後檢查 `軸分布(概念/實質)` 兩軌都有量;逐節點不應集中單一節點。
- 專利號需可在 Google Patents 還原;assignee/date 缺失要回報,不臆造。

相關檔:`problem_nodes.py`(雙軌真實來源)、`patent_frontier_pc.py`(抓取)、`_ingest_patent_frontier.py`(回流)、`openclaw_api.py`(意圖路由);與 `problem-anchored-harvest`(arxiv 同源雙軌)、領域物理批判(抓回後物理批判)搭配。
