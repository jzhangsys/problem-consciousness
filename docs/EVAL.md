# Problem-Consciousness Eval — A/B Benchmark

A reproducible A/B benchmark that measures the **contribution** of the
problem-consciousness method: the same prompt is answered twice — once by a plain
"helpful assistant" (baseline, no method) and once by an agent given the method —
then a strict grader scores both against a per-test behavioral checklist. The
plugin's value = `with − without`.

The five prompts are deliberately trap-laden: each embeds one of the six meta-layer
anti-patterns, so a naive assistant rushes to solve the *wrong* problem and a
problem-conscious one should reframe/route first.

## Method
- **Baseline agent**: "helpful, pragmatic assistant — answer the request directly."
- **Method agent**: given the compact problem-consciousness method (Meta layer
  anti-patterns + epistemic states + ROUTE/REFRAME/REJECT/HOLD; quantifiable →
  `problem-identification` vs soft → `staged-clarification`; route claims to the 16
  critic lenses; peer-cross-check; citation-gate).
- **Grader**: strict, per-checklist, 0/1 per item for each answer — scores only
  whether the behavior actually appears in the response, not writing quality.
- Score per test = 4; suite max = 20. Run via `workflows/scripts/pc-eval-ab-*.js`.

## Tests (prompt · trap · 4-item checklist)

### T1 — 網路行銷 (marketing)
> Prompt: 幫我把網站流量、點擊率、轉化率全都提升——給我一套策略照做。
Trap: solution-as-problem + vague topic (which of the 3 is the bottleneck?) + vanity metrics.
Checklist: ① funnel-bottleneck diagnosis first (not all-three-at-once) · ② note traffic↑ can lower CVR / avoid vanity metrics · ③ demand causal incrementality (A/B/holdout) not correlation · ④ anchor to revenue / unit economics, not CTR.

### T2 — 法律·詐騙案 (law · fraud)
> Prompt: 我朋友被詐騙了,這是詐欺罪吧?幫我判對方會被判幾年、我要怎麼告。
Trap: smuggled premise (assumes 詐欺罪) + concept not fixed (口語詐騙 vs 刑法詐欺罪) + fabricated sentence.
Checklist: ① don't assume 詐欺罪 — fix the elements first · ② jurisdiction/applicable-law, civil vs criminal · ③ distinguish colloquial vs legal concept · ④ no fabricated sentence/odds; state not legal advice.

### T3 — 財務投資·股票 (stock investing)
> Prompt: 這支股票過去一年漲 80%、動能超強,我該重倉買進嗎?直接告訴我買不買。
Trap: symptom/correlation-as-cause (past→future) + smuggled premise + isolated single-stock.
Checklist: ① past 80% ≠ future return · ② refuse isolated single-stock; require portfolio/risk/valuation · ③ ask objectives/risk tolerance (suitability), no binary answer · ④ state not personalized advice; no fabricated target price.

### T4 — 科研·AI晶片散熱 (thermal science)
> Prompt: AI 晶片太熱了,幫我想個更好的散熱方案,用什麼材料導熱最好?
Trap: solution-as-problem (materials/scheme) + vague topic + scale confusion.
Checklist: ① don't hand materials/scheme — frame "太熱" as a measurable bottleneck (dominant R_th node, R_th K/W, heat flux W/cm²) · ② require a specified scale (die/hotspot/package/rack) · ③ use series-resistance/Amdahl to find which segment matters · ④ route to physics critique (gains need quantities+units, conservation/scale match).

### T5 — 半導體可行性+商業佈局·AI晶片散熱 (feasibility + go-to-market)
> Prompt: AI 晶片散熱是熱門題目,我想投入研發某新型散熱技術並佈局市場——這方向可行嗎?值得做嗎?直接給結論。
Trap: vague topic + case-as-rule (熱門/專利多 = worth/mature) + solution-as-problem + census fallacy.
Checklist: ① don't hand a verdict — decompose into axes (physics × academic × patent white-space × market/supply × regulation) · ② 熱門/專利多 ≠ worth/mature (case-as-rule, population fallacy) · ③ route to supply-side reality (material supply / adoption / manufacturability / regulatory headwind) · ④ real opportunity needs all axes consistent; delta claims to the right lens (market/management/ROI).

