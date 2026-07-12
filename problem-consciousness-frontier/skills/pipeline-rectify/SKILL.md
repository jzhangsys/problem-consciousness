---
name: pipeline-rectify
description: 把文獻佐證的批判導正回 pipeline,並完整保留導正過程(before→after provenance)。當 critique-harvest 完成、需修正 output 時觸發。更新判定、記錄原值/批判/文獻/新值,入庫。呈現導正過程,不可悄悄改。
---
# 管線導正
1. 對每條被批判推翻/降級的結論,記錄 {claim, original_verdict, critique, citations, corrected_verdict, redirect}。
2. 更新 DB 判定(ws_verdict/ws_two_layer),狀態標 *_RECTIFIED,信心調整。
3. **保留過程**:原判定不刪,導正記錄入 ws_rectification;output 要顯示「原結論→批判→文獻→導正後」全鏈。
4. 給 redirect:若原方向死,指出文獻surface的真正方向。
5. 交 rectify-reverify 重驗。
