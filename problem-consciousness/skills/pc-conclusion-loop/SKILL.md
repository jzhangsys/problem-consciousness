---
name: pc-conclusion-loop
description: ★最終結論合成的三角色(策略/驗證/批判)loop 總控,延續 pc-genesis-loop 紀律到 output 層。deterministic(幾何/HMM/census)先出判決,LLM 沿問題意識+KG+RAG 寫結論草稿→三角色 loop 修到通關→才給最終 output。LLM 只說明不翻案。當要產出某領域前沿分析的最終結論/報告時觸發。
---
# 問題意識 結論合成 loop(output 層總控)

## 為什麼存在
修掉「output 其實是 LLM 自己標註」的根本病:**判決必須 deterministic、可重現;LLM 只負責「說明為什麼成立 + 前提 + 反證」,不翻案。** 結論的「寫作」本身是牽涉語意的步驟,故也要過三角色 loop,不過關不放行(同 [[pc-genesis-loop]] 紀律)。

## 流程(harness:`_conclusion_prep.py` → subagent loop → `_conclusion_fold.py`)
```
deterministic 運算(幾何+HMM+census+物理)→ 四態判決(_pc_decision.py,迴圈裡無 LLM)
        │
        ▼
①備料 _conclusion_prep.py:每張需敘事的卡 → deterministic 訊號 + 調用 RAG(_kg_rag.retrieve,register 分層)citation
        │                                       + KG concept↔entity links + 拓樸/HMM 語域尺 → conclusion_packs.json
        ▼
②三角色 loop(派 subagent,逐 pack;不過關一直跑到過關):
   策略 [[conclusion-synthesis-strategy]] → 寫草稿(沿問題意識八層+KG+RAG,鎖語域)
   驗證 [[conclusion-evidence-supervision]] → 逐句對 deterministic/citation/語域/四禁,FAIL 退策略
   批判 [[conclusion-adversarial-critique]] → 物理/IP/市場 refute + 過度詮釋/捏造/citation 把關,FAIL 退策略
   → 三關全過 passed=True，寫 conclusion_out_*.json
        ▼
③折入 _conclusion_fold.py:passed 草稿 → decision_cards.conclusion + 09_conclusions.md
        ▼
④最終 output:LLM 用「通關草稿 + deterministic 判決 + RAG 文獻」給最終呈現
```

## 鐵律
- **LLM 不翻案**:草稿 claimed_decision 必 == deterministic 判決;衝突 → 折入閘擋(conflict),不採信。
- 若批判發現判決證據不足 → **加 uncertainty_tag / 打回 deterministic 重算**,不是 LLM 直接改標籤。
- 每句拓樸鎖 [[topology-language]]、每句 HMM 鎖 [[hmm-language]];每個事實主張有 RAG citation([[citation-gate]])。
- problem_id 全程錨定;register-safe(概念機制語 / 實體器件材料語;禁跨模態 cosine)。
- cheap-first:先小批(INVESTIGATE/REFRAME)過 loop,確認再放大到 EXCLUDE/WATCH。

## 角色分工
策略=寫、監督=對得上不對得上、批判=敵對駁倒。三者互鎖,延續 [[pc-genesis-loop]] / [[pc-downstream-loop]] / [[pc-extraction-loop]] 的三角色紀律到結論層。
