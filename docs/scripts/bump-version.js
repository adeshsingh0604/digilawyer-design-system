#!/usr/bin/env node
/**
 * bump-version.js — single command to update the version everywhere.
 *
 * tokens.css is the single source of truth. ds.js and index.html read
 * version + date from CSS tokens at runtime — no hardcoded values there.
 *
 * Usage:
 *   node docs/scripts/bump-version.js <version> <type> "<title>" ["<description>"] ["<author>"]
 *
 * Examples:
 *   node docs/scripts/bump-version.js 2.33.0 minor "Dropdown — fully documented"
 *   node docs/scripts/bump-version.js 2.32.2 patch "Fix input icon alignment" "Right icon was 24px instead of 16px on sm size" "Adesh Singh"
 *
 * Updates 4 places (display is automatic via CSS tokens):
 *   1. docs/shared/tokens.css    → --ds-version + --ds-last-updated  (drives ALL version displays)
 *   2. STATUS.md                 → Current Version + Last Updated
 *   3. CHANGELOG.md              → prepends new entry
 *   4. docs/other/changelog.html → prepends new <tr> + rotates Latest Changes cards
 */

const fs   = require('fs');
const path = require('path');

/* ── Args ── */
const [,, version, type, title, description = '', author = 'Adesh Singh'] = process.argv;

if (!version || !type || !title) {
  console.error('Usage: node bump-version.js <version> <patch|minor|major> "<title>" ["<description>"] ["<author>"]');
  process.exit(1);
}

const validTypes = ['patch', 'minor', 'major'];
if (!validTypes.includes(type.toLowerCase())) {
  console.error(`Type must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

const TYPE = type.toLowerCase();
const DATE = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const ROOT = path.resolve(__dirname, '../..');

function read(rel)        { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function write(rel, data) { fs.writeFileSync(path.join(ROOT, rel), data, 'utf8'); }

/* ── 1. tokens.css — the single source of truth for version display ── */
const tokensPath = 'docs/shared/tokens.css';
write(tokensPath, read(tokensPath)
  .replace(/--ds-version:\s*"[\d.]+"/, `--ds-version:      "${version}"`)
  .replace(/--ds-last-updated:\s*"[^"]+"/, `--ds-last-updated: "${DATE}"`)
);
console.log(`✓ tokens.css        → v${version}, ${DATE}  (header chip + overview badge auto-update from this)`);

/* ── 2. STATUS.md ── */
const statusPath = 'STATUS.md';
write(statusPath, read(statusPath)
  .replace(/^## Current Version\nv[\d.]+/m, `## Current Version\nv${version}`)
  .replace(/^## Last Updated\n.+/m,         `## Last Updated\n${DATE}`)
);
console.log(`✓ STATUS.md         → v${version}`);

/* ── 3. CHANGELOG.md ── */
const clPath = 'CHANGELOG.md';
const clEntry = `## v${version} — ${DATE}
### Type: ${TYPE.toUpperCase()}
### Updated by: ${author}
**What changed:** ${title}
**Description:** ${description || title}

`;
write(clPath, read(clPath).replace(
  /^(<!--[\s\S]*?-->)\s*/m,
  (_, comment) => comment + '\n\n' + clEntry
));
console.log(`✓ CHANGELOG.md      → v${version} entry prepended`);

/* ── 4. docs/other/changelog.html — new row + rotate Latest Changes cards ── */
const htmlClPath = 'docs/other/changelog.html';
const badgeClass = TYPE === 'major' ? 'major' : TYPE === 'minor' ? 'minor' : 'patch';
const trEntry = `      <tr data-type="${TYPE}" data-by="${author}">
        <td class="ver">v${version}</td>
        <td><span class="type-badge ${badgeClass}">${TYPE.toUpperCase()}</span></td>
        <td>${title}</td>
        <td>${description || title}</td>
        <td style="white-space:nowrap;">${DATE}</td>
        <td>${author}</td>
      </tr>`;
write(htmlClPath, read(htmlClPath).replace(
  /(<tbody[^>]*>\s*<!-- Most recent entry first -->)/,
  `$1\n${trEntry}`
));
console.log(`✓ changelog.html    → v${version} row prepended`);

/* ── Rotate Latest Changes cards in index.html ── */
const indexPath = 'docs/index.html';
let indexHtml = read(indexPath);

const newCard = `    <div class="cl-card">
      <div class="cl-version">v${version}</div>
      <span class="cl-badge ${badgeClass}">${TYPE.toUpperCase()}</span>
      <div class="cl-title">${title}</div>
      <div class="cl-date">${DATE}</div>
      <div class="cl-desc">${description || title}</div>
    </div>`;

const gridMatch = indexHtml.match(/<div class="cl-grid">([\s\S]*?)<a href="other\/changelog\.html"/);
if (gridMatch) {
  const cardRegex = /\s*<div class="cl-card">[\s\S]*?<\/div>\s*<\/div>/g;
  const existingCards = gridMatch[1].match(cardRegex) || [];
  const kept = existingCards.slice(0, 2).join('\n');
  indexHtml = indexHtml.replace(
    /(<div class="cl-grid">)([\s\S]*?)(<a href="other\/changelog\.html")/,
    `$1\n\n${newCard}\n${kept}\n\n    $3`
  );
  write(indexPath, indexHtml);
  console.log(`✓ index.html        → Latest Changes cards rotated`);
}

console.log(`\n🎉  Done. v${version} is now live in tokens.css — all pages pick it up automatically.`);
console.log(`   Next: git add -A && git commit -m "chore: bump version to v${version}"`);
