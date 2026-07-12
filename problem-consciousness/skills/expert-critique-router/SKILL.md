---
name: expert-critique-router
description: 跨學科專家批判路由器——對任何「結論/主張/白地/機會/方向/建議」做領域專家級正確性審查。先判定該主張需要哪些學科透鏡(物理/化學/材料/分子動力學/數學/幾何/統計/財務工程/會計/生技/醫學/腦神經/法學/政策…),再呼叫對應的 critic-* lens skill 逐條批判,多主張時用 Workflow 並行(每主張×透鏡一個 agent),彙總裁決 SOUND/CONDITIONAL/FLAWED,並把裁決回饋到決策排序/分層(FLAWED→降級、SOUND→升級)。當要對 output 的科學/專業正確性把關、或使用者要求「驗證/批判/審查/背書」結論時觸發。
---
# 跨學科專家批判路由器(expert-critique-router)

對「結論/主張/方向/建議」做領域專家級審查的**統一入口**。不自己判物理或法律——而是**分派**給對的學科透鏡。

## 步驟
1. **抽取主張**:把 output 拆成可證偽的原子主張(每條一個技術/科學/專業聲明 + 其數字/機制)。
2. **領域分類**:對每條主張判定需要的學科透鏡(可多選):
   - 自然科學(物理/化學/材料/熱/分子動力學)→ `critic-natural-sciences`
   - 形式/數理(數學/幾何/統計/邏輯/證明/演算法複雜度)→ `critic-formal-math`
   - 量化專業(財務工程/會計/計量經濟/風險/估值)→ `critic-quant-finance`
   - 生命/認知(生技/分子生物/醫學/臨床/腦神經)→ `critic-life-cognitive`
   - 法律/政策(法學/法規/合規/智財/隱私)→ `critic-law-policy`
   - 資料科學/機器學習(訓練資料/模型評估/CV/特徵工程/部署/A-B/觀察資料因果/「用 ML」)→ `critic-data-science`
   - 社會科學(社會/行為/制度/態度/民意/不平等/組織/政策效果的人群機制)→ `critic-social-science`
   - 行銷(需求側:廣告效果/歸因/增額性/轉換/品牌/消費者意圖/區隔/定位/觸及/TAM)→ `critic-marketing`
   - 軟體工程(程式設計/軟體架構/資料庫 schema/資料建模/測試策略/CI-CD/AI 生成碼)→ `critic-software-engineering`
   - 投資/資產管理/財務會計(財報認列/公允價值/投組績效/風險調整報酬/受託程序)→ `critic-investment-asset-mgmt`
   - 工程/營建(結構安全係數/載重/規範遵循/工期成本/施工品質)→ `critic-engineering-construction`
   - 環保(LCA/碳盤查 Scope1-3/EIA 環評/ESG 揭露/漂綠/碳抵換/環境法規遵循)→ `critic-environmental`
   - 企業管理(策略優勢/流程改善/治理/管理決策)→ `critic-management`
   - 國際貿易(信用狀/單據相符/Incoterms 風險移轉/關稅估價/稅則/原產地/商品避險)→ `critic-international-trade`
   - 產業/供應鏈(供應側:未來路徑/白地/採用趨勢/量產成熟度/供應風險)→ `critic-market-supply`
   - 貨幣銀行(資本適足/流動性監理/貨幣創造/政策傳導/期限轉換/擠兌)→ `critic-money-banking`
   - 找不到對口時:套用本檔「通用嚴謹度準則」(見下)。
3. **執行批判**:單條→直接套對應 lens;多條→用 **Workflow** 並行(每主張×透鏡一 agent,schema 強制回 verdict),需外證時接 `critique-harvest`(WebSearch/WebFetch 抓文獻)。
4. **裁決彙總**:每條 SOUND(機制成立+有量化+尺度/前提正確)/ CONDITIONAL(機制成立但缺實證或前提待補)/ FLAWED(尺度誤用/前提不成立/與已知定律或法規衝突)。
5. **回饋排序**:把裁決寫回決策物件——FLAWED 降級或剔除、CONDITIONAL 標「需補證」、SOUND 升級;保留 before→after provenance(不可悄改),交 `pipeline-rectify`。

## 通用嚴謹度準則(無對口透鏡時)
- **機制**:因果鏈是否成立?有無反效應/隱藏成本?
- **量化**:有真實數字與單位嗎?還是只有關鍵字?
- **尺度/前提**:單位、尺度、樣本、邊界條件是否一致(禁跨尺度相減、禁前提偷換)。
- **對照**:相對哪個 baseline?增益是否顯著且可複現?
- **外證**:主張有可查證來源嗎?(無 → 交 critique-harvest)

## 輸出
每條主張:`{claim, domains[], verdict, checks[], gain_quantified, evidence[{ref,note}], fix}`;最後給彙總裁決分布 + 對排序/分層的調整建議。**禁止無依據的批判;FAIL/質疑須附文獻(critique-harvest)。**
