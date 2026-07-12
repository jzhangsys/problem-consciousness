---
name: problem-level-processing
description: 通用(領域無關)的問題層級處理框架——把任何問題拆成 L0-L8 八層,每層只許下對應層級的結論,防 LLM 自由發散/跳層/把假設當結論。適用所有領域:科學研究、產業技術、法規政策、產品策略、資料科學、投資判斷、工程設計。當要分析/深化/下結論於「任何問題」時觸發,尤其判斷「我現在憑現有證據只能講到哪一層」。特定技術領域可據此實例化出領域專屬的細化版。
---

# 問題層級處理框架(Problem Level Processing Framework v1.0)

> 一句話:問題層級處理的核心,不是讓 AI 更會回答,而是**讓 AI 知道自己現在只能回答到哪一層**。

## 適用範圍(★通用版 vs 領域實例化版的差異)
**領域無關、統一都要做**。任何問題分析/深化/結論都套這套元層紀律——科學、產業、法規、產品、資料、投資、工程皆可。
它是治理「所有推理」的元框架;**特定技術領域**的材料/路徑推論請用其領域實例化版(把通用機制規則換成該領域的具體機制規則、路徑集與 scale)。其餘領域要實例化時,照本框架換對應的機制規則與 scale 即可。

## 核心定義
問題不是結論。問題是一個受控物件,由九件構成:observed phenomenon / defined subject & boundary / conceptual construct / measurable variables / possible mechanisms / solution hypotheses / validation requirements / implementation constraints / governance & stopping rules。
LLM 在此框架**不是主判斷者**,而是抽取、分類、比對、整理與產生受控報告的工具;真正的約束來自資料結構、證據等級、規則引擎與人類審查。

## L0–L8 問題層級(禁止跳層)
| 層 | 名稱 | 核心問題 | 主要產物 | 禁止跳躍 |
|---|---|---|---|---|
| L0 | 現象層 | 看見什麼異常/需求/趨勢/痛點 | phenomenon_card(現象陳述,不含因果) | 直接提解法 |
| L1 | 情境與邊界層 | 問題發生在哪、對誰、什麼條件 | context_card(主體/場景/邊界/排除範圍) | 把局部外推到全部 |
| L2 | 概念/構念層 | 這問題真正在指什麼概念 | construct_card(定義/反概念/排除項) | 名詞漂亮但不可操作化 |
| L3 | 變項與量測層 | 如何把概念變成可觀測資料 | variable_map / measurement_plan(代理指標≠構念) | 把不可測概念拿去建模 |
| L4 | 機制/因果層 | 為什麼會發生、有哪些機制 | mechanism_graph + ≥2 替代解釋 | 把相關性說成因果 |
| L5 | 解法空間層 | 可從哪些方向介入(不排名/不承諾最佳) | path_card(每條對應瓶頸+機制) | 過早選定單一路線 |
| L6 | 驗證設計層 | 如何證明或推翻 | validation_protocol + success/falsification criteria | 只展示成果不做驗證 |
| L7 | 工程/制度落地層 | 如何進真實系統並穩定運作 | implementation_plan + risk_register | 把 prototype 說成 product |
| L8 | 治理與停止規則層 | 何時繼續/轉向/暫停/封存 | decision_gate + version_log + stopping rule | 無限深化、無法決策 |

通用流程:Raw Input → L0 → L1 → … → L8(逐層;每層有固定產物卡片才放行)。

## 推進規則 R1–R6(硬規則)
- **R1 不跳層**:L0 現象不能直接推 L5 解法;L3 代理指標不能直接推 L4 因果。
- **R2 每層有產物**:每層輸出固定格式卡片,讓推論可追蹤可審查。
- **R3 每結論有等級**:結論分 假設/機制合理/資料支持/因果驗證/工程落地/商業落地,別把低層證據包裝成高層結論。
- **R4 每路徑要反證**:候選解法必帶可能失敗原因與缺失證據(不只列優點)。
- **R5 LLM 僅在資料內推論**:未載入文件/資料/人類指定知識,不得作為證據(防幻覺與外部記憶污染)。
- **R6 人類審查不可省**:涉策略、法律、醫療、金融、工程安全、重大投資時必須有人工 gate。

