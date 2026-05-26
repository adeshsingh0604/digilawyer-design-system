#!/usr/bin/env node
/* Scaffold a new (or upgraded) component page.

   Usage: node docs/scripts/new-component.js <name>
   Example: node docs/scripts/new-component.js toggle

   What this DOES automatically (low-risk, high-leverage):
     • Creates docs/components/<name>.html from docs/starters/foundation.html
       with KEY, LABEL, INTRO and DS_PAGE filled in.
     • Overwrites the existing stub if it still has a `.coming-soon` block;
       otherwise refuses to clobber a real documented page.

   What this PRINTS for you to paste (intentionally not auto-modified —
   ds.js / tokens.css / components.css are too easy to break with regex):
     • The NAV-array tweak (flip `stub: true` → absent).
     • The SEARCH_DOCS entry to swap into ds.js.
     • A SEARCH_TOKENS block scaffold.
     • A tokens.css block (light + dark) scaffold.
     • A components.css block scaffold.
     • The version-bump / changelog steps.

   Each block is fenced with a clear "PASTE INTO …" header so you can
   copy directly into the right file.
*/
const fs = require('fs');
const path = require('path');

const DOCS       = path.join(__dirname, '..');
const STARTER    = path.join(DOCS, 'starters', 'foundation.html');
const COMPONENTS = path.join(DOCS, 'components');

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Usage: node docs/scripts/new-component.js <component-name>');
  console.error('       name must be lowercase letters / digits / dashes only');
  process.exit(1);
}

// Human-readable label. kebab-case → Title Case, with overrides for the
// known NAV labels that don't follow simple title-casing.
const LABEL_OVERRIDES = {
  'input':        'Text Input',
  'textarea':     'Text Area',
  'radio':        'Radio Button',
  'toggle':       'Toggle Switch',
  'date-picker':  'Date Picker',
  'progress-bar': 'Progress Bar',
  'list-group':   'List Group',
  'button-group': 'Button Group',
  'upload-media': 'Upload Media'
};
const titled = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
const label  = LABEL_OVERRIDES[name] || titled;

// 1. Create / overwrite the HTML page
const htmlPath = path.join(COMPONENTS, name + '.html');
if (fs.existsSync(htmlPath)) {
  const existing = fs.readFileSync(htmlPath, 'utf8');
  if (!existing.includes('coming-soon')) {
    console.error('✗ ' + name + '.html exists and looks documented (no .coming-soon block).');
    console.error('  Refusing to overwrite. Delete it manually if you really want to start over.');
    process.exit(1);
  }
  console.log('! Overwriting existing stub ' + name + '.html');
}

const starter = fs.readFileSync(STARTER, 'utf8');
const html = starter
  // Drop the top instructions comment (the multi-line <!-- STARTER… --> block)
  .replace(/^<!--[\s\S]*?-->\n?/m, '')
  .replace(/<title>LABEL/g, '<title>' + label)
  .replace(/window\.DS_PAGE = \{ key: 'KEY'/g, "window.DS_PAGE = { key: '" + name + "'")
  .replace(/<h1 class="page-title">LABEL<\/h1>/g, '<h1 class="page-title">' + label + '</h1>')
  .replace(/<p class="page-intro">INTRO<\/p>/g, '<p class="page-intro">TODO: one-sentence summary of the ' + label + ' component.</p>');

fs.writeFileSync(htmlPath, html);
console.log('✓ Created ' + path.relative(process.cwd(), htmlPath));
console.log('');

// 2. Print the paste-blocks
const today = new Date().toISOString().slice(0, 10);
const tokenStubs = ['bg', 'border', 'bg-hover', 'border-hover', 'bg-disabled', 'border-disabled']
  .map(suffix => '    --' + name + '-' + suffix + ': TODO;')
  .join('\n');
const searchSections = "[['default','Default'],['variants','Variants'],['states','States'],['full-matrix','Full matrix'],['api','API']]";

console.log('────────────────────────────────────────────────────────────────────');
console.log('PASTE INTO  docs/shared/ds.js  (NAV array)');
console.log('────────────────────────────────────────────────────────────────────');
console.log('Find the entry for ' + label + ' and remove `stub: true` if present, e.g.:');
console.log("    { label: '" + label + "', href: 'components/" + name + ".html', key: '" + name + "' }");
console.log('');

console.log('────────────────────────────────────────────────────────────────────');
console.log('PASTE INTO  docs/shared/ds.js  (SEARCH_DOCS array)');
console.log('────────────────────────────────────────────────────────────────────');
console.log("Replace the existing stub line for '" + label + "' with:");
console.log("    { label: '" + label + "', href: 'components/" + name + ".html', context: 'Component',");
console.log('      sections: ' + searchSections + ' },');
console.log('');

console.log('────────────────────────────────────────────────────────────────────');
console.log('PASTE INTO  docs/shared/ds.js  (SEARCH_TOKENS array — append in the Component-token region)');
console.log('────────────────────────────────────────────────────────────────────');
console.log('    /* ' + label + ' */');
[
  ['bg', name],
  ['border', name],
  ['bg-hover', name],
  ['border-hover', name],
  ['bg-disabled', name],
  ['border-disabled', name]
].forEach(([suffix]) => {
  const tok = '--' + name + '-' + suffix;
  const ref = "components/" + name + ".html#api";
  console.log("    ['" + tok + "', '" + ref + "', '" + label + "'],");
});
console.log('');

console.log('────────────────────────────────────────────────────────────────────');
console.log('PASTE INTO  docs/shared/tokens.css  (both :root and [data-theme="dark"] — after the last existing component block)');
console.log('────────────────────────────────────────────────────────────────────');
console.log('  /* ' + label + ' */');
console.log(tokenStubs);
console.log('');
console.log('  (in the [data-theme="dark"] block, repeat with the dark values)');
console.log('');

console.log('────────────────────────────────────────────────────────────────────');
console.log('PASTE INTO  docs/shared/components.css  (after the last component block)');
console.log('────────────────────────────────────────────────────────────────────');
console.log('/* ── ' + label.toUpperCase() + ' COMPONENT ──────────────────────────────────────────');
console.log('   Scaffolded ' + today + ' by docs/scripts/new-component.js. Replace TODOs.');
console.log('   ────────────────────────────────────────────────────────────────── */');
console.log('.' + name + ' {');
console.log('  /* TODO: container styles */');
console.log('}');
console.log('');

console.log('────────────────────────────────────────────────────────────────────');
console.log('THEN — version bump (MINOR, since a new documented component):');
console.log('────────────────────────────────────────────────────────────────────');
console.log('  1. Bump --ds-version in docs/shared/tokens.css');
console.log('  2. Bump DS_VERSION in docs/shared/ds.js');
console.log('  3. Add CHANGELOG.md entry + matching <tr> in docs/other/changelog.html');
console.log('  4. Refresh Latest Changes cards on docs/index.html');
console.log('  5. Bump STATUS.md (Current Version + Next PATCH / MINOR)');
console.log('  6. Re-run `node docs/scripts/build-tokens.js` to refresh tokens.json');
console.log('');
console.log('Done. Now open ' + path.relative(process.cwd(), htmlPath) + ' and fill in the real content.');
