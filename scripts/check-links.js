#!/usr/bin/env node
/*
 * Dead relative-link check for the docs surface.
 *
 * Scans README.md, CHANGELOG.md, docs/**, and problem-consciousness/ARCHITECTURE.md
 * for Markdown links/images and fails if any *relative* target does not exist on disk.
 *
 * Deliberately skips:
 *   - external links (http:, https:, mailto:)
 *   - pure in-page anchors (#section)
 *   - links inside HTML comments (<!-- ... -->), so an intentionally-commented
 *     asset like docs/demo/demo.gif (not shot yet) is not flagged
 *
 * A link's target is resolved relative to the file it appears in; any #fragment
 * is stripped before the existence check.
 *
 *   node scripts/check-links.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// Files to scan.
const files = [
  path.join(ROOT, 'README.md'),
  path.join(ROOT, 'CHANGELOG.md'),
  path.join(ROOT, 'problem-consciousness', 'ARCHITECTURE.md'),
];
const docsDir = path.join(ROOT, 'docs');
if (fs.existsSync(docsDir)) walk(docsDir, files);

const LINK_RE = /(!?)\[[^\]]*\]\(([^)]+)\)/g;
let broken = 0, checked = 0;

for (const file of files) {
  let txt;
  try { txt = fs.readFileSync(file, 'utf8'); } catch (e) { continue; }
  // Strip HTML comments so commented-out links are ignored.
  txt = txt.replace(/<!--[\s\S]*?-->/g, '');

  let m;
  while ((m = LINK_RE.exec(txt)) !== null) {
    let target = m[2].trim();
    // Drop optional title: [text](url "title")
    target = target.replace(/\s+["'].*$/, '');
    if (/^(https?:|mailto:|#)/.test(target) || target === '') continue;
    const noFrag = target.split('#')[0];
    if (noFrag === '') continue; // pure in-page anchor
    checked++;
    const resolved = path.resolve(path.dirname(file), noFrag);
    if (!fs.existsSync(resolved)) {
      broken++;
      console.error('BROKEN  ' + path.relative(ROOT, file) + '  ->  ' + target);
    }
  }
}

if (broken > 0) {
  console.error('\n' + broken + ' broken link(s) out of ' + checked + ' checked.');
  process.exit(1);
}
console.log('All ' + checked + ' relative links resolve.');
