---
name: peer-cross-check
description: 同層 sub-agent 出裁決前互相確認的方法。多個平行代理各做各的會互相矛盾;放任互通又會互相汙染、湊出集體幻覺。peer cross-check 定義「同一層的代理如何在出最終裁決前彼此查核」,讓多代理既獨立又收斂。當一個結論由多個平行 agent 產生,要在合併/放行前確保它們不是各說各話、也不是集體幻覺時觸發。
---
# Peer Cross-Check — 多代理的裁決前互查

## 問題
把工作拆給一群同層代理:
- **各做各的(預設不溝通)** → 結論互相矛盾、沒有共同基準;
- **放任互通** → 一個代理的幻覺/錯誤汙染其他人,湊出一個聽起來合理、其實錯的共識。
兩者都不能把「一群代理的共識」當成真理來源。

## 方法
在同層代理各自產出**獨立**裁決後、合併之前,插一道結構化互查:
1. **獨立先行**:每個代理先在隔離下完成自己的裁決與依據,不看別人的過程(避免錨定與汙染)。
2. **交叉查核**:再讓它們互查彼此的**依據**,而不是彼此的**結論**——查證據、查推論跳步、查有沒有過度詮釋。
3. **確定性仲裁**:分歧不由投票或口才決定,交回**確定性判決/資料**當仲裁者;代理只能提案與說明,不能靠「大家都這樣說」翻案。
4. **收斂條件**:達到多數獨立同意 + 通過確定性檢查才放行;否則 reframe / hold。

## 鐵律
- 查**依據**,不查結論。
- 共識**不覆蓋**確定性判決。
- 不確定 → hold,不硬湊。

## 可實作交換契約(I/O schema — 讓上述原則可直接編排)
三階段管線,每階段有明確 schema;代理只交**結構化物件**、不即時對話——「溝通」以「把前階段輸出當後階段輸入」實現。

**階段1 — 獨立裁決(fan-out,隔離)** 每個代理回:
`{ agent_id, scope, verdict: PASS|CONCERNS|FAIL, findings:[{ point, severity: blocker|major|minor, evidence(引檔/資料), fix }], summary }`

**階段2 — 交叉查核(互讀依據,非結論)** 把階段1**全體** findings 打包餵給每個代理,回:
`{ reviewer, agreements:[ref], challenges:[{ target, why }], missed:[point] }`
—查 evidence 與推論跳步,可回讀原始檔驗證;不查彼此結論。

**階段3 — 確定性仲裁** 仲裁者收 階段1+2,對每項回:
`{ item, verdict, rationale, actions }` + `overall`
—分歧以 evidence/確定性判決裁,不以票數;共識不覆蓋確定性檢查。

**通道與收斂**:以「前階段輸出=後階段輸入」串接(fan-out → 打包 → cross-check → arbiter),或落一個共享 artifact bus。收斂 = 多數獨立同意 ∧ 通過確定性檢查,否則 reframe/hold。可直接用編排器的 `parallel() + agent(schema)` 實作;上列 schema 即 fan-in 契約。

## 用途
是 [[meta-problem-layer]] 的一環(Peer Cross-Check Method),供任何多代理結論在放行前套用。
呼應 [[expert-critique-router]] 的獨立多透鏡精神;與 [[citation-gate]] 一起,把「意見」擋在「可查證判決」之外。
