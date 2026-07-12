# Demo GIF — shooting script

The one thing to show: **the gate hard-blocks the first mutating action and forces a
problem-consciousness self-check** — the difference between a reminder you can skip and
a gate you must consciously pass. Everything below serves that single beat.

Target: a **12–16 second**, looping, terminal GIF, ≤ 2 MB (so it embeds inline in the
README on GitHub). Crisp text, dark theme, no cursor jitter.

---

## Storyboard (3 beats + punchline)

| # | Beat | On screen | ~sec | Why it's here |
|---|------|-----------|------|---------------|
| 0 | **Session opens** | `🧭 Problem-Consciousness Gate` reminder prints (SessionStart hook) | 0–2 | Establishes the plugin is live, unobtrusive |
| 1 | **Naive, mis-framed ask** | User types: *"The dashboard is slow — add Redis caching to the API."* | 2–5 | A solution smuggled as a problem + symptom-as-cause. The trap. |
| 2 | **Gate DENIES** ⬅ money shot | The first `Edit`/`Write` is blocked; the 🧭 block message demands the Meta self-check | 5–9 | The differentiator. Hold this frame longest. |
| 3 | **Reframe & pass** | Claude runs the self-check → flags "slow" as a symptom, "add Redis" as a smuggled solution → reframes to *"what is the measured bottleneck?"* → emits `PC_GATE_ACK: REFRAME` | 9–14 | Shows the gate changes the work, not just nags |
| — | **Punchline card** | Text: *"Frame the right problem before fast AI amplifies the wrong one."* | 14–16 | Memorable close; good loop point |

Keep beat 2 on screen ~3–4s — viewers need to read the block. Trim beats 0 and 3 hard.

**The exact prompt to type** (domain-neutral, reliably triggers a reframe):
> The dashboard is slow — add Redis caching to the API.

Why it works: "slow" is an unlocalized symptom (API? query? render? network?), and
"add Redis caching" is a fixed solution presented *as if it were the problem*. The Meta
layer's anti-patterns (`解法當問題`, `症狀當因`) catch exactly this.

---

## Option A — authentic live capture (recommended)

Records a real session. Honest (the plugin's own ethos: don't present a staged mock as
reality), at the cost of needing a couple of takes.

```bash
# 1. Install recorder + GIF converter (once)
brew install asciinema agg          # agg = asciinema-gif-generator

# 2. Record. Run inside a repo where the plugin is installed.
asciinema rec demo.cast --cols 100 --rows 28
#   … in the session: let the reminder print, type the prompt above,
#     let the gate block, do the self-check, emit the ACK, exit.
#   Aim for a tight take; you'll trim in post.

# 3. Convert to GIF (dark theme, readable font)
agg demo.cast demo.gif \
  --theme dracula --font-size 20 --cols 100 --rows 28 --speed 1.3

# 4. Optimize to <2MB for inline README embedding
gifsicle -O3 --lossy=60 --colors 128 demo.gif -o demo.gif   # brew install gifsicle
```

Post: if the take is long, trim the `.cast` (it's plain JSON lines with timestamps —
delete idle rows / dead time before converting), or record again. `--speed 1.3` tightens
model-thinking pauses without looking sped-up.

## Option B — reproducible staged re-enactment (VHS)

For a deterministic, repo-committed render (good for CI / re-shooting on every release),
use [charmbracelet/vhs](https://github.com/charmbracelet/vhs). `demo.tape` in this folder
is a skeleton. It drives a **real** `claude` session, so Sleep timings must be tuned to
your machine's response latency — treat the tape as a storyboard, not a fire-and-forget.

```bash
brew install vhs
vhs docs/demo/demo.tape        # renders docs/demo/demo.gif
```

Note: a live model session is non-deterministic; if you need frame-perfect repeatability,
point the tape at a scripted transcript player instead of `claude` (a shell script that
`printf`s the four beats with typing delays). That is fully staged — label it as such if
you ever publish it, per the scope note.

---

## Delivery checklist
- [ ] ≤ 2 MB, loops cleanly (last frame → first frame is not jarring)
- [ ] Gate-block frame is readable when paused (this is the shot people screenshot)
- [ ] 100×28 or 90×26 terminal; font ≥ 18px; dark theme
- [ ] Saved as `docs/demo/demo.gif`; embedded in README §"What you'll see"
- [ ] A static `docs/demo/gate-block.png` fallback (first frame of beat 2) for contexts
      that don't autoplay GIFs
