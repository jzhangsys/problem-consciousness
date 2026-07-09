# justin-plugins

A Claude Code plugin marketplace hosting **problem-consciousness** — a domain-general method +
governance layer that installs problem-consciousness into AI workflows: frame a measurable
problem, verify the real bottleneck, anchor every downstream step, gate before propagating, and
read where a field is heading from the structure of its literature and patents.

## Install
```
/plugin marketplace add <this-repo-or-path>
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
The core is intentionally **domain-neutral**. A thermal / semiconductor-cooling domain pack is
kept as a separate concern and is **not** bundled here, so the general method stays clean.
