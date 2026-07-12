#!/usr/bin/env node
/*
 * Dependency-free tests for hooks/pc-gate.js.
 *
 * The gate is a PreToolUse hook: it reads a JSON event on stdin and either
 * allows (exit 0, no deny payload) or denies (emits a permissionDecision:'deny'
 * JSON). It persists a per-session unlock flag in os.tmpdir() and, on ack,
 * appends the verdict to ~/.problem-consciousness/ack-log.jsonl.
 *
 * All child runs use a throwaway HOME under tmpdir so ack-log writes never touch
 * the real home directory. Coverage:
 *
 *   block mode  — deny / ack-unlock / already-unlocked / fail-open
 *   ack log     — verdict appended on ack / logging failure still allows
 *   modes       — off allows all / warn advises-not-blocks / unknown => block
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
const RUN = crypto.randomBytes(6).toString('hex');
const TEST_HOME = path.join(os.tmpdir(), 'pc-gate-test-home-' + RUN);
const ACK_LOG = path.join(TEST_HOME, '.problem-consciousness', 'ack-log.jsonl');

function runGate(stdin, opts) {
  opts = opts || {};
  const env = Object.assign({}, process.env, { HOME: TEST_HOME, USERPROFILE: TEST_HOME });
  delete env.PC_GATE_MODE;
  Object.assign(env, opts.env || {});
  const res = spawnSync('node', [GATE], {
    input: typeof stdin === 'string' ? stdin : JSON.stringify(stdin),
    encoding: 'utf8',
    env
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

function sid(tag) { return 'test-' + RUN + '-' + tag; }
function cleanupFlag(tag) { try { fs.unlinkSync(flagPathFor(sid(tag))); } catch (e) {} }

// ── block mode: deny first mutating action ────────────────────────────────
(function () {
  cleanupFlag('deny');
  const r = runGate({ session_id: sid('deny'), tool_name: 'Write', tool_input: { file_path: '/x' } });
  check('deny: first Write is blocked', r.code === 0 && isDeny(r.out));
  check('deny: no unlock flag written on a denied action', !fs.existsSync(flagPathFor(sid('deny'))));
  cleanupFlag('deny');
})();

// ── ack-unlock + verdict logged ───────────────────────────────────────────
(function () {
  cleanupFlag('ack');
  const r = runGate({ session_id: sid('ack'), tool_name: 'Bash', tool_input: { command: 'echo "PC_GATE_ACK: ROUTE: framed it"' } });
  check('ack: sentinel Bash is allowed (no deny)', r.code === 0 && !isDeny(r.out));
  check('ack: unlock flag is written', fs.existsSync(flagPathFor(sid('ack'))));
  let logged = false, verdictOk = false;
  try {
    const lines = fs.readFileSync(ACK_LOG, 'utf8').trim().split('\n');
    const rec = JSON.parse(lines[lines.length - 1]);
    logged = rec.session === sid('ack');
    verdictOk = rec.verdict === 'ROUTE: framed it';
  } catch (e) {}
  check('ack: verdict appended to ack-log.jsonl for this session', logged);
  check('ack: logged verdict is parsed cleanly (no quotes/prefix)', verdictOk);
  cleanupFlag('ack');
})();

// ── logging failure still allows (fail-open) ──────────────────────────────
(function () {
  cleanupFlag('logfail');
  // Point HOME at a regular FILE so mkdir of the log dir throws; must still allow.
  const bogusHome = path.join(os.tmpdir(), 'pc-gate-notadir-' + RUN);
  try { fs.writeFileSync(bogusHome, 'x'); } catch (e) {}
  const r = runGate(
    { session_id: sid('logfail'), tool_name: 'Bash', tool_input: { command: 'echo "PC_GATE_ACK: HOLD"' } },
    { env: { HOME: bogusHome, USERPROFILE: bogusHome } }
  );
  check('log-failure: ack still allowed when the log cannot be written', r.code === 0 && !isDeny(r.out));
  try { fs.unlinkSync(bogusHome); } catch (e) {}
  cleanupFlag('logfail');
})();

// ── already-unlocked ──────────────────────────────────────────────────────
(function () {
  cleanupFlag('unlocked');
  fs.writeFileSync(flagPathFor(sid('unlocked')), '');
  const r = runGate({ session_id: sid('unlocked'), tool_name: 'Edit', tool_input: { file_path: '/y' } });
  check('unlocked: mutating action allowed after flag exists', r.code === 0 && !isDeny(r.out));
  cleanupFlag('unlocked');
})();

// ── fail-open: malformed stdin ────────────────────────────────────────────
(function () {
  const r = runGate('this is not json {{{');
  check('fail-open: malformed stdin allows', r.code === 0 && !isDeny(r.out));
})();

// ── off mode: allow everything ────────────────────────────────────────────
(function () {
  cleanupFlag('off');
  const r = runGate(
    { session_id: sid('off'), tool_name: 'Write', tool_input: { file_path: '/z' } },
    { env: { PC_GATE_MODE: 'off' } }
  );
  check('off: first Write allowed (never blocks)', r.code === 0 && !isDeny(r.out));
  cleanupFlag('off');
})();

// ── warn mode: advise, do not block ───────────────────────────────────────
(function () {
  cleanupFlag('warn');
  const r = runGate(
    { session_id: sid('warn'), tool_name: 'Write', tool_input: { file_path: '/w' } },
    { env: { PC_GATE_MODE: 'warn' } }
  );
  check('warn: first Write allowed (no deny)', r.code === 0 && !isDeny(r.out));
  check('warn: advisory emitted to stderr', /Problem-Consciousness \(warn\)/.test(r.err));
  cleanupFlag('warn');
})();

// ── unknown mode falls back to block ──────────────────────────────────────
(function () {
  cleanupFlag('bogus');
  const r = runGate(
    { session_id: sid('bogus'), tool_name: 'Write', tool_input: { file_path: '/b' } },
    { env: { PC_GATE_MODE: 'nonsense' } }
  );
  check('unknown mode: falls back to block (denies)', r.code === 0 && isDeny(r.out));
  cleanupFlag('bogus');
})();

// ── cleanup throwaway HOME ────────────────────────────────────────────────
try { fs.rmSync(TEST_HOME, { recursive: true, force: true }); } catch (e) {}

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
