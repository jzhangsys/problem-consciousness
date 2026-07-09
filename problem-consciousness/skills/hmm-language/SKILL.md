---
name: hmm-language
description: HMM 生命週期(emerging/growth/mature/saturating;觀測=逐年[論文率,專利率])結果在本程式裡「該怎麼用語言表述」的合法語域與禁語。當要把 HMM 結果寫進結論草稿/報告、或驗證結論是否過度詮釋 HMM 時觸發。是 conclusion-evidence-supervision 的尺之一。
---
# HMM 生命週期結果的語言表述規範(合法語域 vs 禁語)

時間軸用 `_hmm_fit.py`:GaussianHMM 4 態全域 fit → 逐 problem_id decode。
**它合法量到的只有「活動的時序位置」與「paper↔patent 知識流時點」**,不是未來預測、不是機會。

## ✅ 合法語言(這樣講)
- 「依逐年[論文,專利]軌跡,此問題處於 **萌芽 / 成長 / 成熟 / 飽和-衰退** 期」(附 lifecycle + trend + 近態)。
- 「論文**領先**專利 N 年 = 知識**尚未轉化**為 IP」(lead_years;知識流時點)。
- sparse(年觀測不足)→ 明說「**時序不足以判定**」,不硬分期。

## ❌ 禁語(會被閘擋,違反 anti-predictive 教訓)
- ❌ 預測未來數值 / 外推 S 曲線 / 「幾年後會如何」——HMM 在本專案**只判生命週期態,不外推**。
- ❌「萌芽 = 機會」——萌芽未過 census(對稱普查)不能當機會;出版滯後會讓存量誤判萌芽。
- ❌ 忽略 **PUBLICATION_LAG**(出版滯後)與**池內偏差**(census 是池內非母體);lead-lag 須雙側都有年才算。

## 在本程式的角色
- HMM 在決策層是 INVESTIGATE「知識流落差」分支的**時序閘**(emerging/growth 才放行),不是機會本身。
- 寫結論時:HMM 句必附 lifecycle + trend,且若 census_verdict=inconclusive 或 n_year_obs 低 → 改說「時序訊號弱」。
- 任一 HMM 主張逾越上述合法語域(尤其預測語氣)→ conclusion-evidence-supervision 判 FAIL,退回重寫。

關聯:[[topology-language]] [[hmm-lifecycle]] [[hmm-critique]] 普查對稱閘(母體對稱/同語域計數) [[pc-conclusion-loop]]。
