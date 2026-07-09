# Plugin Submission Cheat-Sheet — problem-consciousness

Reusable reference for the Claude plugin submission form
(platform.claude.com/plugins/submit) and future re-submissions.

## Identity
| Field | Value |
|---|---|
| Source repo | https://github.com/jzhangsys/problem-consciousness |
| Plugin name | `problem-consciousness` |
| Marketplace name | `justin-plugins` |
| Display name | 問題意識邏輯 Problem-Consciousness |
| Version | `0.2.0` |
| Homepage | https://github.com/jzhangsys/problem-consciousness |

## Author / Legal
| Field | Value |
|---|---|
| Author | Justin Chang |
| Author email | justin.chang1223@gmail.com |
| License type | `MIT` |
| Privacy policy URL | https://github.com/jzhangsys/problem-consciousness/blob/main/PRIVACY.md |

## Classification
| Field | Value |
|---|---|
| Category | Productivity / Developer tools |
| Keywords / Topics | `claude-code` `claude-plugin` `problem-framing` `ai-workflow` `methodology` `verification` |

## Descriptions
**Short (one line)**
> Installs problem-consciousness into AI workflows — frame a measurable problem, verify the real bottleneck, anchor every downstream step, and gate before propagating.

**Long**
> A domain-general governance + method layer that installs problem-consciousness into AI workflows: a Meta layer fixes epistemic status and clears framing anti-patterns before any domain method runs; a P0–P10 state machine refuses "Done" until a problem model is qualified; peer cross-check + a deterministic arbiter keep multi-agent consensus from overriding computed truth; every downstream step is anchored to a framed problem and citation-gated. 84 skills (81 method + 3 governance).

## Example use cases
1. **Frame a fuzzy topic into a problem-anchored research corpus** — framed open topics (vibe-coding problems, SEO/GEO, sensory marketing) into ~10 measurable problem nodes, then harvested papers and patents by problem and organized them per node.
   - *Pain it solves:* stops keyword searches from drowning you in a red ocean while the real, on-problem work stays scattered and unfindable.
2. **Keep a multi-agent job honest with a deterministic arbiter** — five parallel agents refactored an 80-file skill set and each reported "clean"; a deterministic re-scan overrode their consensus and caught leftover references + an invalid-YAML bug they all missed.
   - *Pain it solves:* "all the agents agreed" is not truth — it prevents a plausible-but-wrong collective verdict from shipping.
3. **Verify before you spin up work** — checks existing corpora first, finds only incidental matches, and only then frames the topic as a new problem set.
   - *Pain it solves:* stops you from duplicating work or chasing a mis-framed problem, whose cost explodes once fast AI/agents start executing it.

## Install / validate (self-test)
```bash
claude plugin validate ./problem-consciousness --strict
claude plugin marketplace add jzhangsys/problem-consciousness
claude plugin install problem-consciousness@justin-plugins
claude plugin list
```

## Pre-submit checklist
- [x] Repo public
- [x] `main` pushed (latest commit)
- [x] `claude plugin validate --strict` passes
- [x] LICENSE (MIT) + PRIVACY.md present
- [x] No PDFs / secrets / bundled data
- [ ] Form fields match this sheet verbatim, then submit
