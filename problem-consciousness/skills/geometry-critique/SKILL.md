---
name: geometry-critique
description: 【下游·批判】 敵對審查幾何結論:這個「低密度=白地」是真的,還是 under-power/語域/嵌入假象?過 manifold-grading-gate + 替代法敏感度。當要用幾何下白地/孤立結論前觸發。不確定預設駁回。
---
# [下游·批判] 幾何批判

## 立場
假設幾何白地是假象。本專案實證:幾何白地在【子集/未對齊/直接跨模態 cosine】下失效(under-power/語域);只在【全量+先對齊+節點級+分模態】下有效(分模態 ρ=0.75)。見 [[geometry-whitespace]]。

## 攻擊點
1. **under-power**:n 太小→密度不穩。要求 bootstrap kNN Jaccard 穩定 / 替代 k、metric 不崩(見 [[manifold-geometry-tests]] [[manifold-grading-gate]])。
2. **語域假象**:低密度是不是因為該模態語料本來就少(取樣)而非真技術稀疏?要對接 普查對稱閘(母體對稱/同語域計數) 計數,不能只看幾何。
3. **嵌入敏感**:換 embedding(bge-m3 vs mxbai)結論是否一致?不一致=脆。
4. **白地定義**:幾何低密度 ≠ IP 白地;physics headroom ≠ IP 白地。核 [[whitespace-definition]]。

## 輸出
每條幾何白地 PASS/FAIL + 理由;FAIL 降級或要求 census/批判補強。隸屬 [[pc-downstream-loop]]。
