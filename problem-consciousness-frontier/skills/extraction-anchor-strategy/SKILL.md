---
name: extraction-anchor-strategy
description: 【抽取·策略】 四件套抽取的批次設計與問題意識錨定:挑最差覆蓋節點、每件附該節點瓶頸脈絡(node_bottleneck+metric)、register-aware 全文來源、分塊給 subagent。當要 prep Claude-subagent 抽取批次時觸發。對抗「讀專利寫摘要」式脫錨抽取。
---
# [抽取·策略] 問題意識錨定批次設計

## 任務
為 Claude-subagent 四件套抽取備批,讓每件抽取都**錨在問題節點瓶頸上**,不是泛泛讀專利。harness:`_prep_extract_batch.py`。

## 紀律(每件抽取輸入都要)
0. **★概念/實體雙軌(問題意識邏輯核心,不可省)**:每件帶 `kind`(concept/entity)+ 兩語域(mechanism_register/structure_register)+ `axis_guidance`。抽取**依 kind 分軌**:
   - **概念問題(concept,機制軌)**→ 抽「機制/物理洞察 + 量化發現」(這件對該瓶頸的物理機制理解、數值帶單位);solution 寫機制層做法,不是器件外殼。
   - **實體問題(entity,器件/材料軌)**→ 抽「具體結構/方法 + 關鍵材料 + 量化」(請求項核心做法)。
   統一 prompt 抽 57 節點=丟失雙軌,等於沒接問題意識邏輯。
1. **問題節點脈絡必帶**:每件附 `source_node`(problem_id)+ `node_bottleneck`(該節點的 why/瓶頸)+ `node_term` + `node_metric`(量綱)。抽取問的是「**這件專利對這個瓶頸做了什麼**」,而非「這件專利在講什麼」。無脈絡=不准送抽。
2. **最差覆蓋優先**:依「已抽/該節點總專利」覆蓋率升序挑;**每節點設上限**(PER_NODE)讓批次橫跨多個最差節點(尤其 dossier 節點 D1-D4),不擠單一節點。覆蓋率逐輪爬升。
3. **register-aware 全文來源**:openclaw_mcp_cache(有 claims/description=深,但描述須截斷防爆 token)→ corpus abstract(淺,已在手)。專利是法律/結構語域,抽取時要「看穿到技術問題」(prompt 明示),別被請求項樣板帶走。
4. **只挑未抽**(對 ckpt pub_number 去重)、分塊(每塊 ~20)讓多個 subagent 並行。
5. **雙模態皆可**:論文走機制語域、專利走結構語域;中文專利保留中文(抽取端用中文抽)。

## 對抗(★)
- 不准「抽好抽的、跳過難的」——最差覆蓋優先正是要逼向冷門/稀疏節點。
- 不准用單一泛瓶頸套所有件——每件用它**自己 source_node** 的瓶頸。
- 全文截斷要留請求項(claims 優先於 description),因為解法在請求項。

產出 `extract_in_*.json` + `extract_manifest.json`,交 subagent 執行 → [[extraction-completeness-supervision]] / [[extraction-fabrication-critique]]。屬 [[pc-extraction-loop]] 的策略角色。
