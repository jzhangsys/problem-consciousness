#!/usr/bin/env node
/*
 * Dependency-free tests for hooks/pc-gate.js.
 *
 * The gate is a PreToolUse hook: it reads a JSON event on stdin and either
 * allows (exit 0, no deny payload) or denies (emits a permissionDecision:'deny'
 * JSON). It persists a per-session unlock flag in os.tmpdir(). These tests drive
 * the real hook as a child process with crafted stdin and assert its contract:
 *
 *   1. deny            — first mutating action, not yet acknowledged -> deny
 *   2. ack-unlock      — a Bash command carrying the sentinel -> allow + writes flag
 *   3. already-unlocked — once the flag exists, the same session is never gated
 *   4. fail-open       — malformed stdin must still allow (never brick a session)
 *
 * Run: node tests/pc-gate.test.js
 */
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const crypto = require('crypto');

const GATE = path.join(__dirname, '..', 'hooks', 'pc-gate.js');

function runGate(stdin) {
  const res = spawnSync('node', [GATE], {
    input: typeof stdin === 'string' ? stdin : JSON.stringify(stdin),
    encoding: 'utf8'
  });
  return { code: res.status, out: res.stdout || '', err: res.stderr || '' };
}

function isDeny(out) {
  try {
    const j = JSON.parse(out);
    return j.hookSpecificOutput &&
      j.hookSpecificOutput.permissionDecision === 'deny';
  } catch (e) { return false; }
}

function flagPathFor(sid) {
  const h = crypto.createHash('sha1').update(String(sid)).digest('hex').slice(0, 16);
  return path.join(os.tmpdir(), 'pc-gate-' + h);
}

let passed = 0, failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log('  ✓ ' + name); }
  else { failed++; console.log('  ✗ ' + name); }
}

// Unique, deterministic session ids per run so tests never collide with a real
// session flag or with each other. (No Math.random / Date needed.)
const RUN = crypto.randomBytes(6).toString('hex');
function sid(tag) { return 'test-' + RUN + '-' + tag; }

function cleanup(tag) {
  try { fs.unlinkSync(flagPathFor(sid(tag))); } catch (e) {}
}

// 1. deny: first mutating action, no prior ack.
(function () {
  cleanup('deny');
  const r = runGate({ session_id: sid('deny'), tool_name: 'Write', tool_input: { file_path: '/x' } });
  check('deny: first Write is blocked', r.code === 0 && isDeny(r.out));
  check('deny: no unlock flag written on a denied action', !fs.existsSync(flagPathFor(sid('deny'))));
  cleanup('deny');
})();

// 2. ack-unlock: a Bash command carrying the sentinel allows and writes the flag.
(function () {
  cleanup('ack');
  const r = runGate({ session_id: sid('ack'), tool_name: 'Bash', tool_input: { command: 'echo "PC_GATE_ACK: ROUTE"' } });
  check('ack: sentinel Bash is allowed (no deny)', r.code === 0 && !isDeny(r.out));
  check('ack: unlock flag is written', fs.existsSync(flagPathFor(sid('ack'))));
  cleanup('ack');
})();

// 3. already-unlocked: once flagged, a mutating action is allowed.
(function () {
  cleanup('unlocked');
  fs.writeFileSync(flagPathFor(sid('unlocked')), '');
  const r = runGate({ session_id: sid('unlocked'), tool_name: 'Edit', tool_input: { file_path: '/y' } });
  check('unlocked: mutating action allowed after flag exists', r.code === 0 && !isDeny(r.out));
  cleanup('unlocked');
})();

// 4. fail-open: malformed stdin must still allow.
(function () {
  const r = runGate('this is not json {{{');
  check('fail-open: malformed stdin allows', r.code === 0 && !isDeny(r.out));
})();

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
