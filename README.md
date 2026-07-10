# justin-plugins

A Claude Code plugin marketplace hosting **problem-consciousness** — a domain-general method +
governance layer that installs problem-consciousness into AI workflows: frame a measurable
problem, verify the real bottleneck, anchor every downstream step, gate before propagating, and
read where a field is heading from the structure of its literature and patents.

## Install
```
/plugin marketplace add jzhangsys/problem-consciousness
/plugin install problem-consciousness@justin-plugins
```

## What's inside
- **problem-consciousness/** — the domain-general plugin:
  - `skills/` — method skills (framing · harvest · downstream geometry/lifecycle · critique/verify)
    plus a governance layer (`meta-problem-layer`, `problem-state-machine`, `peer-cross-check`).
  - `ARCHITECTURE.md` — the three-layer model and the load-bearing gates.

## Validate before publishing
```
claude plugin validate ./problem-consciousness --strict
```

## Scope note
The plugin is intentionally **domain-neutral** — it ships with no domain-specific defaults or
examples, so the same method applies to any field.
