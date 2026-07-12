---
name: pc-extraction-loop
description: ★四件套抽取(痛點/解法/材料/量化/新穎性)的 Claude-subagent 路線總控,延續 pc-genesis-loop / pc-downstream-loop 紀律。抽取是「牽涉語意」的步驟,故每件必錨 problem_id+瓶頸、register-safe、過 PC-gate 才折入 ckpt/KG/RAG。當要用 Claude subagent 取代 ollama 7b 做專利/論文四件套抽取、或補抽最差覆蓋節點時觸發。
---
# 問題意識抽取 loop(Claude-subagent 路線)

抽取= corpus→KG/RAG 之間「牽涉語意」的一步,**必須**和 genesis/downstream 同樣闖關(三角色互鎖、過閘才放行)。延續 [[pc-genesis-loop]] [[pc-downstream-loop]] [[pc-control-loop]] problem-consciousness-every-semantic-step。取代慢又笨的 ollama 7b(品質遠勝),但**不可因換引擎就鬆掉問題意識**。

## 為何抽取也要錨問題意識(鐵律)
四件套不是「讀專利寫摘要」,是「**以該問題節點的瓶頸為錨,問這件專利對這個瓶頸做了什麼**」。脫離瓶頸的抽取=產生離題雜訊污染 KG/dossier。所以每件抽取輸入都帶 `source_node + node_bottleneck + node_metric`,輸出的 relevance 就是「是否真打到這個瓶頸」。

## loop(三角色,只有通關才折入)
1. **策略** [[extraction-anchor-strategy]]:挑批次(最差覆蓋節點優先)、每件附問題節點瓶頸脈絡、register-aware 全文來源、分塊。產 `extract_in_*.json`(`_prep_extract_batch.py`)。
2. **執行**:派 Claude subagent(每塊一個,並行)讀全文→依瓶頸抽四件套→寫 `extract_out_*.json`。中文專利用中文抽、英文用英文;材料/數值忠於原文。
3. **監督** [[extraction-completeness-supervision]]:驗每件有 source_node+至少一實欄、欄位完整、覆蓋率較上輪上升、無重複、無殘片。不過→退回該塊重抽。
4. **批判** [[extraction-fabrication-critique]]:敵對查——無捏造材料/數值、relevance 誠實(不可全 yes)、register(別把法律樣板當 solution)、量化帶單位。不過→剔除該筆或重抽。
5. **折入**:通關才 `_fold_claude_extract.py` 併入 ckpt(標 `_engine:claude`),再進 `_kg_build_v3`(材料/解法→dossier/RAG)。未過閘不折入(錯誤不延續)。

## 覆蓋率持續成長(非停在固定樣本)
全語料 5,307~24,084 件不可能一次抽完。每跑全鏈前由 orchestrator 補抽 N 個**最差覆蓋**節點(尤其 dossier 節點),覆蓋率逐輪爬升。stage 8 只折入當前累積 ckpt(誠實標示「非全語料一次抽」)。

## PC-gate 紀錄
每批寫 `claim_pilot/extract_gate.json`:{batch, n, anchored_pct, field_complete_pct, relevance_dist, fabrication_flags, coverage_before→after, pass}。未 pass 不折入。

## 鐵律速查
- 每件錨 problem_id+瓶頸(脫錨不折)· register-safe(專利法律語→看穿到技術問題,別抄樣板)· relevance 誠實(no 照標)· 材料/數值忠於原文(不捏造)· 引擎可換、紀律不可鬆。
- harness:`_prep_extract_batch.py`(策略)→ subagent(執行)→ 監督/批判 → `_fold_claude_extract.py`(折入)。相關 [[patent-frontier-pc]] [[register-distortion]] 普查對稱閘(母體對稱/同語域計數)。