## 結論等級 C0–C8(控制 LLM 不亂升級)
C0 未整理觀察 / C1 問題描述成立 / C2 概念可操作化 / C3 資料支持關聯 / C4 機制合理待驗證 / C5 因果/機制初步驗證 / C6 解法受控環境有效 / C7 真實場景可運作 / C8 可治理可擴張。
**核心硬規則**:`if conclusion.level > evidence.max_supported_level: 降級或 block`,並回 `rejected_scale_jump`。例:C3(相關)不得寫成 C5(因果);prototype 不得說成 commercial。

## 八道防幻覺閘
Evidence Gate(有 source_id/claim_id/data_id?)· Layer Gate(屬哪層?是否跳層?)· Definition Gate(核心概念已定義?)· Measurement Gate(代理指標有來源?)· Mechanism Gate(有機制鏈+替代解釋?)· Validation Gate(有成功/失敗條件?)· Risk Gate(涉安全/合規/倫理/成本?)· Review Gate(需人類審查?)。未過 → 降級/阻止/要求補件,不放行。

## LLM 任務分工
可交 LLM:抽取(現象/claim/指標/限制)、分類(內容→層級+物件)、比對(claim 是否支持機制/路徑)、報告(固定格式)、反證(列替代解釋/缺失/風險)、決策輔助(整理選項/門檻/未決)。
**不得交 LLM**:自己補不存在的數據、把分類當真理、無證據生新機制、自由寫似完整但不可追蹤的分析、自行判定風險可忽略、替人類做高風險最終決策。

## 固定輸出:Problem Level Report
`## 1 Current Layer`(現在哪層/為何/尚不允許的結論)`## 2 Problem Object`(物件型別/定義/邊界/evidence refs)`## 3 Derived Questions`(下層澄清問題/上層決策問題)`## 4 Inference Chain`(observation→construct→variable→mechanism→path→validation)`## 5 Advantages/Limitations`(這層能解/不能解什麼)`## 6 Missing Evidence`(缺哪些資料/量測/驗證)`## 7 Next Action`(continue/freeze/escalate/stop)。

## 資料物件 + 通用 Schema(可選實作)
9 卡片:phenomenon_card / context_card / construct_card / variable_map / mechanism_card / path_card / validation_card / implementation_card / decision_card(欄位見框架原文)。
通用 SQL:`problem_objects`(object_type/parent_id/layer/content_json/evidence_refs/conclusion_level)、`evidence_items`(source_type/source_ref/claim_text/evidence_level/applicable_layer/limitations)、`inference_edges`(from/to/relation_type∈supports/contradicts/derives/maps/requires/limits/confidence)、`decision_gates`(required_level/passed/reviewer/rationale/next_action)。

## 典型錯誤(逐一防)
觀察即結論→退 L0/L1 要 source+boundary;概念未定義→建 construct_card;代理指標誤認→標 proxy 不等同 construct;相關性變因果→建 causal graph + 替代解釋;解法先行→要求從 L0–L4 重推;缺少反證→強制 counter_evidence_gate;無限深化→建 L8 stopping rule。

## 如何使用(每次牽涉「下結論」時)
1. 先定位:這個主張/問題現在站在哪一層(L0–L8)?
2. 查 evidence 的 max_supported_level,**結論等級不得超過它**(超過→降級,明說「目前只能講到 Cn」)。
3. 每條解法路徑附反證 + 缺失證據;重大決策掛 L8 stopping rule + 人類 gate。
4. 用固定 Problem Level Report 格式輸出,讓推論可追蹤。
與既有 [[problem-framing]]/[[problem-spine]]/[[pc-genesis-loop]]/[[ssif-reasoning-os]] 相容——本框架是它們的**領域無關、可攜版**總則;領域實例見各領域自己的實例化版本。
