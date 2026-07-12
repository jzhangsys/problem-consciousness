---
name: expert-critique-chain
description: 自動批判導正鏈——對任何「技術白地/機會/未來路徑」output,自動依序跑七專家 skill:三透鏡批判→抓文獻→抓產業新聞→導正→重驗→citation把關,最終只放行全數附文獻且通過三透鏡的結論。當產出或審查白地/機會決策 output 時觸發(白地、未來路徑、值得研發、機會清單)。
---
# 專家批判導正自動鏈(master 編排)
**觸發**:任何白地/機會/未來路徑 output 產生或待審時,自動跑此鏈,不可略過。

**順序(階段間有依賴,需序跑;階段內可並行)**:
1. **批判(並行三透鏡)** → `critic-natural-sciences` + `critic-ip-landscape` + `critic-market-supply`
   每條結論過三透鏡,產出 critique 點 + PASS/FAIL。
2. **抓證據(並行)** → `critique-harvest`(學術/期刊)+ `harvest-industry-news`(供應/法規/趨勢)
   每個 critique 點都要附可查證 citation;雙向誠實(文獻可糾正批判)。
3. **導正** → `pipeline-rectify`
   被推翻/降級的結論:記錄 {原值→批判→文獻→導正後→真正方向},入庫 ws_rectification,原值不刪。
4. **重驗** → `rectify-reverify`
   導正後結論再過三透鏡;任一不過或無 citation → 打回階段 3,循環至全過。
4.5 **五軸自洽** → `five-axis-consistency`(痛點×學術×專利×市場/產業×法規 交叉自洽;不自洽不進拓樸;法規創造的缺口=最高價值)
5. **把關** → `citation-gate`
   最終 output 每條結論/數值/批判必須有 citation,否則標「未證實」或移除;探索性指標標「氛圍非證據」。通過才放行 HTML/報告。

**鐵律**:
- 沒過 citation-gate 的 output 不得呈現為「確認」。
- 三透鏡任一給致命傷(物理不成立/全球已覆蓋/供應崩塌)→ 該條降級或否決,並給 redirect。
- 全程入庫 Supabase(ws_rectification / ws_citation / ws_industry_news),導正過程可稽核。
