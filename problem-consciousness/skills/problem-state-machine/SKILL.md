---
name: problem-state-machine
description: 問題意識的狀態機(P0→P10)與 skill 契約。一個問題從原始輸入推進到穩定的 Problem Model,必須逐狀態前進、每個轉移由一個 workflow 覆蓋、不得有 gap;每個 skill 帶六段契約,且每個 output 必須落進真的 Problem Model 或 Problem KG——不准產出到虛空。當要把問題意識做成可稽核、可驗證的 pipeline(而非鬆散一堆步驟)時觸發。
---
# Problem State Machine — 不准太早喊「Done」

## 立場
不准跑 `輸入 → 任務 → 執行 → Done`。
要跑 `人類意圖 → 觀察到的現象 → 問題候選 → 問題意識 → Problem Model → 問題資格 → 解決判準 →(才)Solution`。
先回答「有沒有定義對問題、它有沒有掙得消耗資源的權利」,再談下游執行。系統可能**對了錯的問題**——這道狀態機就是拒絕那件事。

## 狀態(P0→P10;每個轉移恰由一個 workflow 覆蓋,無 gap)
P0 原始輸入 → P1 現象捕捉 → P2 問題候選 → P3 領域 routed → P4 問題拆解 → P5 證據對映 → P6 替代解釋測試 → P7 問題資格 → P8 Model 穩定 → P9 解決判準 → P10 停止規則。
- **前向** workflow 覆蓋整條 P0→P10;**同態** workflow 精修 model 的某一面;**重開** workflow 處理 review。
- 一個 workflow 用到的 skill 必須在 skill registry 裡存在——編排不能呼叫一個從沒建過的 skill。

## 六段 skill 契約(每個操作單元都要帶)
`skill_md`(一句說明)· `inputs` · `outputs` · `procedure` · `validation`(可執行檢查)· `failure_modes`。
★鐵律:每個 output 必須落進真的 Problem Model 區塊或 Problem KG——**skill 不准產出到虛空**。

## 可執行地板
狀態機的底層是一個 Problem Model 物件 + 一支 validator,強制上述不變量。skill / workflow / agent 是上層機器;真正承重的,是「任何 Problem Model 都必須滿足的不變量」= 那道「拒絕太早 Done」的閘。

## 用途
把 [[problem-spine]] / [[pc-genesis-loop]] / [[pc-control-loop]] 等散步驟,收束成可稽核的狀態機骨架。
承 [[meta-problem-layer]](P2 前的認識論把關),接 [[problem-validation]](P7 資格閘)、[[problem-anchored-harvest]](P5 證據)。
