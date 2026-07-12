# Phase 2 — Feature deepening (功能深化)

Phase 0 gave the project a spine (git, tests, CI); Phase 1 gave it an on-ramp (README,
catalog, examples). Phase 2 strengthens the **method layer itself** and the guarantees
around it. Anything that touches the gate's behavior ships with tests and stays fail-open.

---

## 2A. Skill cross-reference integrity (CI guard) — low risk, do first

Skills link to each other with `[[name]]` wiki-links (74 distinct targets today, all valid).
Nothing stops a future edit from pointing `[[foo]]` at a skill that was renamed or never
existed. Add `scripts/check-skill-refs.js`: scan every `skills/*/SKILL.md` for `[[name]]`
and fail if any target is not a real skill directory. Wire into CI.

- Preventive, not corrective (the set is currently consistent).
- Same shape as `check-links.js` / catalog freshness: additive, deterministic, no behavior change.

Acceptance: CI fails if any `[[name]]` points at a non-existent skill; passes today.

## 2B. Gate: auditable acknowledgment + configurability — the real feature

Today `pc-gate.js` records the unlock as an **empty tmp flag file** keyed by session hash.
It works, but the *content* of the Meta self-check (the verdict: ROUTE / REFRAME / REJECT /
HOLD, and the reasoning) is discarded. Two enhancements:

1. **Auditable ack log.** When the ACK sentinel is echoed, capture the verdict line into an
   append-only log (e.g. `~/.problem-consciousness/ack-log.jsonl`: timestamp, session id,
   verdict, text). Turns "I passed the gate" into a reviewable trail — useful for the plugin's
   own thesis (don't just claim you framed the problem; leave evidence).
2. **Configurability.** Let a user opt into which tools the gate guards, or disable the hard
   block in favor of advisory-only, via an env var or a small config file
   (e.g. `PC_GATE_TOOLS`, `PC_GATE_MODE=block|warn|off`). Defaults unchanged.

Constraints (non-negotiable):
- **Fail-open preserved.** Any error in logging or config parsing must still `allow()`.
- **One check per session preserved** in `block` mode.
- New tests in `tests/pc-gate.test.js` for: log written on ack, log failure still allows,
  each config mode, malformed config falls back to defaults.

This changes the behavior of the differentiating feature, so it needs a design decision
(config surface + log location/format) before implementation — see the open questions below.

## 2C. New domain method pack — deferred / on-demand

The plugin is domain-neutral by design. A domain pack (e.g. a worked thermal or
legal problem-framing chain) would be a **separate, optional** add-on, not bundled into the
neutral core (per the scope note). Scope only when a concrete domain need appears.

---

## Sequence
1. **2A** — cross-reference CI guard (safe, now).
2. **2B** — gate audit log + config, after a design decision on the config surface and log
   location/format. Ship behind tests; defaults must reproduce today's behavior exactly.
3. **2C** — only when a real domain need is on the table.

## Open questions for 2B (decide before coding)
- Ack log location: `~/.problem-consciousness/ack-log.jsonl` (persistent, per-user) vs
  tmpdir (ephemeral, matches current flag). Persistent is more useful but writes to $HOME.
- Config surface: env vars only (zero files) vs a `.problem-consciousness.json` in the repo.
- Should `warn` mode (advisory, never blocks) be the headline new capability, or is `block`
  the only mode that matters and configurability is just tool-list tuning?
