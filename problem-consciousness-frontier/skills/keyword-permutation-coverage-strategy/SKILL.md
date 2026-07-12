---
name: keyword-permutation-coverage-strategy
description: 【B章·策略】 關鍵字排列組合要全配(不截斷)、脈絡錨用具體詞而非泛詞、每條可追溯瓶頸。當要枚舉 mechanism×entity×context 組合時觸發。對抗「只配前 N 個 entity」的截斷偏與泛脈絡詞造成的命中爆炸。
---
# [B·策略] 排列組合覆蓋策略

## 兩個實證缺陷(必修)
1. **截斷偏**:舊版 concept×entity 只配 `entity[:12]`,導致清單後段的**最高價值實體(具體器件/材料/結構)從未被交叉**。
2. **泛脈絡爆炸**:脈絡錨用過廣的領域泛詞 → 某機制詞×泛領域詞命中 26 萬件、179 條組合 >10 萬件,精準度崩。

## 規則
1. **全配,不截斷**:concept×entity 全矩陣或用語意相關性配對(機制與器件物理相關才配),**禁止用清單順序砍**。被排除者必須寫明理由(對齊 [[pc-genesis-loop]] 反截斷鐵律)。
2. **具體脈絡錨**:用具體的產品/場景/器件詞(而非整個領域名);**砍掉**過廣的領域泛詞(領域整體層級的字)。
3. **每條帶 provenance**:`{anchor_problem_id, axis, target_source, register}`,可追溯到瓶頸。
4. **組合型別**:機制單獨 / 器件單獨 / 機制×具體脈絡 / 器件×具體脈絡 / 機制×器件。每型都要,並標型別。

## ★對抗注意力稀釋
- 矩陣全配後做**計數斷言**:應有組合數 = Σ各型,逐型核對;被排除者列表+理由。
- 不可因為「前面幾個 entity 配完了」就對後段草率(反序抽查)。

## 交棒
交 [[keyword-breadth-balance-supervision]] 查命中分布與配對均衡,交 [[keyword-context-inflation-critique]] 攻泛脈絡詞。隸屬 [[pc-genesis-loop]] B 章。
