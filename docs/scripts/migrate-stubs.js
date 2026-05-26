#!/usr/bin/env node
/* Migrate the 26 un-migrated component stub pages to the v2.3.0 minimal
   pattern. Reads each stub's <p class="page-intro"> text to preserve the
   description, looks up the proper component label from the NAV map below,
   and writes a ~25-line minimal page.

   Idempotent — running twice produces the same output. Safe to re-run.

   Usage: node scripts/migrate-stubs.js
*/
const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

// Mirrors NAV in shared/ds.js — { key: label }
const LABELS = {
  'checkbox':      'Checkbox',
  'radio':         'Radio Button',
  'toggle':        'Toggle Switch',
  'dropdown':      'Dropdown',
  'input':         'Text Input',
  'textarea':      'Text Area',
  'upload-media':  'Upload Media',
  'slider':        'Slider',
  'rating':        'Rating',
  'date-picker':   'Date Picker',
  'options':       'Options',
  'avatar':        'Avatar',
  'badge':         'Badge',
  'tag':           'Tag',
  'table':         'Table',
  'accordion':     'Accordion',
  'list-group':    'List Group',
  'images':        'Images',
  'notification':  'Notification',
  'snackbar':      'Snackbar',
  'tooltip':       'Tooltip',
  'progress-bar':  'Progress Bar',
  'tabs':          'Tabs',
  'link':          'Link',
  'pagination':    'Pagination',
  'breadcrumb':    'Breadcrumb',
};

// Pages already migrated to v2.2+/v2.3 — skip these.
const SKIP = new Set(['button.html', 'button-group.html']);

function extractIntro(html) {
  const m = html.match(/<p\s+class="page-intro">([\s\S]*?)<\/p>/);
  return m ? m[1].trim() : '';
}

function alreadyMigrated(html) {
  return /window\.DS_PAGE\s*=/.test(html) && /id="sidebar-mount"/.test(html);
}

function template({ key, label, intro }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${label} — DigiLawyer DS</title>
<script>
  window.DS_PAGE = { key: '${key}', root: '../', toc: false };
</script>
<script src="../shared/ds.js"></script>
<link rel="stylesheet" href="../shared/tokens.css">
<link rel="stylesheet" href="../shared/layout.css">
<link rel="stylesheet" href="../shared/components.css">
</head>
<body>
<nav id="sidebar-mount"></nav>
<main class="main">
  <h1 class="page-title">${label}</h1>
  <p class="page-intro">${intro}</p>
  <div class="coming-soon">
    <div class="cs-icon">⚙️</div>
    <p>Full documentation coming soon.</p>
    <small>This page is a planned stub in the DigiLawyer Design System.</small>
  </div>
</main>
<aside id="toc-mount"></aside>
</body>
</html>
`;
}

const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.html'));
let migrated = 0, skipped = 0, unknown = 0;
const log = [];

for (const f of files) {
  if (SKIP.has(f)) { skipped++; log.push(`skip   ${f}  (already migrated)`); continue; }
  const key = f.replace(/\.html$/, '');
  const label = LABELS[key];
  if (!label) { unknown++; log.push(`UNKNOWN ${f}  (no NAV label — skipped)`); continue; }
  const fullPath = path.join(COMPONENTS_DIR, f);
  const src = fs.readFileSync(fullPath, 'utf8');
  if (alreadyMigrated(src)) { skipped++; log.push(`skip   ${f}  (already v2.3 shape)`); continue; }
  const intro = extractIntro(src) || `${label} component — token-driven documentation coming soon.`;
  fs.writeFileSync(fullPath, template({ key, label, intro }));
  migrated++;
  log.push(`✓ migrate ${f}  (${label})`);
}

console.log(log.join('\n'));
console.log(`\nMigrated ${migrated}, skipped ${skipped}, unknown ${unknown}.`);
