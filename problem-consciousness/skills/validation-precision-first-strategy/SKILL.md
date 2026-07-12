---
name: validation-precision-first-strategy
description: 【C章·策略】 關鍵字驗證要精準度優先,不是 total>0 就放行——命中數鐘形偏好(過泛扣分)、抓 abstract 非只 title、num≥20、檢查量化數值+機制+解決方案。當要驗證探針結果是否真打到問題意識瓶頸時觸發。
---
# [C·策略] 精準度優先驗證策略

## 推翻舊版的核心錯誤
舊版判準 `on>=2 and off==0 and total>0`,結果 425/517「有效」中位命中 56k、179 條 >10 萬件——**把雜訊桶當有效**。命中數本身不是品質。要改成精準度優先。

## 規則
1. **命中數鐘形偏好**:`total` 太大(>幾萬,依分布定閾)=過泛扣分;極小(<3)=過窄/語域待查;中段精準命中加分。**不是 `total>0` 放行**。
2. **抓 abstract,不只 title**:探針要取 abstract(走 openclaw 真瀏覽器 `extract_patent_abstracts_batch` 或論文 OA),title 太少訊號。
3. **num≥20**:每條至少看 20 筆,提高檢定力(舊版只看 5 筆)。
4. **問題意識深度閘(★這才是真 PC 閘)**:對抓回的 abstract 檢查三要素——
   - **量化數值**:有沒有出現該瓶頸的量綱數字(領域原生的度量+單位)?沒數字=領域過濾非問題意識(接 critic-natural-sciences)。
   - **機制詞**:是否真討論該瓶頸機制,而非只是同領域。
   - **解決方案**:是否提出 device/material/method 解法(問題意識四件套:痛點+解法+材料量化+新穎性)。
5. **分源判準**:paper 源查機制+量化;patent 源查結構+解法。依 combo 的 `target_source` 分流(見 [[keyword-register-split-strategy]])。

## 為什麼移到這裡
深度問題意識閘**過去只在出題時用一次**,harvest/驗證輸入端沒閘 → 牙科專利混入。現在閘移到驗證輸入端,符合 problem-consciousness-every-semantic-step 與 [[pc-control-loop]]。

## 交棒
交 [[validation-power-supervision]] 查檢定力、交 [[validation-tautology-critique]] 攻套套邏輯。隸屬 [[pc-genesis-loop]] C 章。
