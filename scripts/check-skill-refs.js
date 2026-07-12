#!/usr/bin/env node
/*
 * Skill cross-reference integrity check (family-aware).
 *
 * Skills link to each other with [[name]] wiki-links, and the two plugins in
 * this repo (problem-consciousness + problem-consciousness-frontier) are a
 * family: the frontier pack depends on the core, and core skills may point into
 * the pack as "see also". A [[ref]] is therefore valid if it resolves to a real
 * skill in EITHER plugin; it fails only if the target exists in neither (a
 * rename or typo).
 *
 *   node scripts/check-skill-refs.js
 *
 * Additive and deterministic, like check-links.js: no plugin behavior changes.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PLUGINS = ['problem-consciousness', 'problem-consciousness-frontier'];

// Union of every real skill name across the family.
const real = new Set();
const skillFiles = []; // { plugin, name, file }
for (const plugin of PLUGINS) {
  const dir = path.join(ROOT, plugin, 'skills');
  let names;
  try {
    names = fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory()).map(d => d.name);
  } catch (e) { continue; }
  for (const name of names) {
    real.add(name);
    skillFiles.push({ plugin, name, file: path.join(dir, name, 'SKILL.md') });
  }
}

const REF_RE = /\[\[([a-z0-9-]+)\]\]/g;
let broken = 0, checked = 0;
const seenBroken = new Set();

for (const s of skillFiles) {
  let txt;
  try { txt = fs.readFileSync(s.file, 'utf8'); } catch (e) { continue; }
  let m;
  while ((m = REF_RE.exec(txt)) !== null) {
    const target = m[1];
    checked++;
    if (!real.has(target)) {
      broken++;
      const key = s.plugin + '/' + s.name + ' -> ' + target;
      if (!seenBroken.has(key)) {
        seenBroken.add(key);
        console.error('BROKEN  ' + s.plugin + '/skills/' + s.name + '  ->  [[' + target + ']]');
      }
    }
  }
}

if (broken > 0) {
  console.error('\n' + broken + ' broken [[ref]](s) (' + seenBroken.size +
    ' distinct) out of ' + checked + ' checked across ' + PLUGINS.length + ' plugins.');
  process.exit(1);
}
console.log('All ' + checked + ' skill [[refs]] resolve within the family (' +
  real.size + ' skills across ' + PLUGINS.length + ' plugins).');
