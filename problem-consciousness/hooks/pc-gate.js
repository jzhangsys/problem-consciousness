#!/usr/bin/env node
/*
 * Problem-Consciousness PreToolUse gate.
 *
 * Hard-blocks the FIRST code/system-mutating tool call in each session until an
 * explicit problem-consciousness self-check acknowledgment is emitted. After the
 * acknowledgment, the same session is never gated again (one check per session).
 *
 * Design notes:
 *  - Enforcement, not decoration: unlike a SessionStart reminder (which only
 *    injects text that can be silently ignored), this denies the first mutating
 *    action and returns instructions the model must act on before it can proceed.
 *  - Non-deadlocking: the acknowledgment path is a Bash command carrying a
 *    sentinel, which this gate special-cases and always allows.
 *  - Fail-open: ANY error (bad stdin, JSON, fs) => allow. A distributed plugin
 *    must never brick a user's ability to work if the gate itself misbehaves.
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

// Already acknowledged this session -> never gate again.
try { if (fs.existsSync(flag)) allow(); } catch (e) { allow(); }

// The acknowledgment itself: a Bash command carrying the sentinel.
if (tool === 'Bash' && String(ti.command || '').indexOf(ACK) !== -1) {
  try { fs.writeFileSync(flag, ''); } catch (e) {}
  allow();
}

// First mutating action, not yet acknowledged -> block with instructions.
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
