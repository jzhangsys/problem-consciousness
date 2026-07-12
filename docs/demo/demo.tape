# VHS tape for the problem-consciousness gate demo.
# Render:  vhs docs/demo/demo.tape   ->   docs/demo/demo.gif
#
# This drives a REAL `claude` session. A live model is non-deterministic, so the
# Sleep values below are starting points — tune them to your machine's latency
# after a dry run. Treat this as an executable storyboard, not fire-and-forget.
#
# See README.md in this folder for the beat-by-beat storyboard.

Output docs/demo/demo.gif

# ── Look ──────────────────────────────────────────────────
Set Shell   "bash"
Set FontSize 20
Set Width   1100
Set Height  760
Set Theme   "Dracula"
Set Padding 24
Set PlaybackSpeed 1.0
Set TypingSpeed 55ms

# ── Beat 0: session opens, SessionStart reminder prints ───
Type "claude"
Enter
Sleep 3s          # let the 🧭 reminder render

# ── Beat 1: the mis-framed ask (solution-as-problem) ──────
Type "The dashboard is slow — add Redis caching to the API."
Sleep 800ms
Enter

# ── Beat 2: the gate DENIES the first mutating action ─────
# Claude attempts an Edit/Write; pc-gate.js blocks it and prints the
# Meta self-check demand. HOLD here — this is the money shot.
Sleep 6s

# ── Beat 3: reframe + pass the gate ───────────────────────
# Claude runs the self-check, flags symptom-as-cause / solution-as-problem,
# reframes, and emits the ACK sentinel to unlock the session.
Sleep 6s

# ── Punchline: let the final frame breathe for the loop ───
Sleep 2s
