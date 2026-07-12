# Problem-Consciousness Architecture

This plugin installs **problem-consciousness** into an AI workflow: a governance + method
layer that runs BEFORE any solution/execution work, so the system never becomes *correct
about the wrong question*.

## Three layers
1. **Meta-Problem Logic** — HOW the problem should be UNDERSTOOD (common sense, philosophy of
   science, dialectics, conceptual clarification, causal skepticism, epistemic-status control,
   stopping rule). Runs first, above every domain. → skill `meta-problem-layer`
2. **Domain Problem Logic** — HOW the problem should be RESEARCHED (the domain-specific method
   chains). Reached only after the Meta layer routes here.
3. **Operational Logic** — HOW the problem should be OPERATIONALIZED & EXECUTED (skills,
   workflows, evidence mapping, resolution criteria, completion audit). → skill
   `problem-state-machine`

## The upstream pipeline (never `input → task → execution → done`)
人類意圖 → 現象 → 問題候選 → 問題意識 → Problem Model → 問題資格 → 解決判準 →(才)Solution

## Load-bearing gates
- The Meta layer fixes epistemic status + clears anti-patterns before routing (`meta-problem-layer`).
- The state machine P0→P10 refuses "Done" until a Problem Model satisfies its invariants
  (`problem-state-machine`).
- Multi-agent verdicts pass peer cross-check + a deterministic arbiter, so consensus never
  overrides computed truth (`peer-cross-check`).
- Every downstream claim is anchored to a problem node and citation-gated (`citation-gate`).

## Skill map (method skills + governance)
- **Framing**: problem-framing, problem-identification, problem-decomposition, problem-validation,
  problem-spine, wellposedness-gate …
- **Harvest / anchor**: problem-anchored-harvest, literature-harvest, keyword-* …
- **Downstream method**: geometry-*, manifold-*, hmm-* (used only under their validity gates)
- **Critique / verify**: expert-critique-router, critic-* (domain-general lenses), citation-gate,
  conclusion-* …
- **Governance (this layer)**: meta-problem-layer, problem-state-machine, peer-cross-check.

The method skills are the tools; the governance layer is the constitution that keeps every tool
anchored to a well-framed problem and gated before it propagates.