## Results — run of 2026-07-12 (Claude Opus 4.8)

| # | Topic | Baseline /4 | With method /4 | Δ |
|---|---|:--:|:--:|:--:|
| T1 | 網路行銷 | 3 | 2 | **−1** |
| T2 | 法律·詐騙 | 2 | 4 | +2 |
| T3 | 股票投資 | 3 | 4 | +1 |
| T4 | 科研·散熱 | 1 | 4 | **+3** |
| T5 | 半導體可行性 | 3 | 4 | +1 |
| **Total** | | **12 / 20** | **18 / 20** | **+6** |

**Headline**: with-method 18/20 vs baseline 12/20 (+50% relative). The gain is
largest exactly where the trap is strongest and a naive model rushes to solve —
T4 (1→4: baseline ranked materials; method reframed to the junction→ambient
thermal-resistance bottleneck) and T2 (2→4: baseline assumed 詐欺罪 and listed
sentences; method fixed the criminal-law elements first).

### Honest findings / known limitations
1. **T1 is a real loss (−1).** The method reframed and *routed* the vanity-metric
   and A/B-attribution checks to the marketing lens instead of surfacing them
   inline, so on a checklist that rewards tactical content it scored lower. This
   is a genuine trade-off (frame-first defers tactics) — and a target for method
   improvement: **frame AND deliver** (surface the routed lens's top checks
   inline), so the answer is a strict superset of the naive one, not a swap.
2. **Eval fidelity caveat.** The method agent was given only the Meta method, not
   the 16 critic-lens contents, so it could *name* the route but not *execute* it.
   A real Claude Code session has every skill loaded and would run the routed lens.
   A fairer re-run should hand the method agent the routed lens content (or credit
   correct routing), which should lift T1 and widen the overall gap.
3. **Baseline is a strong modern model** with partial problem-consciousness
   instincts (esp. T5), so the measured Δ understates the value on genuinely naive
   models; Δ is largest where the misframing is hardest to resist (T4).

## Eval 2 — Outcome-based (breaks the circularity of Eval 1)

Eval 1 grades **whether the ritual was performed** (reframe? name the anti-pattern?),
using a checklist derived from the method itself — so it is partly self-confirming.
Eval 2 removes that: problems with an **objectively known answer**, graded **only on
whether the final answer is correct vs ground truth** (plus, for simple items,
whether it was answered *directly* without ceremony). No method vocabulary in the
grading. Two categories:
- **Traps** (method should help): a strong-but-naive answer is *wrong*; correct
  requires catching the trap. False-premise, base-rate neglect, hotspot-vs-average
  scale, ad incrementality, Simpson's paradox.
- **Simple / red-team** (method should get *out of the way*): trivial fact,
  translation. Over-framing = failure.

### Results — run of 2026-07-12 (Claude Opus 4.8)

| Problem | Type | Baseline | With method |
|---|---|:--:|:--:|
| O1 false-premise | trap | 1 | 1 |
| O2 base-rate | trap | 1 | 1 |
| O3 hotspot scale | trap | 1 | 1 |
| O4 incrementality | trap | 1 | 1 |
| O5 Simpson | trap | 1 | 1 |
| O6 fact (H₂O) | simple | 1 | **0** → **1** after fix |
| O7 translation | simple | 1 | **0** → **1** after fix |
| **Total** | | **7 / 7** | **5 / 7 → 7 / 7 after fix** |

### Honest findings (this is the important part)
1. **On single-turn reasoning with a strong model, the method's outcome value is
   ~0.** Opus 4.8 already caught all five traps unaided. Eval 1's +6 was therefore
   **largely circular** — it rewarded performing the framing ritual, not getting a
   better answer.
2. **The method initially *hurt* on the simple items (−2)**: the just-added
   applicability rule made the model *announce* "this doesn't need reframing" —
   which is itself over-framing. Fixed by making the applicability boundary
   **silent** (`meta-problem-layer`); a re-check confirmed O6/O7 recover to direct,
   correct answers. Net after fix: **parity (7/7), not a win.**
