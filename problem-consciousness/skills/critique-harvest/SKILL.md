---
name: critique-harvest
description: 對每個批判點,實際 harvest 文獻/產業報告佐證(WebSearch/WebFetch/OpenAlex/PubMed),每個批判主張都要附可查證參考。當 critic-* 產出 FAIL/質疑需證據時觸發。禁止無引述的批判。
---
# 批判文獻抓取
規則:**任何批判主張都必須附可查證來源**。
1. 對每個批判點,構造檢索詞,用 WebSearch(產業/工程)+ OpenAlex/期刊(學術)+ WebFetch(讀原文)抓 2-3 個來源。
2. 抓:期刊論文(doi)、產業報告、專利號。記錄標題+來源+關鍵數據。
3. **誠實雙向**:harvest 可能糾正批判(如某方案的量化增益其實成立、文獻支持)——若文獻反駁批判,如實記錄並修正批判,不可選擇性引用。
4. 輸出:每批判點 → {主張, 支持/反駁, citations[]}。入庫 ws_citation / ws_rectification。
