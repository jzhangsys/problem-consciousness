# problem-consciousness

**A gate you must consciously pass once — not a reminder you can silently skip.**

A domain-general **problem-consciousness** layer for Claude Code: before fast AI or agents
touch anything, it makes them frame a *measurable* problem, verify the real bottleneck, anchor
every downstream step, and pass a gate — so they accelerate the **right** work instead of
amplifying a mis-framed one.

Distributed via the `justin-plugins` marketplace.

---

## The problem it solves

Fast AI doesn't just do work faster — it does the *wrong* work faster. A request like
*"the dashboard is slow, add Redis caching to the API"* smuggles a solution in as if it were
the problem, and treats a symptom (*slow*) as a cause. An eager agent will happily start
writing the cache. Now you've shipped effort against an unframed problem.

This plugin puts a **conscious checkpoint** between the request and the first mutating action:

| Without | With problem-consciousness |
|---|---|
| "slow" → immediately writes a Redis cache | gate blocks the first `Edit`; forces a Meta self-check |
| symptom treated as cause, solution assumed | *slow* flagged as an unlocalized symptom, *add Redis* as a smuggled solution |
| effort spent on the wrong problem, fast | reframed to **"what is the measured bottleneck?"** before any code is written |

## 60-second Quickstart

```
# 1. install
/plugin marketplace add jzhangsys/problem-consciousness
/plugin install problem-consciousness@justin-plugins

# 2. start a fresh Claude Code session — you'll see the 🧭 gate reminder

# 3. ask for something mutating, e.g. "add a cache to fix the slow endpoint"
#    → the first Edit/Write/Bash is BLOCKED with a Meta self-check demand

# 4. answer the check (epistemic status? anti-patterns? stopping rule?),
#    then unlock the session for good:
echo "PC_GATE_ACK: REFRAME — 'slow' is a symptom; locate the bottleneck first"
```

After the acknowledgment, that session runs **unimpeded** — the gate fires once, not on every action.

## What you'll see

The differentiating moment is the gate firing on the first mutating action:

<!-- Once docs/demo/demo.gif is shot, uncomment the next line (delete this comment + the arrows):
![problem-consciousness gate blocking the first mutating action](docs/demo/demo.gif)
-->

> 📽️ **Demo GIF not shot yet.** See [`docs/demo/README.md`](docs/demo/README.md) for a 12–16s
> shooting script — the gate blocking the first mutating action, in either an authentic
> asciinema capture or a reproducible VHS tape. Then uncomment the image line above.

## What's inside

**84 skills** — 81 method + 3 governance:
- `meta-problem-layer` — fix the epistemic status and clear framing anti-patterns before any method runs
- `problem-state-machine` — a P0–P10 pipeline that refuses "Done" until the problem is qualified
- `peer-cross-check` — keep multi-agent verdicts honest, with a deterministic arbiter over consensus

Method skills cover framing · problem-anchored harvest · downstream geometry/lifecycle ·
critique & verification.

- **[Browse all 84 skills →](docs/SKILLS.md)** (grouped catalog with one-line summaries)
- **[Architecture →](problem-consciousness/ARCHITECTURE.md)** (the three-layer model and load-bearing gates)

## How it enforces

Two hooks, two strengths:
- **SessionStart** injects the problem-consciousness gate reminder every session (advisory).
- **PreToolUse** hard-blocks the *first* code/system-mutating action (`Write` / `Edit` /
  `MultiEdit` / `NotebookEdit` / `Bash`) of each session until an explicit Meta-layer
  self-check is acknowledged — then that session runs unimpeded. The gate is fail-open: any
  internal error allows the action, so it can never brick a working session.

This is the difference between a reminder you can silently skip and a gate you must
consciously pass once before touching anything.

## Install

```
/plugin marketplace add jzhangsys/problem-consciousness
/plugin install problem-consciousness@justin-plugins
```

## Validate

```
claude plugin validate ./problem-consciousness --strict
```

## Scope note

The plugin is intentionally **domain-neutral** — it ships with no domain-specific defaults or
examples, so the same method applies to any field.
