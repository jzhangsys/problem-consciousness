---
name: frontier-live-scan
description: 【問題意識·防漏根因修正】 打破「封閉認識迴路」——問題意識框架不可只靠自身種子 harvest 的語料來發現瓶頸,否則「建框後才出現」或「不在語料裡」的最新前沿(如某剛出現的跨領域新方案、生物啟發新結構)結構性隱形,重跑幾次也找不到。每次要產出「最新前沿/白地/建議路徑/未來方向」或使用者要「最新資料/不得疏漏」時,必先對 LIVE 外部源(web 搜尋+近期頂會+廠商路線圖+新聞+arXiv 近月)做廣義(非框架種子)掃描,diff 現有節點,未涵蓋者→候選新節點→過問題意識閘→納入。確保「最新」是結構保證,不是運氣。
---
# 即時前沿掃描閘(破封閉迴路,保證拿到最新資料)

## 為什麼需要這個(根因:用戶曾抓到剛出現的新前沿類別被漏)
系統是**封閉認識迴路**:
`pc_frame(問題意識框架) → 種子(problem_nodes.py) → harvest → corpus → open-world-discovery 只掃 corpus → 回 pc_frame`
- harvest 的查詢種子 = 既有節點 → **只搜尋已知的東西**。
- open-world-discovery 標榜「對抗理論負載」,但它只從**既有語料**挖框架外片語 → 是「封閉語料內的 open-world」,**不是對真實世界的**。
- 全鏈**沒有任何一步拉 live 外部前沿**。pc_frame 建一次就靜態。
→ 後果:**任何「建框後才出現」或「不在 harvest 語料裡」的前沿,結構性隱形;重跑 N 次都找不到你從沒搜過的東西。** open-world 給「假完整感」。
實例:某些在建框之後才由主要廠商/研究機構發布的新前沿(如新的整合方案、生物啟發的新結構)——皆為近一兩年的新前沿、不在種子框架→ 既有節點完全沒有,系統自評卻說「涵蓋完整」。

## 鐵律:框架必須每輪「從真實世界刷新」,不可只自我參照
**在任何 framing / 白地 / 建議路徑 / 未來方向 / 「最新」請求之前,先跑本掃描。** 缺這步=結論可能漏掉整類最新解方,等於失效。

## 程序(每輪必跑,date-stamp)
1. **廣義 live 查詢(非框架種子)**:用「領域層級、開放式」措辭,刻意不用既有節點詞,避免迴路。對每個子領域問「最新/突破/新興/近一兩年」:
   - WebSearch:`<領域> <當前與次年年份> emerging|breakthrough|novel|roadmap`、`<領域> new approach announced`。
   - 近期頂會近 1-2 年議程/best paper:**該領域的主要學術與產業頂會**(會議名+年份+領域關鍵詞)。
   - 廠商/研究機構路線圖與發布:**該領域的主要廠商、代工/製造商、研究機構與新創**(名+領域關鍵詞+ announcement/roadmap)。
   - arXiv 近月(相關分類 + 關鍵詞)、產業媒體與領域專業媒體。
2. **抽候選主題**(瓶頸/解方/器件/材料/方法),每個帶來源 URL + 年份 + 一句量化(若有)。
3. **diff 現有節點**:對 pc_frame canonical+aliases 比對;**未涵蓋者 = 前沿缺口**(像 grep 全空=確診)。
4. **問題意識閘**(沿 [[problem-identification]]/[[extraction-problem-pairing-gate]]):候選須能寫成「痛點(實體)+解法(概念)+量化瓶頸(metric+unit)」才升為新節點;含糊/行銷詞→存 watchlist 不建節點。
5. **建節點**:寫 pc_frame / pc_frame_ssif / node_physics_map(給 native 軸,沿 problem-consciousness-every-semantic-step 與該領域的多軸 _axis_scope)/ node_anchor_registry;harvest 該節點語料 + 注入帶引用證據;全鏈重跑。
6. **新鮮度守門**:記錄 `last_frontier_scan` 日期;若 >30–60 天或語料截止 < 今−N 月,**標 STALE 並擋下「最新/白地」結論**,要求先跑掃描。每筆前沿主張過 [[citation-gate]](web 可查證)。

## 反模式(務必避免)
- ❌ 只用既有節點當 harvest 種子就宣稱「覆蓋完整」。
- ❌ 把「語料內 open-world discovery」當成「對世界的 open-world」。
- ❌ 用過時 baseline(教科書/CPC 碼,本身落後前沿 1-3 年)當覆蓋基準。
- ❌ 不帶日期、不查 live 來源就回答「最新/未來方向」。

## 與既有的關係
補 [[problem-framing]]/[[framework-completeness-strategy]]/[[framework-coverage-supervision]] 的致命缺口(它們對「既有/靜態 baseline」查漏,但不抓「世界上剛出現的新類」)。延伸 [[harvest-industry-news]]/[[patent-frontier-pc]] 成「系統化、每輪、廣義」的前沿刷新,而非僅 critique 觸發。是 [[problem-spine]] 的上游新鮮度保證。