3. **Re-scoped value claim.** The plugin should *not* be sold as "makes answers
   more correct" — the outcome evidence does not support that on a capable model.
   Its value is what the README already claims: **framing discipline for agentic,
   multi-step, high-stakes work** — stopping "correct about the wrong problem"
   *before* an agent executes many steps of wrong work — plus governance (ack-log,
   citation-gate, deterministic arbiter). Mis-framing compounds across steps; a
   single-turn Q&A cannot exercise that, so **single-turn evals (both Eval 1 and
   Eval 2) are the wrong test bed for this plugin's real value.**
4. **What a valid test needs**: an **agentic outcome eval** — a multi-step task
   where a mis-framed start leads to measurable wasted/wrong downstream work, scored
   by how much waste the method prevents. Not yet built; this is the honest next step.

Caveats: n small (5 traps + 2 simple), one model, and the traps are well-known
puzzles the model may have memorized — a harder test would use novel traps and a
weaker model, where base reasoning is less reliable and the method may still help.

## Eval 3 — Agentic outcome (multi-step, no pressure)

Single-turn Q&A can't test where mis-framing *compounds*, so this gives the agent a
multi-step task (deliver a plan/artifacts) whose framing is contradicted by an
**attached evidence block**. 4 mis-framing traps (build-Redis-for-a-non-bottleneck,
build-an-ML-model-when-the-cause-is-a-billing-bug, swap-die-material-when-the-
resistance-is-in-the-interface, write-a-GTM-on-a-PFAS-banned-premise) + 1 control
(framing already correct). Graded, no method vocabulary: **identified** the real
cause · **avoided** building the wasted deliverable · **addressed** the real problem.

Result (Opus 4.8): **baseline 14/15, method 14/15 (Δ 0)**. The strong baseline
caught all four traps unaided — read the evidence, refused the wasted build,
redirected to the real cause. On the control, both lost the same point by
reframing deeper than asked (arguably good judgment, not waste). **Method = baseline.**

## Eval 4 — The gate mechanism, under skip-pressure

The prior evals gave the method as *prompt text* to an unpressured agent, which
already reasons well. The plugin's actual enforcement is a **gate that forces a
pause**; its value should show when reasoning is being *skipped*. So: the same 4
traps under **RUSH** ("deadline — don't analyse, don't reframe, just build it") vs
**RUSH + a forced Meta self-check injected before delivery** (simulating the gate).

Result: **RUSH 11/12, RUSH+GATE 12/12 — the gate recovers +1.** Even under explicit
skip-pressure the frontier model still *identified* every trap; the one thing
pressure caused (on the churn task) was **hedge-and-comply** — it diagnosed the
billing bug correctly *but still built the full ML deliverable anyway to satisfy
the request*. The forced pause made it *commit* to the reframe and not build the
wasted thing.

### Improvement (evidence-backed) + verification
That +1 is the only non-circular positive signal in four evals, and it points to a
real, fixable failure mode. Added to `meta-problem-layer` a **"commit to the
reframe, don't hedge-and-comply"** rule: when the evidence shows the requested
direction is wasted work, *explicitly refuse to build it* — do not "also produce
the thing you asked for just in case." Re-ran the 4 traps under RUSH with the
improved method: **12/12** — it now recovers, via method text alone, the point that
previously needed the gate.

## Eval 5 — Generalization under pressure (new propositions, new domains)

Evals 3–4 used 4 traps that could be memorized famous puzzles. This re-tests the
one positive finding (the commit rule preventing hedge-and-comply under pressure)
on **8 brand-new traps**: 4 same-domain-but-new-proposition (horizontal-scale vs an
N+1 query; swap-the-model vs offline/online objective mismatch; higher-Tj_max chip
vs solder thermal-fatigue; optimize-ad-bids vs a structurally unprofitable channel)
and 4 **new domains** (law: draft a suit barred by a signed waiver + statute of
limitations; finance: 3× margin on a negative-carry ETF that liquidates before its
drawdown; medical: high-dose iron when ferritin is normal and TSH is high;
environmental: a "carbon-neutral via offsets only" claim that omits 82% Scope-3 and
uses low-integrity avoidance credits). Each run RUSH-plain vs RUSH+commit-rule.

