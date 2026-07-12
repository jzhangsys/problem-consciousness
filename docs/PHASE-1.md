# Phase 1 — Docs & DX (擴大採用)

Goal: turn the repo from a **developer's notes** into a **user's on-ramp**, so a
first-time visitor understands the value in 30 seconds and reaches a working "aha"
(the gate firing on their own machine) in 60. Nothing here changes plugin behavior —
it is documentation, examples, a browsable skill catalog, and a demo asset.

Rule carried from Phase 0: every artifact that can drift is **checked in CI**.

---

## Deliverables

### 1. README rewrite — user-oriented
Current README is accurate but reads as a spec. Rewrite around the reader's journey.

Target structure:
1. **One-line value prop + the hook** — "a gate you must consciously pass once, not a
   reminder you can silently skip." This is the single differentiator; lead with it.
2. **The problem it solves** — fast AI/agents amplify a *mis-framed* problem faster.
   One concrete before/after (solution-as-problem → reframed). 3–4 sentences, no jargon.
3. **60-second Quickstart** — install → start a session → try a mutating action →
   watch the gate block → pass the Meta self-check → proceed. Copy-pasteable.
4. **What you'll see** — an annotated screenshot/GIF of the gate block (links to the
   demo GIF from `docs/demo/`).
5. **What's inside** — 84 skills (link to `docs/SKILLS.md`), 2 hooks, 3-layer model
   (link to `ARCHITECTURE.md`). Keep the current "How it enforces" block — it is strong.
6. **Install / validate / scope note** — keep, trim.

Acceptance: a reader who has never seen the plugin can (a) state what it does in one
sentence and (b) reproduce the gate firing, using only the README.

### 2. `docs/SKILLS.md` — browsable skill catalog (generated)
84 skills currently have no browsable index. Generate one grouped by category
(Governance / Framing / Harvest / Downstream method / Critique-verify), each entry =
`name` + first sentence of `description`.

- Add `scripts/gen-skill-catalog.sh` that reads every `skills/*/SKILL.md` frontmatter
  and writes `docs/SKILLS.md` deterministically (sorted, stable grouping by a small
  name→category map with an "Other" fallback).
- CI step: regenerate into a temp file and `diff` against the committed `docs/SKILLS.md`;
  fail if stale. (Same pattern as `check-version.sh` — no artifact may drift.)

Acceptance: `docs/SKILLS.md` lists all 84 with one-line descriptions; CI fails if a
skill is added/renamed without regenerating.

### 3. `docs/EXAMPLES.md` — 3 worked examples
Expand the three SUBMISSION.md use cases into concrete before/after walkthroughs:
1. Frame a fuzzy topic into a problem-anchored corpus (keyword red-ocean → problem nodes).
2. Deterministic arbiter overrides "all agents agreed" (peer-cross-check catching the
   leftover-reference + invalid-YAML bug five agents missed).
3. Verify before spinning up work (check existing corpora → only incidental matches →
   only then frame as new).

Each example: the naive path, where it goes wrong, which skill/gate intervenes, the
better outcome. Keep domain-neutral framing per the scope note.

### 4. `docs/demo/` — demo GIF asset
Reproducible terminal GIF of the gate firing. Script + tooling in `docs/demo/README.md`
and `docs/demo/demo.tape` (see that folder). README §4 embeds the rendered `demo.gif`.

### 5. CI additions
- `scripts/gen-skill-catalog.sh --check` (stale-catalog guard).
- Markdown link check across `README.md` + `docs/**` (no dead relative links).

---

## Out of scope for Phase 1 (deferred to Phase 2)
- Any change to `pc-gate.js` behavior or gate configurability.
- `[[name]]` cross-reference integrity check across skills (belongs with feature work).
- New domain method packs.

## Suggested commit sequence
1. `docs: browsable skill catalog + generator` (SKILLS.md + gen script + CI check)
2. `docs: worked examples` (EXAMPLES.md)
3. `docs: user-oriented README rewrite` (README + link to catalog/examples/demo)
4. `docs: demo GIF + shooting script` (docs/demo/, embed in README)
5. `ci: markdown link check`

Ship as small PRs so each renders and is reviewable on its own.
