---
name: framework-layer-consistency-supervision
description: 【A章·監督】 審查問題意識框架的層級一致性、無重複重疊、量綱正確、concept↔entity 橋完整。當框架草案要放行前觸發。檢查機制/器件/可靠度不混層、同義重複、metric 量綱物理正確。
---
# [A·監督] 框架層級一致監督

## 職責
查 [[framework-completeness-strategy]] / [[framework-schema-genesis-strategy]] 產出的**結構紀律**,不查覆蓋(那是 [[framework-coverage-supervision]] 的事)。

## 稽核清單
1. **層級不混**:`kind=concept` 的應是機制/物理量;`kind=entity` 的應是器件/材料。抓出錯置(例:把可靠度指標混進「機制」應改標 `layer=reliability`)。
2. **無重複/重疊**:抓近義重複(同一結構的多個近義變體邊界要清);重疊者合併或明確區分。
3. **量綱物理正確**:每條 metric 量綱對不對(該量的單位是否為其正確量綱;無量綱量不可帶單位;不同物理量不可共用同一單位標籤)。錯量綱即 FAIL。交叉用領域物理量綱準則。
4. **concept↔entity 橋完整**:每個 concept 至少連到一個能體現它的 entity(`links` 欄非空);孤立節點列出。
5. **problem_id 穩定唯一**:無重號、無改號。

## ★對抗注意力稀釋
- 用**矩陣視角**:concept × entity 連結畫成表,空行/空列即斷橋,一眼抓出被冷落的節點(避免只盯熱門節點)。
- 逐 metric 量綱**全列出**核對,不抽樣(量綱錯會污染下游物理閘)。

## 通關條件
無層級錯置 ∧ 無未處理重複 ∧ 量綱全正確 ∧ 無孤立節點 ∧ id 唯一穩定。否則回策略。隸屬 [[pc-genesis-loop]] A 章。
