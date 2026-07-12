---
name: hmm-lifecycle
description: 技術生命週期 HMM(隱藏態=萌芽/成長/成熟/飽和;觀測=逐年[論文率,專利率])。把「時間/時序」這條軸做對的演算法,取代粗 lead-lag。當要判斷技術處於哪個生命週期階段、要為白地/機會加時間軸、或質疑「研究多是存量還是時序領先」時觸發。整合本專案 anti-predictive→救活的全部教訓。
---
# HMM 生命週期:時間軸做對的演算法

## 為什麼用 HMM(方法上最貼切)
技術 = 一條逐年序列;生命週期 = 隱藏狀態的轉移。HMM(Gaussian emission)天生適合。比「橫斷面 paper/patent 比值」強——比值混淆**存量 vs 時序**,HMM 用多年軌跡把階段判出來。

## ★救活教訓(本專案最重要的 HMM 修正)
- **舊版 anti-predictive(AUC 0.22–0.33),死因不是方法,是軌跡太少。** 用 Leiden 區域當訓練單元只有 ~26 條序列 → 訓 4 態 Gaussian-HMM 必過擬/不穩(階段一致性僅 42%、預測 AUC 0.13)。
- **解:改用「實體軌跡」當訓練單元**(數百條:每個技術實體的逐年論文/專利計數)。本專案 252 條 → **描述式階段一致性 100%、預測 AUC 0.22→0.612**。
- **鐵則:訓練序列要「夠多、夠長」**。少於 ~100 條序列別碰 4 態 HMM。

## 描述式 > 預測式(分清死因/活路)
- ❌ **當預測器**(forecast 未來專利成長):本專案 AUC 0.61,弱可用、別當強預測。
- ✅ **當描述器**(現在這技術在哪階段):穩定可信,這是它的正用法。
- **驗證要驗對的東西**:不是只驗預測 AUC,要驗**階段判定一致性**(≤Y 模型 vs 全模型 decode 同年的態是否一致;本專案 100%)。

## 怎麼做(`predict_hmm.py` / `_ws_hmm2.py`)
1. 觀測序列:每單元逐年 `[paper_rate, patent_rate]`(2yr 平滑)。單元=**實體或細社群**(別用粗區)。
2. `GaussianHMM(n_components=4, covariance_type='diag')`;K=4=萌芽/成長/成熟/飽和。
3. 命名態:用 emission 排序(`paper/(paper+patent)`=研究先行度;純論文高=萌芽白地態、專利重=成熟)。**別只用 sum 排序**(會把「純專利」誤標成長)。
4. decode 每單元/每瓶頸的當前態。
5. out-of-sample 階段一致性 + (弱)預測 AUC 雙報。

## 接白地/機會
- 白地的「時間軸」用 **HMM 描述式生命週期態取代粗 ±1yr lead-lag**:白地候選需處於**萌芽/成長前**態(研究先行、專利未起)。
- 但本專案實測:成熟領域的節點全落「成熟態」→ 無萌芽白地。這是真相,不是 bug。
- 與 [[problem-spine]](只在驗證瓶頸上談)、[[whitespace-definition]]、physics_kernel headroom 交叉。資產:`predict_hmm.py`/`predict_hmm_semantic.py`/`_ws_hmm2.py`/`ws_hmm_entity.json`。
