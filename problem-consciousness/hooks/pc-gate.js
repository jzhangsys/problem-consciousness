#!/usr/bin/env node
/*
 * Problem-Consciousness PreToolUse gate.
 *
 * Hard-blocks the FIRST code/system-mutating tool call in each session until an
 * explicit problem-consciousness self-check acknowledgment is emitted. After the
 * acknowledgment, the same session is never gated again (one check per session).
 *
 * Modes (env PC_GATE_MODE, default `block`):
 *  - block : deny the first mutating action until the ACK sentinel is echoed (default).
 *  - warn  : never deny; emit a one-time advisory to stderr, then run unimpeded.
 *  - off   : do nothing — allow everything.
 * An unrecognized value falls back to `block` (the protective default).
 *
 * Auditable ack log: when the ACK sentinel is echoed, the verdict is appended to
 * ~/.problem-consciousness/ack-log.jsonl (timestamp, session, verdict). This turns
 * "I passed the gate" into a reviewable trail. Logging is best-effort.
 *
 * Design notes:
 *  - Enforcement, not decoration: unlike a SessionStart reminder (which only
 *    injects text that can be silently ignored), block mode denies the first
 *    mutating action and returns instructions the model must act on to proceed.
 *  - Non-deadlocking: the acknowledgment path is a Bash command carrying a
 *    sentinel, which this gate special-cases and always allows.
 *  - Fail-open: ANY error (bad stdin, JSON, fs, config, logging) => allow. A
 *    distributed plugin must never brick a user's ability to work if the gate
 *    itself misbehaves.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

function allow() { process.exit(0); }
function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  }));
  process.exit(0);
}

// The sentinel the model echoes (via Bash) once it has run the self-check.
const ACK = 'PC_GATE_ACK';

// Resolve the mode; any error or unknown value => the protective default 'block'.
function gateMode() {
  try {
    const m = String(process.env.PC_GATE_MODE || 'block').trim().toLowerCase();
    return (m === 'warn' || m === 'off') ? m : 'block';
  } catch (e) { return 'block'; }
}

// Best-effort append of the ack verdict to a persistent per-user log.
function writeAckLog(sid, command) {
  const dir = path.join(os.homedir(), '.problem-consciousness');
  fs.mkdirSync(dir, { recursive: true });
  const idx = command.indexOf(ACK);
  let verdict = command.slice(idx + ACK.length).replace(/^[:\s]+/, '');
  verdict = verdict.replace(/["'`]\s*$/, '').trim(); // drop a trailing echo quote
  const rec = JSON.stringify({
    ts: new Date().toISOString(),
    session: sid,
    verdict: verdict
  }) + '\n';
  fs.appendFileSync(path.join(dir, 'ack-log.jsonl'), rec);
}

const MODE = gateMode();
if (MODE === 'off') allow();

let data;
try {
  data = JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
} catch (e) { allow(); }

const sid = String(data.session_id || 'nosession');
const tool = String(data.tool_name || '');
const ti = data.tool_input || {};

let flag;
try {
  flag = path.join(
    os.tmpdir(),
    'pc-gate-' + crypto.createHash('sha1').update(sid).digest('hex').slice(0, 16)
  );
} catch (e) { allow(); }

// Already handled this session -> never gate again.
try { if (fs.existsSync(flag)) allow(); } catch (e) { allow(); }

// The acknowledgment itself: a Bash command carrying the sentinel.
// Log the verdict (best-effort), record the unlock, and allow — in every mode.
if (tool === 'Bash' && String(ti.command || '').indexOf(ACK) !== -1) {
  try { writeAckLog(sid, String(ti.command || '')); } catch (e) {}
  try { fs.writeFileSync(flag, ''); } catch (e) {}
  allow();
}

// warn mode: first mutating action -> advisory only, never blocks. Mark the
// session so the advisory fires once, then run unimpeded.
if (MODE === 'warn') {
  try { fs.writeFileSync(flag, ''); } catch (e) {}
  try {
    process.stderr.write(
      '🧭 Problem-Consciousness (warn): first mutating action of this session. ' +
      'Consider a Meta self-check (skill: meta-problem-layer) before propagating.\n'
    );
  } catch (e) {}
  allow();
}

// block mode: first mutating action, not yet acknowledged -> block with instructions.
deny([
  '🧭 Problem-Consciousness Gate — 動手前先過問題意識(本 session 僅此一次)。',
  '',
  '這是本 session 第一個會改動程式/系統的動作,先做 Meta 層自查(skill: meta-problem-layer):',
  '• 認識論狀態:事實 / 概念 / 規範 / 因果 / 實務?',
  '• 反模式:夾帶前提 / 症狀當因 / 解法當問題 / 個案當通則 / 模型輸出當現實 / 無視常識?',
  '• 停止規則:理解到位了嗎,還是急著給答案?',
  '裁決:ROUTE(往下做)/ REFRAME(重框)/ REJECT / HOLD。',
  '',
  '完成後,執行下列指令記錄裁決並解鎖本 session(之後同 session 不再攔),再重試原動作:',
  '    echo "' + ACK + ': <你的裁決,例 ROUTE: …>"'
].join('\n'));
