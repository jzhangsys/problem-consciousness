---
name: ssif-reasoning-os
description: 【Reasoning OS·總控】 SSIF×問題意識邏輯的雙塔對齊推理作業系統:白地=top-down演繹塔(物理+辯證的應然圖)與bottom-up經驗塔(實然圖)在物理脊椎上對齊的差。當要做某技術領域前沿的白地路徑推導、未來解推論、把SSIF(Hegel辯證/Peirce溯因/Popper否證/Kuhn典範)接進pipeline+KG/RAG、或診斷「為何只有bottom-up會發散」時觸發。統攝 [[wellposedness-gate]]、[[systematic-anchoring-discipline]]、量化物理批判、[[pc-genesis-loop]];延續 ssif-two-tower-architecture、floor-ceiling-vision-architecture。
---
# SSIF Reasoning OS(雙塔對齊推理作業系統)

## 為什麼(2026-06-22 用戶點破)
純 bottom-up(撈資料→分群→落差)會無窮無盡發散、沒方向;純 top-down(哲學演繹)會脫離物理。**白地只在兩端對齊處浮現**:top-down 說「必要∧物理可達」、bottom-up 說「未做/稀疏」→ 那個差=白地路徑。SSIF 提供 top-down 的辯證生成文法,physics_kernel 提供接地內容。

## 共用物理脊椎(座標系,守禁跨模態 cosine)
系統端到端的串聯阻抗/因果網路(spine.json,8 段)。兩塔結果都索引在此座標 → 對齊走**物理度量非 embedding 相似度**。

## Tower-1 Top-down 演繹塔(data-blind:只讀 physics_kernel+demand+脊椎)
`_tower1_deduce.py`:T1.0 需求→必要全域降幅 · T1.1 Amdahl 強制每段目標(含補 framework gap)· T1.2 強制矛盾(Hegel,物理 coupling)· T1.3 物理完整解空間 lever · T1.4 理論天花板(各機制的理論極限:界面上限/臨界上限/塊材上限/理想混合上限)· T1.5 可達性+溯因必須解(Peirce)。★鐵律:不讀語料/證據,否則塌回單塔。數字代表性(規模/總量/幾何)須標明可校準。

## Tower-2 Bottom-up 經驗塔(既有 pipeline)
`_tower2_adapter.py`:harvest→兩層錨定→抽取→wellposed floor→census→geometry→HMM 表成 SSIF is-map。★**幾何=擁擠度訊號,不是白地神諭**(解決幾何老問題);HMM=生命週期+張力時序。

## Convergence 對齊層(中心)
`_convergence.py`:沿脊椎疊兩塔 → 白地五分類:
- **white_space**(必要∧物理可達∧有落差∧不擠)= 部署 known lever 的執行白地 → INVESTIGATE
- **frontier_white_space**(必要∧物理不可達)= 須典範轉移,最高價值 → INVESTIGATE
- **blind_spot**(必要但 bottom-up 無資料)→ REFRAME + targeted harvest
- **red_ocean**(擠+可達低價值)→ WATCH
- **mature**(部署≈天花板)→ EXCLUDE
公式:`Whitespace=問題嚴重×矛盾嚴重×殘餘×成長÷解密度`;`Paradigm Shift=累積張力×可用解空間×採用機率`;`Future Solution=f(Problem,Constraint,Contradiction,Failure,Tension)`。

## KG/RAG 貫串
`_ssif_kg_rag.py`:KG 節點掛 ssif_category/layer/spine_stage,邊 solves/constrains/contradicts/abduces + Contradiction/Tension 節點。RAG **tower-aware routing**(rag_routing.json):top-down 查物理/應然、bottom-up 查文獻、contradiction 查 trade-off、solution_space 查候選、whitespace 查對齊路徑。依問題 SSIF layer 派 route。

## 接地契約(防脫離哲學無底洞)
SSIF 給結構、physics_kernel 給內容。矛盾=可量測 trade-off、張力=真實殘餘落差、溯因解=可證偽(Popper 對抗批判)+物理封底。每 entity 進量化前過對應閘([[wellposedness-gate]] / [[systematic-anchoring-discipline]] / 量化物理批判)。

## 鏈位
run_pc_chain_v3.sh:5f(pc_frame_ssif→rth_spine→ssif_ontology→tower1)→ 6b(floor/ceiling)→ 6c(tower2→convergence)→ ssif_kg_rag。三稽核 FAIL=0、12/12 機制。
