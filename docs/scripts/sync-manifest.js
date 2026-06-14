#!/usr/bin/env node
/**
 * sync-manifest.js — reads react/components-manifest.json and updates ds.js.
 *
 * When you finish a React component:
 *   1. Open react/components-manifest.json
 *   2. Set "react_status": "done" and add "storybook_path": "?path=/docs/components-NAME--docs"
 *   3. Run: node docs/scripts/sync-manifest.js
 *   4. Commit — the "For React" banner on the HTML page will now show a live link
 *
 * What it updates in ds.js:
 *   - SB_BASE          → storybook_base from manifest
 *   - SB_STORIES       → all components with react_status "done"
 *   - COMPONENT_KEYS   → all components regardless of status
 */

const fs   = require('fs');
const path = require('path');

const ROOT         = path.resolve(__dirname, '../..');
const MANIFEST     = path.join(ROOT, 'react/components-manifest.json');
const DS_JS        = path.join(ROOT, 'docs/shared/ds.js');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

/* Deduplicate by key (manifest may have duplicates from initial draft) */
const seen = new Set();
const components = manifest.components.filter(c => {
  if (seen.has(c.key)) return false;
  seen.add(c.key);
  return true;
});

const base = manifest.storybook_base;

/* Build SB_STORIES — only done components with a storybook_path */
const storiesEntries = components
  .filter(c => c.react_status === 'done' && c.storybook_path)
  .map(c => `    '${c.key}': SB_BASE + '${c.storybook_path.replace(/'/g, "\\'")}',`)
  .join('\n');

const sbStoriesBlock =
  `  var SB_BASE = '${base}';\n` +
  `  var SB_STORIES = {\n${storiesEntries}\n  };`;

/* Build COMPONENT_KEYS — all components */
const keysArray = components.map(c => `'${c.key}'`).join(',');
const componentKeysBlock = `  var COMPONENT_KEYS = [${keysArray}];`;

/* Replace blocks in ds.js */
let ds = fs.readFileSync(DS_JS, 'utf8');

ds = ds.replace(
  /\/\* ── 9\. React[\s\S]*?var SB_BASE[\s\S]*?var SB_STORIES\s*=\s*\{[\s\S]*?\};/,
  `/* ── 9. React / Storybook banner — generated from react/components-manifest.json\n     Run: node docs/scripts/sync-manifest.js after updating the manifest.        */\n${sbStoriesBlock}`
);

ds = ds.replace(
  /var COMPONENT_KEYS\s*=\s*\[[\s\S]*?\];/,
  componentKeysBlock
);

fs.writeFileSync(DS_JS, ds, 'utf8');

const doneCount    = components.filter(c => c.react_status === 'done').length;
const pendingCount = components.filter(c => c.react_status === 'pending').length;

console.log(`✓ ds.js updated`);
console.log(`  SB_STORIES  → ${doneCount} live components`);
console.log(`  COMPONENT_KEYS → ${components.length} total (${pendingCount} pending)`);
console.log(`\nDone. Commit ds.js to deploy the updated React banners.`);
