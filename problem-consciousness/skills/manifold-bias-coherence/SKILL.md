---
name: manifold-bias-coherence
description: 流形診斷的偏置與語意一致(M12–M14):語意一致性 S0–S3(top terms/代表文件/CPC 富集/專家標)、模態-來源偏置(paper/patent/market 不得自動分離)、assignee/patent-family/法律模板偏置(專利制度性假結構的反證點)。當 manifold-diagnostics 觸發,或懷疑群集是資料制度性而非技術性時觸發。
---
# 偏置與語意一致(M12–M14)

## M12 語意一致性 S0–S3
top terms 技術一致;抽 10–20 代表文件人工檢查;CPC/IPC 富集合理;LLM 標需 provenance;高價值簇專家標。**分級**:S3 高度一致 / S2 大致 / S1 部分混雜 / **S0 不具技術一致性→不得作 manifold 白地結論**。本專案自動代理(主題詞集中+IPC 富集)得 S3×22/S2×4/S1×4/S0×2。

## M13 模態/來源偏置
報告 cluster source_type 分布;**paper/patent 不得因來源自動分離**(若技術詞無別卻來源分離=假群集);market 層只疊圖+勾稽,**不入二項基率**;source enrichment 過強要解釋,否則降級。

## M14 assignee/family/法律模板偏置(關鍵反證)
- patent family 主導度、單一 assignee 佔比(>50% 須標)、代理人/國別文風、claims boilerplate 近鄰、**去除 dominant assignee 後是否穩定**。
- **反證規則**:若 cluster 主要由同族/同 assignee/法律模板造成 → **不得稱技術局部流形**,只能稱「資料制度性群集」。本專案逐簇 family_dom / assignee_dom 實測 0.0–0.09(通過)。

## 通過門檻
S2 以上 + 非來源/family/assignee 主導,才可作技術性 manifold 結論。
實作:`local_manifold_diag.py`(family/assignee/來源 dominance)、`validation_p1.py`(M12 S0–S3)、`build_unified_corpus.py`(market 不入基率)。