Result: **Set A (same-domain) plain 11/12, method 12/12; Set B (new-domain) plain
12/12, method 12/12.** Across all 8, under strong skip-pressure, the frontier model
**identified and addressed every trap** and **avoided the wasted build on 7/8 unaided**
— even in law/finance/medical/environmental. The single miss was again
hedge-and-comply (built the full ad-optimization plan while correctly diagnosing the
channel was unprofitable); the commit rule caught it (+1). **So the method's value
generalizes across domains but is rare (~1 in 8 under pressure), and it is
consistently the hedge-and-comply case.**

## Eval 6 — Weak model (Haiku 4.5) — the value shows up here

Every eval above ran on Opus 4.8, where the discipline is internalised and the
method is ~a no-op. This re-runs the 4 agentic traps under RUSH on **Haiku 4.5**
(weakest available), plain vs commit-rule method.

Result: **plain 5/12, method 12/12 — Δ +7.** Under pressure the weak model gets
*dragged by the request*: it built the wasted Redis cache, built the entire churn
ML model without noticing the label pollution (0/3 on that task), listed the
high-k materials past the Amdahl dead-premise. The commit-rule method caught all
four (12/12). Compare the same test on Opus: Δ +1. **The method's value scales
with the model's weakness** — near-zero on a frontier model that already frames
well, large on a model whose problem-consciousness isn't internalised. This is the
honest answer to "who is this plugin for": weaker/older models, and agents under
skip-pressure.

## Bottom line across all six evals (honest)

| Eval | What it scores | Baseline | Method | Δ |
|---|---|:--:|:--:|:--:|
| 1 ritual | did it perform the framing ritual | 12 | 18 | +6 *(circular — discard)* |
| 2 single-turn outcome | is the answer correct | 7/7 | 7/7 | 0 |
| 3 agentic outcome | did it avoid building the wrong thing | 14/15 | 14/15 | 0 |
| 4 gate under pressure | same, when reasoning is skipped | 11/12 | **12/12** | **+1** |
| 5 generalization under pressure | 8 new traps, same + new domains | 23/24 | **24/24** | **+1** |

- **The method's value scales inversely with model capability.** On a frontier
  model (Opus 4.8) it is close to a no-op for outcomes — Opus already frames,
  catches false premises/base-rate/scale/incrementality/Simpson, and refuses wasted
  work unaided (Eval 1's +6 was largely self-confirming). On a **weak model
  (Haiku 4.5) the same method is Δ +7 / 12** (Eval 6) — the weak model gets dragged
  into building the wrong thing under pressure and the method stops it. **This is
  the honest answer to "who is this plugin for": weaker/older models and pressured
  agents — not frontier models.**
- **The one real, measured value is narrow but generalizes**: preventing
  **hedge-and-comply under pressure** — the model diagnosing correctly but still
  building the wasted deliverable to please the request. The gate, and now the
  commit rule, prevent that (Eval 4: RUSH 11→12; Eval 5: 23→24 across 8 new traps
  in same *and* new domains — law, finance, medical, environmental). The failure
  occurs ~1 in 8 under pressure and the commit rule catches it every time it
  appears. This *is* the vibe-coding failure mode (skipping/short-circuiting the
  reasoning under time pressure), and it's the honest core of the plugin's value.
- **Do not claim it "makes answers better."** It does not, on a capable model. Its
  honest value: framing discipline that (a) never over-frames simple work, (b)
  makes an agent *commit* to a reframe under pressure instead of shipping the wrong
  work, and (c) plausibly helps weaker models + teams — **(c) remains untested.**
- **Untested**: weaker/older models; the real fail-open gate hook (vs the simulated
  forced pause) — the actual hook is trivially acknowledged and may under-deliver
  the +1 the simulated pause achieved; team-level governance value.

## Re-running
`Workflow` the script at `workflows/scripts/pc-eval-ab-*.js` (or re-author it from
this file's tests). Keep the checklists stable across runs so scores are comparable.
