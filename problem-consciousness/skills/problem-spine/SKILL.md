---
name: problem-spine
description: 問題意識脊椎架構(主框架)——整條 pipeline 環繞「問題意識」走:problem_tree 是脊椎與單一事實來源,其他層(harvest/分類/白地/物理/普查/批判/預測)全部『勾稽』到問題節點,對不上就不放行。當要設計/重構分析管線、下機會結論、或質疑某層是否離開問題意識獨走時觸發。是 problem-framing 的上層組織原則。
---
# 問題意識脊椎:一切跟問題節點勾稽

## 鐵則
**問題意識(`problem_tree.json`)= 脊椎 + 單一事實來源。任何層不能勾稽到一個『驗證過的問題節點』,就不放行為結論。** 這擋掉所有踩過的坑(語域白地、KMeans 假群、領域汙染、低槓桿陷阱)。

## 脊椎結構(`build_problem_tree.py`)
9 骨幹問題 → REAL_GAP/REAL 往下拆**子問題**(可行動白地在子問題層,非粗類)。每節點帶:指標+單位+部署值+物理地板+尺度+validation+確定性 headroom(physics_kernel 算)。LOW_LEVERAGE/QUALITATIVE/DRIVER 保留但**不放行為機會**。

## 全層勾稽(everything → node)
| 層 | 勾稽方式 |
|---|---|
| harvest | 節點當機制層種子(`problem-anchored-harvest`) |
| 分類/領域閘 | 文件→節點;對不上=0=自動濾離題(最佳領域閘) |
| 白地 | 每節點 研究/專利占比(計數,register/嵌入無關) |
| 物理 | 每節點確定性 headroom(`physics_kernel`) |
| 普查 | 每節點真實專利數(Google Patents,客觀) |
| 驗證 | `problem-validation` 三閘 → 只有真瓶頸放行 |
| 批判 | `expert-critique-router` 逐節點審 |

彙整:`problem_spine.py` 三軸(pf×physics×census)在子問題節點交叉 → 主機會圖。

## 機會裁決(子問題層,三軸交叉)
- **✅ 高槓桿白地**:物理×≥5 + 研究≥專利 + 專利未飽和。
- **🔴 紅海/硬**:物理有空間但專利已領先+飽和。
- **⚠️ 低槓桿陷阱**:研究領先但 Amdahl 次要 → 擋下(脊椎核心價值,壓平版會誤當白地)。

## 紀律
- **永遠從脊椎出發**:換領域只換 `problem_tree`;下游全部重算。
- 嵌入式結論先過 [[register-distortion]];分群只用局部社群非 KMeans。
- 子步驟交 [[problem-framing]](identification/decomposition/validation/anchored-harvest)。
- 文件:`SPINE.md`(架構);資產:`problem_tree.json` / `problem_spine.py` / `pf_*` / `physics_kernel` / `painpoint_census`。
