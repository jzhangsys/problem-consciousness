---
name: conjecture-refutation-loop
description: 接地猜想引擎——補上系統缺的 Popper「猜想」半邊。當用戶要「未來方向/新解/白地/該做但沒人做/猜想/未被探索」時跑。生成=已確信先驗(28機制核+material_db+physics_kernel)的結構化重組,預測值由 physics_kernel 確定性算(非LLM斷言),過 G0–G8 證偽長廊(預設駁回)。零亂講紀律。
---

# 接地猜想引擎(Conjectures ∧ Refutations)

## 為什麼存在(系統盲點)
原系統只有「回溯/確認」邏輯(演繹塔1/歸納塔2/溯因解釋/證偽/census),**缺 Popper 的「猜想」半邊**——
只會數既有(harvest/census)、解釋既有(溯因)、反駁既有(證偽),**從不生成「文獻裡還不存在的候選新解」**。
→ 真‧白地(沒人做過、但物理允許)只能靠**猜想**找到;harvest+census 結構上只找得到「有文獻記錄的低密度區」。
本引擎補上這半邊,且把生成嚴格鎖在已確信先驗上,避免亂講。

## 零亂講的三條鐵律
1. **猜想≠自由生成**:是「已確信先驗」的結構化重組;每個成分必須在先驗基質有真實 ID(G0)。
2. **數值≠LLM斷言**:預測值由 `physics_kernel` 確定性算(領域的確定性物理函數 + 界面阻抗飽和等);LLM 只當「殺手」不當「生產者」。
3. **預設駁回**:每個猜想預設不成立,要逐閘通過才活;G7 對抗者被指示「寧殺勿放、證據不足即駁」。

## 四層先驗地板(全部既存,勿重建)
- 28 機制核 `mechanism_kernels.json`(每個錨 `mechanism_bridge.json` 的 BR: 基礎研究 top_docs/n篇)
- `material_db.py`(30 固體含關鍵物性/各向異性/成熟年/status + 11 介質 + 表面化學)
- `physics_kernel.py`(11 確定性物理函數 + 理論天花板)
- `corpus_v3_clean.json` 31k + `global_census.json`(新穎性減除)

## 三生成策略(有限、可枚舉、接地)
- **A 材料代入**:材料 enabler 節點 ← material_db 全已知材料;★方向感知物性(穿方向段用對應方向的值,殺「用錯方向的物性冒充」)+ 界面主導段用系統級飽和增益(非裸物性比)
- **B 界面配對**:界面節點 ← physics_kernel.MAT 異質對(一側器件材料),界面量由確定性函數算,須 > 理論地板且 < 基線
- **C 機制移植**:機制核 ← 跨 stage 移植到相容節點(機制與尺度相容才生);無封閉式增益 → NEEDS_EVIDENCE(不殺,交實證)

## 證偽長廊 G0–G8(`_conjecture_engine.py` + `_conjecture_adversary.py`)
G0 接地 → G1 物理硬約束(≤理論天花板)→ G2 軸界(AXIS)→ G3 機制-瓶頸相容(相態/尺度)→
G4 新穎性(節點級+stage級 corpus 命中=KNOWN 非白地)→ G5 先驗矛盾(不推退場/未成熟當已知)→
G6 增益須確定性推導且>1.05(否則 NEEDS_EVIDENCE)→ **G7 對抗三透鏡**(新穎性/物理反效應/問題意識對應,多數駁回即殺)→ **G8 雙模型共識**(llama3.1+qwen2.5 都判活)。
全過 → `CONJECTURE_WHITESPACE`(接地猜想白地候選),附 falsification 謂詞 + provenance。

## 怎麼跑
```bash
docker compose run --rm -T openclaw python3 _conjecture_substrate.py   # 自驗先驗基質
docker compose run --rm -T openclaw python3 _conjecture_engine.py      # 生成 + G0–G6 確定性長廊
docker compose run --rm -T openclaw python3 _conjecture_adversary.py   # G7 對抗 + G8 共識
```
輸出 `claim_pilot/conjecture_ledger.json`:每個猜想含 gates 全紀錄 + verdict + falsification + provenance。

## 紀律守則(每次跑必守)
- **倖存≠真理**:CONJECTURE_WHITESPACE 是「值得做實驗去證偽」的候選,非已驗證白地;每個附 falsification 謂詞。
- **接地審計**:跑後抽查 top 倖存者,確認預測值真由 physics_kernel 算、新穎性沒被薄語料漏判(看 stage_hits)。
- **物理現實**:警惕「裸物性比」「用錯方向的物性」「忽略界面阻抗」三類亂講;新策略上線前先在已知案例對帳。
- **接進主迴路**:屬 [[pc-genesis-loop]] 的「生成」上游;與 [[frontier-live-scan]](外部前沿)互補——一個對內生成、一個對外刷新。
- **延伸**:CONJECTURE_WHITESPACE + NEEDS_EVIDENCE 應回灌 harvest 種子(去抓該猜想的反證/佐證)+ 進決策層當候選。
```
