# problem-consciousness

A domain-general **problem-consciousness** layer for Claude Code: frame a measurable problem,
verify the real bottleneck, anchor every downstream step, and gate before propagating — so fast
AI and agents accelerate the *right* work instead of amplifying a mis-framed one.

Distributed via the `justin-plugins` marketplace.

## Install
```
/plugin marketplace add jzhangsys/problem-consciousness
/plugin install problem-consciousness@justin-plugins
```

## What's inside
**84 skills** — 81 method + 3 governance:
- `meta-problem-layer` — fix the epistemic status and clear framing anti-patterns before any method runs
- `problem-state-machine` — a P0–P10 pipeline that refuses "Done" until the problem is qualified
- `peer-cross-check` — keep multi-agent verdicts honest, with a deterministic arbiter over consensus

Method skills cover framing · problem-anchored harvest · downstream geometry/lifecycle ·
critique & verification. See `problem-consciousness/ARCHITECTURE.md` for the three-layer model
and the load-bearing gates.

## How it enforces
Two hooks, two strengths:
- **SessionStart** injects the problem-consciousness gate reminder every session (advisory).
- **PreToolUse** hard-blocks the *first* code/system-mutating action (`Write` / `Edit` /
  `MultiEdit` / `NotebookEdit` / `Bash`) of each session until an explicit Meta-layer
  self-check is acknowledged — then that session runs unimpeded. The gate is fail-open: any
  internal error allows the action, so it can never brick a working session.

This is the difference between a reminder you can silently skip and a gate you must
consciously pass once before touching anything.

## Validate
```
claude plugin validate ./problem-consciousness --strict
```

## Scope note
The plugin is intentionally **domain-neutral** — it ships with no domain-specific defaults or
examples, so the same method applies to any field.
