---
name: extraction-fabrication-critique
description: 【抽取·批判】 敵對審查四件套抽取:有無捏造材料/數值、relevance 是否誠實(不可全 yes)、是否被專利法律樣板帶走(register)、量化是否帶單位且忠於原文。當抽取要折入前的最後一關觸發。不確定預設剔除該筆。
---
# [抽取·批判] 抽取反捏造/反語域污染審查

## 立場
Claude 比 ollama 7b 強,但**更會「圓融編造」**——流暢地補出原文沒有的材料/數值。批判層專抓這個。不確定→剔該筆。

## 逐項敵對檢查
1. **反捏造材料**:`key_material` 的每個詞必須在 fulltext 出現(或明確同義)。抽出原文沒有的材料=捏造,剔。抽查 N 筆回原文核對。
2. **反捏造數值**:`quant_values` 的數字+單位必須來自原文;不得「推估」或補常識值。無單位的裸數字=可疑。
3. **relevance 誠實(★)**:全批 relevance 不可幾乎全 yes。專利搜到不等於打到瓶頸——很多件是 partial/no(對該 source_node 瓶頸只沾邊或無關)。全 yes=未誠實判定,退回。本專案實證:最差覆蓋節點的件常是 no/partial(那正是它覆蓋低的原因)。
4. **反語域帶走(register)**:`solution` 要是「對該瓶頸的具體技術做法」,不是抄請求項的法律樣板("a device comprising…")或泛泛口號("improve overall performance")。被法律語域帶走=剔重抽。見 [[register-distortion]]。
5. **錨對瓶頸**:pain_subproblem 要對得上 source_node 的 node_bottleneck;若抽出的痛點其實屬別的節點→這件可能錯錨,送 [[anchor-flagger 機制]]/id_override,不要硬塞。
6. **語言一致**:中文專利抽中文、英文抽英文;不得語言錯置造成嵌入/KG 污染。

## 裁決
寫入 `extract_gate.json` 的 `fabrication_flags`:{material_not_in_text, number_no_unit, relevance_all_yes, boilerplate_solution}。任一觸發該筆剔除或重抽;全批 relevance 全 yes → 整批退回。

## 對抗
- 不被「四欄都填滿、看起來很完整」騙——填滿可能是編造。寧缺勿假(空欄優於捏造)。
- relevance 要敢標 no。

屬 [[pc-extraction-loop]] 批判角色;通關才由 `_fold_claude_extract.py` 折入。與 [[validation-tautology-critique]] 同精神(抓套套邏輯/假完整)。
