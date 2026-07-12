---
name: hmm-strategy
description: 【下游·策略】 跑時間軸/生命週期時,如何 problem_id 錨定:每節點年序(逐年[論文,專利])判生命週期(萌芽/成長/成熟)+ paper↔patent lead-lag。當要為節點加時間軸/生命週期/領先指標時觸發。
---
# [下游·策略] HMM/時間策略

## 規則
1. **逐 problem_id 年序**:每節點取其 corpus 文件的 year,組逐年 [論文數, 專利數];方法本體 [[hmm-lifecycle]](隱藏態=生命週期,觀測=逐年率)。
2. **生命週期分級**:萌芽/成長(近5年占比高且續升)、成熟活躍(穩定)、成熟衰退(近年降)、sparse(n<5 不判)。
3. **lead-lag**:paper 中位年 vs patent 中位年 → 研究領先 IP 幾年(>0=論文領先)。
4. **problem_id 錨**:每個生命週期/lead 值掛 problem_id。
5. **存量 vs 流量**:留意「研究多是存量還是時序領先」(見 [[hmm-critique]])。

## 交棒
交 [[hmm-supervision]] 查年覆蓋/sparse/可重現,交 [[hmm-critique]] 攻取樣假象。隸屬 [[pc-downstream-loop]]。
