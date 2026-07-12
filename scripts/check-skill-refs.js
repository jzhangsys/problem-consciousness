#!/usr/bin/env node
/*
 * Skill cross-reference integrity check.
 *
 * Skills link to each other with [[name]] wiki-links. This fails if any such
 * link points at a skill directory that does not exist — catching a rename or
 * typo before it ships a dangling reference.
 *
 *   node scripts/check-skill-refs.js
 *
 * Additive and deterministic, like check-links.js: no plugin behavior changes.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'problem-consciousness', 'skills');

const real = new Set(
  fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name)
);

const REF_RE = /\[\[([a-z0-9-]+)\]\]/g;
let broken = 0, checked = 0;
const seenBroken = new Set();

for (const name of real) {
  const p = path.join(SKILLS_DIR, name, 'SKILL.md');
  let txt;
  try { txt = fs.readFileSync(p, 'utf8'); } catch (e) { continue; }
  let m;
  while ((m = REF_RE.exec(txt)) !== null) {
    const target = m[1];
    checked++;
    if (!real.has(target)) {
      broken++;
      const key = name + ' -> ' + target;
      if (!seenBroken.has(key)) {
        seenBroken.add(key);
        console.error('BROKEN  skills/' + name + '  ->  [[' + target + ']]');
      }
    }
  }
}

if (broken > 0) {
  console.error('\n' + broken + ' broken [[ref]](s) (' + seenBroken.size +
    ' distinct) out of ' + checked + ' checked.');
  process.exit(1);
}
console.log('All ' + checked + ' skill [[refs]] resolve to real skills.');
