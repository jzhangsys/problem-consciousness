# Worked Examples

Three concrete walkthroughs of problem-consciousness changing an outcome. Each shows the
naive path, where it goes wrong, which skill or gate intervenes, and the better result.
Framing is kept domain-neutral — the same method applies to any field.

See [`SKILLS.md`](SKILLS.md) for the full catalog and
[`../problem-consciousness/ARCHITECTURE.md`](../problem-consciousness/ARCHITECTURE.md)
for the three-layer model.

---

## 1. Frame a fuzzy topic into a problem-anchored corpus

**The ask.** "Research vibe-coding / SEO / sensory marketing and pull the relevant papers
and patents."

**The naive path.** Turn the topic into keywords, run searches, dump thousands of hits into
folders. The keyword net drags in a red ocean of near-matches; the actual on-problem work
stays scattered and unfindable. You feel productive; you've built a haystack.

**Where it goes wrong.** A *topic* is not a *problem*. "Improve SEO" has no measurable
bottleneck to anchor evidence to, so nothing tells you which of 4,000 hits matters.

**What intervenes.**
- `problem-framing` → `problem-decomposition` turn the fuzzy topic into ~10 **measurable
  problem nodes** (each with a bottleneck you could put a number on).
- `problem-anchored-harvest` seeds each search from a *problem node + mechanism*, not from a
  narrow application keyword — so papers and patents land **under the node they answer**.
- `citation-gate` refuses any surviving claim that isn't traceable to a source.

**Better outcome.** Instead of a searchable pile, you get a corpus **organized per problem
node** — each node holds the evidence that speaks to *its* bottleneck, and the gaps
(nodes with thin evidence) become visible, on-purpose white-space instead of noise.

---

## 2. Keep a multi-agent job honest with a deterministic arbiter

**The ask.** "Refactor this 80-file skill set — rename the scheme, fix the references."

**The naive path.** Fan out five agents in parallel; each reports **"clean, done."** Five
green checks look like consensus. Ship it.

**Where it goes wrong.** "All the agents agreed" is not truth — it's five plausible verdicts
that can share the *same* blind spot. Here they all missed leftover references to the old
scheme and an invalid-YAML frontmatter bug.

**What intervenes.**
- `peer-cross-check` makes the agents confirm each other's verdicts before any is accepted…
- …and a **deterministic arbiter** re-scans the tree by rule, not by opinion. The computed
  scan **overrides the consensus** and surfaces the leftover references + the broken YAML.

**Better outcome.** A plausible-but-wrong collective verdict is caught *before* it ships.
The rule: **consensus never overrides computed truth.**

---

## 3. Verify before you spin up work

**The ask.** "Start a new research corpus for topic X."

**The naive path.** Immediately stand up a new corpus, harvest, embed, analyze — days of
compute and effort before anyone asks whether the work was needed or framed right.

**Where it goes wrong.** Two failure modes hide here: (a) the work already exists and you're
duplicating it, or (b) the topic is mis-framed and every downstream step inherits the error —
a cost that *explodes* once fast AI/agents start executing against it.

**What intervenes.**
- The `meta-problem-layer` gate fixes the epistemic status first: is this even a new problem?
  It checks existing corpora and finds only **incidental** matches.
- Only then does `problem-framing` treat the topic as a genuinely new problem set — with a
  qualified problem model, not an assumption.

**Better outcome.** You avoid both duplicating work and chasing a mis-framed problem. The
checkpoint costs seconds; skipping it costs the whole downstream run.

---

### The thread through all three

Each example is the same move: **spend a conscious moment on the problem before fast
execution amplifies it.** Frame it measurably (1), don't let consensus stand in for computed
truth (2), and verify it's the right, non-duplicate problem before spinning up (3).
