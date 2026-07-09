---
name: pc-downstream-loop
description: ★下游階段(幾何/HMM/KG-RAG/機會合成)的三角色(策略/監督/批判)審核總控,延續 pc-genesis-loop 紀律到創世之後。每個下游階段都必須 problem_id 錨定、register-safe(禁跨模態 cosine)、過方法閘才放行。當要跑幾何/HMM/KG/機會等下游分析時觸發。
---
# 問題意識下游 loop(創世之後每階段同樣闖關)

創世(框架→關鍵字→驗證→corpus→census)通關後,下游每個分析階段(幾何、HMM、KG/RAG、機會合成)**同樣**用三角色互鎖、只有通關才往下。延續 [[pc-genesis-loop]]。

## 跨下游鐵律(每階段都查)
1. **problem_id 錨定**:每個下游產物的每筆都掛 problem_id(可被 `_pcgen_thread_audit` 驗到 100%)。脫錨=不放行。
2. **register-safe**:禁跨模態 cosine(專利↔論文不直接比);鏈結走計數/同模態幾何/KG 邊。違者駁回(xdomain_bridge 已因此封存)。見 [[register-distortion]]。
3. **方法閘**:幾何先過 [[manifold-diagnostics]](點數/穩定);census 過 普查對稱閘(母體對稱/同語域計數);白地過 [[whitespace-definition]];結論過 [[expert-critique-chain]]。
4. **耐久優先**:物理 headroom(確定性)> 轉化率(無預測力)。任何白地候選須全球對稱 census + 三透鏡批判才升級。
5. **去注意力稀釋/最近性偏誤**:逐節點等權、反序抽查、確定性可重現(同創世鐵律)。

## 下游各階段的三角色 skill
- 幾何:[[geometry-strategy]] / [[geometry-supervision]] / [[geometry-critique]](方法本體 [[geometry-whitespace]] [[manifold-diagnostics]])
- HMM/時間:[[hmm-strategy]] / [[hmm-supervision]] / [[hmm-critique]](方法本體 [[hmm-lifecycle]])
- KG/RAG、機會合成:沿用 [[problem-spine]] [[three-layer-relations]] [[five-axis-consistency]] [[expert-critique-chain]] + 本 loop 三角色精神。

## gate 紀錄
每階段寫 `claim_pilot/downstream_gate.json`:{stage, problem_id_coverage, register_safe, method_gate_pass, critique_verdict, pass}。未 pass 不啟動下一階段。
