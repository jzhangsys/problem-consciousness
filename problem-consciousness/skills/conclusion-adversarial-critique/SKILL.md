---
name: conclusion-adversarial-critique
description: 【結論·批判】 敵對審查通過監督的結論草稿:用物理/IP/市場專家透鏡 refute、查過度詮釋/語域扭曲/捏造/套套邏輯、citation 是否真支持該主張。當結論草稿通過監督、要折入前的最後一關觸發。是 pc-conclusion-loop 的批判角色,復用 expert-critique-chain。
---
# [結論·批判] 敵對審查結論草稿(最後一關)

## 立場:預設要駁倒它,過不了才放行
對每條結論草稿,逐項 refute(任一成立 → 退回 [[conclusion-synthesis-strategy]] 修,重跑 loop):

1. **專家透鏡 refute**:復用 [[expert-critique-router]] / [[expert-critique-chain]]——
   - ★**領域量化閘 量化物理批判(強制,不可略)**:逐個領域量化數字過多重透鏡——物理餘裕誠實檢查(headroom 折算對準正確軸)、相變/臨界現象嚴謹(某機制上限≠另一機制上限、同機制比較)、能量轉換效率嚴謹(效能指標≠正比於單一參數)、普查範疇與成熟度判定(專利數≠成熟、EXCLUDE 須物理理由)、器件辨識嚴謹(一節點一機制)(一節點一機制)。**教訓:原本只寫單一領域批判太弱,漏掉某節點的概念硬傷、某節點的指標正比錯置、headroom 過度簡化等錯,故升級為強制量化閘。**
   - [[critic-ip-landscape]]:這「機會/白地」是不是語料取樣假象?CPC 錨夠寬?
   - [[critic-market-supply]]:供應鏈/法規有沒有推翻這條?
2. **過度詮釋**:幾何句有沒有偷渡「白地/機會」?HMM 句有沒有偷渡「預測」?(對照 [[topology-language]] / [[hmm-language]])。
3. **捏造**:材料/數值是否忠於 pack 原文?citation 是否**真的支持**該主張(不是貼個 id 充數)?抽到的數值帶單位?
4. **套套邏輯**:結論是不是只是把 deterministic 判決換句話說,沒有實質說明「為什麼」?
5. **citation 把關**:過 [[citation-gate]]——每條存活主張都有可查證引用,否則標「未證實」或刪。

## 不過關的處理
- 物理/IP/市場任一 FAIL 且需文獻 → 觸發 [[critique-harvest]] 抓佐證,再 [[rectify-reverify]]。
- 標 critique_pass=False + critique_notes(哪條被駁、為何)→ 回策略角色修 → loop 再跑,直到通關。
- ★若反證強到動搖 deterministic 判決本身 → **不是改標籤**,而是回報「judgment 證據不足」,交決策層加 uncertainty_tag / 打回重算([[pc-conclusion-loop]] 處理)。

通關 → passed=True,交 `_conclusion_fold.py` 折入 09_conclusions。
