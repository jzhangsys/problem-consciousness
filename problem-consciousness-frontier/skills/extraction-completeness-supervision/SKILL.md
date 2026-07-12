---
name: extraction-completeness-supervision
description: 【抽取·監督】 審查 Claude-subagent 四件套抽取結果:每件錨 source_node、欄位完整、覆蓋率較上輪上升、無重複、無殘片/截斷。當抽取結果(extract_out_*.json)產出、要折入 ckpt 前觸發。對抗空殼抽取與覆蓋率假成長。
---
# [抽取·監督] 抽取完整性與覆蓋審查

## 任務
在折入 ckpt/KG 前,逐件查抽取是否真完成且錨定,覆蓋率是否真成長。

## 逐件檢查
1. **錨定**:每件有 `source_node`(∈57節點)+ 至少一個實欄(pain/solution/key_material 非空)。全空殼=退回重抽。
2. **欄位完整度**:統計各欄非空率;`solution` 或 `key_material` 兩者皆空的件數應低(<20%);全批 pain 空率過高=prompt/全文有問題,退回。
3. **無殘片**:材料/數值不得是截斷雜訊(如 "flu"、1-3 字母碎片、"etc/n/a")。折入端 `_kg_build_v3` 已加殘片過濾(英文≥4字、切 |,、;、剔 garbage set),但監督要回報殘片率。
4. **無重複**:對 ckpt pub_number 去重;同 pub_number 不得重複折入(除非 --overwrite 明確更新)。
5. **覆蓋率成長(★真成長非假象)**:折入後「該節點已抽/總專利」須較上輪**上升**;比對 `extract_manifest`(本批節點分布)確認補的是最差覆蓋節點,不是重抽已飽和節點。
6. **引擎標記**:Claude 抽的標 `_engine:claude`(供日後對 ollama 件做品質對照)。

## gate
寫 `claim_pilot/extract_gate.json`:{anchored_pct, field_complete_pct, fragment_rate, dup, coverage_before→after, pass}。anchored_pct<100 或 coverage 未升 → 不 pass、不折入。

## 對抗
- 不被「件數多」騙——空殼/重複不算數。看**實欄非空 + 覆蓋率真升**。
- 不准悄悄重抽已飽和節點來灌件數(覆蓋率假成長)。

屬 [[pc-extraction-loop]] 監督角色;批判交 [[extraction-fabrication-critique]]。
