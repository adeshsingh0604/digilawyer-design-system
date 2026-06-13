#!/usr/bin/env node
/**
 * bump-version.js — single command to update the version everywhere.
 *
 * Usage:
 *   node docs/scripts/bump-version.js <version> <type> "<title>" ["<description>"] ["<author>"]
 *
 * Examples:
 *   node docs/scripts/bump-version.js 2.33.0 minor "Dropdown — fully documented"
 *   node docs/scripts/bump-version.js 2.32.2 patch "Fix input icon alignment" "Right icon was 24px instead of 16px on sm size" "Adesh Singh"
 *
 * Updates (all 6 places in one go):
 *   1. docs/shared/tokens.css     → --ds-version
 *   2. docs/shared/ds.js          → DS_VERSION constant
 *   3. STATUS.md                  → Current Version + Last Updated
 *   4. CHANGELOG.md               → prepends new entry
 *   5. docs/other/changelog.html  → prepends new <tr>
 *   6. docs/index.html            → rotates Latest Changes cards (keep 3)
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

const TYPE   = type.toLowerCase();
const DATE   = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const ROOT   = path.resolve(__dirname, '../..');

function read(rel)        { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function write(rel, data) { fs.writeFileSync(path.join(ROOT, rel), data, 'utf8'); }

/* ── 1. tokens.css ── */
const tokensPath = 'docs/shared/tokens.css';
write(tokensPath, read(tokensPath).replace(
  /--ds-version:\s*"[\d.]+"/,
  `--ds-version: "${version}"`
));
console.log(`✓ tokens.css        → v${version}`);

/* ── 2. ds.js ── */
const dsPath = 'docs/shared/ds.js';
write(dsPath, read(dsPath).replace(
  /var DS_VERSION\s*=\s*'[\d.]+'/,
  `var DS_VERSION = '${version}'`
));
console.log(`✓ ds.js             → v${version}`);

/* ── 3. STATUS.md ── */
const statusPath = 'STATUS.md';
write(statusPath, read(statusPath)
  .replace(/^## Current Version\nv[\d.]+/m, `## Current Version\nv${version}`)
  .replace(/^## Last Updated\n.+/m,         `## Last Updated\n${DATE}`)
);
console.log(`✓ STATUS.md         → v${version}, ${DATE}`);

/* ── 4. CHANGELOG.md ── */
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

/* ── 5. docs/other/changelog.html ── */
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

/* ── 6. docs/index.html — rotate Latest Changes cards ── */
const indexPath = 'docs/index.html';
let indexHtml = read(indexPath);

/* Update version badge + date in the page header */
indexHtml = indexHtml
  .replace(/<span class="version-badge">v[\d.]+<\/span>/, `<span class="version-badge">v${version}</span>`)
  .replace(/<span class="version-date">Last updated: [^<]+<\/span>/, `<span class="version-date">Last updated: ${DATE}</span>`);

/* Build the new card */
const badgeCls = TYPE === 'major' ? 'major' : TYPE === 'minor' ? 'minor' : 'patch';
const newCard = `    <div class="cl-card">
      <div class="cl-version">v${version}</div>
      <span class="cl-badge ${badgeCls}">${TYPE.toUpperCase()}</span>
      <div class="cl-title">${title}</div>
      <div class="cl-date">${DATE}</div>
      <div class="cl-desc">${description || title}</div>
    </div>`;

/* Extract the current 3 cards from the cl-grid */
const gridMatch = indexHtml.match(/<div class="cl-grid">([\s\S]*?)<a href="other\/changelog\.html"/);
if (gridMatch) {
  const gridInner = gridMatch[1];
  /* Match individual cl-card divs (non-greedy) */
  const cardRegex = /\s*<div class="cl-card">[\s\S]*?<\/div>\s*<\/div>/g;
  const existingCards = gridInner.match(cardRegex) || [];
  /* Keep only first 2 existing cards (they become cards 2 and 3) */
  const kept = existingCards.slice(0, 2).join('\n');
  const newGrid = `\n\n${newCard}\n${kept}\n\n    `;
  indexHtml = indexHtml.replace(
    /(<div class="cl-grid">)([\s\S]*?)(<a href="other\/changelog\.html")/,
    `$1${newGrid}$3`
  );
}

write(indexPath, indexHtml);
console.log(`✓ index.html        → v${version} card added, Latest Changes rotated`);

console.log(`\n🎉  Version bumped to v${version} in all 6 places.`);
console.log(`   Next: git add -A && git commit -m "chore: bump version to v${version}"`);
