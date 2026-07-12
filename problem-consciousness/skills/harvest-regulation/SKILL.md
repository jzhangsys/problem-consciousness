---
name: harvest-regulation
description: 法規 harvest 路徑(語義辨識)——抓目標領域/材料/化學相關法規(PFAS/REACH/EPA/F-gas/RoHS),用來回推產業新聞的「為什麼」。強化 harvest-industry-news,提供因果根源。當批判涉及產業動態需追根、或驗證白地是否被法規驅動/封死時觸發。
---
# 法規 harvest(語義辨識,回推 why)
目的:產業新聞講「發生什麼」,法規講「為什麼」。3M 退出 PFAS ← 根因是 EU REACH PFAS 限制 + EPA 規範。法規可【封死】白地(禁某材料)或【創造】白地(逼退舊方案留缺口)。

步驟(僅需語義辨識,不需法律全文):
1. 對每條產業新聞/候選,辨識背後的法規驅動:PFAS/REACH/EPA、F-gas、RoHS、能效/能耗標準、出口管制。
2. WebSearch(ECHA / EPA / White&Case / Kirkland / 法律事務所 alert),抓 {法規名, 時程, 範圍, 對候選的衝擊(封死/創造/中性)}。
3. **因果鏈**:法規→產業動作→供應→市場缺口→機會。建 ws_causal_chain。
4. 入庫 ws_regulation。法規【創造】的缺口交 pipeline-rectify 標為法規驅動白地(高價值);法規【封死】的交 rectify 否決。
