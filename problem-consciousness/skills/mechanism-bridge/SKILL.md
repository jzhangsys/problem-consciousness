---
name: mechanism-bridge
description: 機制橋——把【基礎研究】(只講物理機制、不指定用途)接到應用問題節點,經「基礎科學機制核」做同語域語義橋接(不違反跨模態cosine禁令)。當基礎研究被應用語域分類器漏判離題、要回收上游基礎研究、要建「問題→機制→基礎研究」連結供RAG、或要 problem-anchored harvest 基礎研究時觸發。本專案實證:回收1948+harvest3029篇真基礎研究。是 [[three-layer-relations]] 的前置回收層。
---
# 機制橋:基礎研究 ↔ 問題意識(跨語域、同語域比對)

> **問題**:基礎研究不指定用途(講底層物理機制:微觀輸運 / 界面失配 / 相變成核,**不講具體應用場景**),所以被**應用語域**分類器(centroid/prompt 都是應用語言)整批打成離題丟掉。問題脊椎於是只連應用論文+專利,**漏掉整個基礎研究上游**。

## 核心手法:基礎科學機制核
為每個應用問題節點,寫出其**上游基礎物理機制核**(physics kernel),用**基礎研究語域**撰寫(模仿物理/材料論文摘要措辭)。例:
- node 界面瓶頸 → 界面層基礎輸運機制 / 界面失配理論(acoustic-diffuse mismatch) / 粗糙接觸力學 / 複合材料滲流
- node 傳輸/擴散瓶頸 → 微觀輸運理論 / 低維材料傳輸特性 / 材料微結構工程
- node 臨界極限瓶頸 → 相變成核 / 臨界態失穩 / 界面線動力學 / 傳輸驅動極限

## 為什麼合法(關鍵):同語域比對
機制核是**基礎研究語域**,基礎研究文獻也是基礎研究語域 → **機制核↔基礎研究是同語域 cosine**,**不違反** EMBEDDING_STANDARD「絕不直接比跨模態cosine」(那條禁的是 applied-patent↔basic-paper 跨語域)。見 [[register-distortion]]。

## 流程(`_mech_kernels.py` → `_basic_recover.py` → `_basic_harvest.py` → `_mech_bridge_index.py`)
1. **建機制核**:每節點 2-4 條,嵌入到與語料**同空間**(mxbai whiten=False)。
2. **回收**:對離題堆算機制核 max-cos≥0.70(校準:on-domain 90分位)→ 找回被誤判的基礎研究,連到節點+機制。**基礎層與應用層分開存,不污染問題計數**。
3. **擴增 harvest**:機制核當 problem-anchored 種子(機制詞,非應用詞)從 OpenAlex/arXiv 抓更多 → 見 [[literature-harvest]]、[[problem-anchored-harvest]]。嵌入後同樣過機制核驗證(cos≥0.70)。
4. **接進脊椎**:建 `問題節點→機制核→基礎研究文獻` 可查詢橋(`mechanism_bridge.json` + `basic_docs_store.json`),供 RAG 檢索。

## ⛔ 紀律
- **回收層(語料內)非循環、可信**;**harvest 層內生**(專門針對機制去抓→儲備數放大、轉化率分母膨脹)→ 下白地結論時 harvest 數要打折,看回收層+時間領先。
- **機制橋只回收了一側(基礎研究)**。專利側的「材料/器件語域」也被同樣語域病漏掉(某功能材料膜/某器件結構)→ **絕不可只用機制橋的基礎數 ÷ 未校正的分類器專利數算轉化率**(會造幻影白地)→ 必過 普查對稱閘(母體對稱/同語域計數)。
- 精度~85%(keyword/cos 都有假陽性),抽樣驗真後才用。
資產:`mechanism_kernels.json`、`mech_kernel_emb.npy`、`basic_research_links.json`、`basic_harvest_emb.npy`。
