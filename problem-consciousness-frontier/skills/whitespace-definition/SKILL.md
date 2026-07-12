---
name: whitespace-definition
description: 技術白地(white-space)的唯一正確定義 + 永久禁用的錯誤定義清單。本專案白地定義漂移過無數次,此為鎖定版。任何要找/定義/排序「白地、機會、值得研發方向」時必先觸發,核對定義對不對,擋掉復活的錯誤手法。
---
# 白地定義(鎖定版):驗證瓶頸 × 現實份額 × 時間領先 × 物理 headroom

> 本專案白地定義漂移過無數次(幾何→funding→實體器件層→entity→…),每次都被推翻。此檔=單一正確定義 + 禁用清單。**定義對不上,不准跑。**

## ✅ 唯一正確定義(四條缺一不可)
1. **單位 = 驗證過的「真瓶頸子問題」**(`problem_tree` 的子節點,帶 metric/deployed/floor/headroom)。**不是 entity、不是關鍵詞、不是群集。** 先過 Amdahl/[[problem-validation]] 閘(REAL_GAP/REAL 且有 headroom);LOW_LEVERAGE/QUALITATIVE/DRIVER 排除。
2. **度量 = 「研究真實份額 vs 專利真實普查份額」**,兩邊都用**現實數字**(OpenAlex/Crossref 研究量 + Google Patents census)。**禁用池內計數**(池漏採 2–4 數量級)。份額,不是原始數量。
3. **時間 lead-lag / 生命週期態為主篩**([[hmm-lifecycle]] 描述式階段優於粗 ±1yr)。研究須**時序領先**專利(專利已領先=已轉化/成熟,非白地)。
4. **physics headroom 為骨幹**(corpus-independent,最不受取樣影響)。
- 性質 = **solution-discovery 落差(非法律 FTO)**。

## 🚫 永久禁用(出現任一=又漂移了,立即停)
- ❌ **橫斷面 paper/patent 比值/數量**(混淆存量vs時序;已被時間軸推翻)
- ❌ **「entity/關鍵詞專利數稀少」判白地**(=近FTO;且 entity 是錯單位)
- ❌ **用池內計數**(「池內稀少≠現實稀少」;census 實證 27/30 假白地)
- ❌ **嵌入幾何體積/密度白地**(within-modality ρ≈0;見 [[geometry-whitespace]])
- ❌ **直接跨模態 cosine**(違反 EMBEDDING_STANDARD;須先監督式 ridge 對齊)
- ❌ 在未驗證節點上談機會(某低槓桿主題 43篇但低槓桿=陷阱)

## ★承重白地法:問題層計數(register-robust by design)
本專案唯一站得住的白地路徑:**`pf_lib.extract` 模態感知(論文機制語/專利法律語各自)→ 都歸到同一組正規問題節點 → 在「問題層」計數勾稽**。**繞過嵌入/語域病**(因為比的是「問題節點的論文數 vs 專利數」,不碰跨模態 cosine)。再交叉 physics headroom × census × 生命週期 × 批判。資產:`pf_extract`/`pf_reconcile`/`pf_problem_integrate`/`build_problem_tree`。

## 殘酷但誠實的實證
嚴格定義下白地**近乎空**——這不是失敗,是定義正確(擋掉所有取樣/時序/語域假象)。在成熟密集領域,HMM 全成熟態、Mapper 無 flare、測地線無鑑別 → 結構性無穩健白地。**「physics headroom 高 ≠ IP 白地」**(某界面材料填料 headroom ×78 但 18962 專利=紅海)。耐久訊號是 physics headroom(研發方向)+ 引用橋(轉化證據),非「白地清單」。串 [[problem-spine]]/[[five-axis-consistency]]/[[expert-critique-chain]]。
