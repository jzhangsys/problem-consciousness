---
name: manifold-corpus-control
description: 流形診斷的語料/表徵控制(M01–M03)。確認語料領域聚焦可重現、品質可控(去重/patent family 折疊/回源驗真/年份覆蓋揭露/provenance)、embedding 輸入欄位一致(避免 claims 法律模板與 boilerplate 主導鄰域)。當換語料或要做流形/白地分析前由 manifold-diagnostics 觸發,或直接檢查語料是否適合做幾何分析時觸發。
---
# 語料/表徵控制(M01–M03)

## M01 Domain Scope
- 技術領域明確、查詢可重現(query/CPC/IPC/關鍵詞/排除詞/時間窗)、系統邊界分層(chip/package/rack/data center 不混)、有 inclusion/exclusion。
- 失敗:cluster 由不相關產業構成 → 不得宣稱技術意義。

## M02 Corpus Quality
- 去重(documents);**patent family 級折疊**(continuation/divisional/同族高相似文本不得當獨立技術群;本專案:同『具體標題≥25字』折疊,family_dom 應 <0.4);DOI/專利號回源驗真;死鏈/幻覺退回;年份覆蓋率揭露(缺失不默補);assignee/CPC 標準化;保留 source_type/identifier。

## M03 Representation
- 明確使用欄位(本專案:paper/patent 皆 title+abstract[:500],**不含 claims** 以避法律模板偏差);各層輸入一致;**claims-vs-abstract** 比較(NN 重疊,本專案 0.94=穩健);去 boilerplate;記錄 model/維度/日期、chunking、embedding_id↔document_id。
- 失敗:cluster 由 claims 寫法/同代理人模板/單一公司模板造成。

## 通過門檻
核心語料可回源、重複與同族不主導鄰域、缺失已標、輸入欄位一致且非 claims 模板驅動。
實作:`build_unified_corpus.py`(family 折疊)、`verify_harvest_wf.py`(回源驗真)、`representation_check.py`(claims-vs-abstract/boilerplate)→ `ws_representation`。
