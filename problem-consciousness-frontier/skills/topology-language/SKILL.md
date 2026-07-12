---
name: topology-language
description: 拓樸/幾何(manifold M0–M4, cr 緊緻度, 內在維度)結果在本程式裡「該怎麼用語言表述」的合法語域與禁語。當要把幾何結果寫進結論草稿/報告、或驗證結論是否過度詮釋幾何時觸發。是 conclusion-evidence-supervision 的尺之一。
---
# 拓樸/幾何結果的語言表述規範(合法語域 vs 禁語)

幾何層用 `_geom_manifold.py`:逐 problem_id【分模態】算 whiten→cr 緊緻度→TwoNN 內在維→跨節點百分位分級 M0–M4。
**它合法量到的只有「單一模態內、文獻點雲的結構」**,不是機會、不是白地、不是跨模態相似。

## ✅ 合法語言(這樣講)
- 「此問題的**文獻結構已收斂/仍分散**」(cr 高=緊緻收斂;低=分散探索或異質)。
- 「研究**聚焦度**相對其他節點高/低」(用 M0–M4 百分位等級,**相對**,非絕對)。
- 「子問題橫跨約 N 個自由度」(內在維度 id_twonn)。
- 講的是**研究結構 / 主題成熟度 / 是否為真群集**。

## ❌ 禁語(會被閘擋,違反 [[whitespace-definition]] / [[register-distortion]])
- ❌「低密度 = 白地 / 機會」——幾何密度 ≠ IP 白地(語域扭曲;白地定義見 [[whitespace-definition-LOCKED]])。
- ❌ 任何**跨模態 cosine / 相似**(paper 質心 vs patent 質心,模態 AUC 0.99,被 register 切開非技術)。
- ❌ 在 **M0–M1** 還下密度結論;密度結論需 **M2+**,孤立/測地需 **M3+**;M0 一律排除([[manifold-grading-gate]])。
- ❌ 幾何直接等同「有沒有機會 / 值不值得做」——幾何只說「研究 collapse 到多緊」,機會由 census/HMM/物理+決策層定。

## 在本程式的角色
- 幾何在決策層**只當 coherence 閘**(論文側 M2+ = 真群集,非雜訊),**不是**白地/機會訊號。
- 寫結論時:幾何句只描述「研究結構」,且必附 M 等級 + n(點數);n 不足或 M0–M1 → 改說「結構不足以判定(under-powered)」,不硬講。
- 任一幾何主張逾越上述合法語域 → conclusion-evidence-supervision 判 FAIL,退回 conclusion-synthesis-strategy 重寫。

關聯:[[hmm-language]] [[manifold-grading-gate]] [[register-distortion]] [[whitespace-definition-LOCKED]] [[pc-conclusion-loop]]。
