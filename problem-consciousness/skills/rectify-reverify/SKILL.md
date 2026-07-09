---
name: rectify-reverify
description: 對導正後的 output 做對抗式重驗,確保最終結論全數通過三專家透鏡(物理/IP/市場)。當 pipeline-rectify 完成時觸發。任一條未通過或無citation則打回再導正,直到全通過才放行。
---
# 導正後重驗(把關)
1. 對導正後每條存活結論,再過一次 critic-natural-sciences + critic-ip-landscape + critic-market-supply。
2. 通過條件:有物理量化或明確標註limitation + 有真實性等級 + 無供應/法規致命傷 + 每主張有 citation。
3. 任一不過 → 打回 pipeline-rectify 再修;循環直到全通過。
4. 輸出:final all-pass 清單 + 每條的三透鏡簽核。
