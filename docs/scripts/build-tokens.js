#!/usr/bin/env node
/* Parse docs/shared/tokens.css into docs/shared/tokens.json.

   Output shape:
     {
       "light": { "color-bg": "#FFFFFF", "color-heading": "#2D2D2D", … },
       "dark":  { "color-bg": "#1C1C1C", "color-heading": "#FFFFFF", … }
     }

   Names are CSS custom properties with the leading `--` stripped, so
   downstream consumers can look up `tokens.light['color-bg']` directly.
   `var(--other-token)` references inside values are resolved one level
   deep against the same theme (dark inherits light, then overrides).

   Idempotent. Safe to re-run after every tokens.css edit. Eventually
   wire into a pre-commit hook or `npm run tokens`.

   Usage: node docs/scripts/build-tokens.js
*/
const fs = require('fs');
const path = require('path');

const TOKENS_CSS  = path.join(__dirname, '..', 'shared', 'tokens.css');
const TOKENS_JSON = path.join(__dirname, '..', 'shared', 'tokens.json');

function extractBlock(css, selector) {
  // Match `selector { … }` allowing newlines inside the block.
  // Selector is escaped for regex (covers :root, [data-theme="dark"], etc.)
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped + '\\s*\\{([^}]*)\\}', 's');
  const m = css.match(re);
  if (!m) throw new Error('Could not find block: ' + selector);
  return m[1];
}

function parseTokens(block) {
  // Strip /* … */ comments
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, '');
  // Match `--name: value;` — value goes until the next semicolon
  const re = /--([\w-]+)\s*:\s*([^;]+?)\s*;/g;
  const out = {};
  let m;
  while ((m = re.exec(stripped)) !== null) {
    // Strip surrounding double-quotes from values that are literal CSS
    // string types (e.g. `--ds-version: "2.8.0"` → "2.8.0"). Single-quoted
    // sub-strings inside larger values — like font stacks `'Inter', system-ui`
    // — are not affected because this only strips when the ENTIRE value
    // is wrapped in matching double-quotes.
    out[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1');
  }
  return out;
}

function resolveRefs(tokens) {
  // Replace `var(--other, fallback)` with the other token's value, or
  // the fallback if not found. One-level resolution is enough for our
  // current token graph (semantic → primitive). Re-runs if needed.
  const resolved = {};
  for (const [k, raw] of Object.entries(tokens)) {
    resolved[k] = raw.replace(
      /var\(--([\w-]+)(?:\s*,\s*([^)]+))?\)/g,
      (full, ref, fallback) => {
        if (tokens[ref] !== undefined) return tokens[ref];
        if (fallback) return fallback.trim();
        return full;
      }
    );
  }
  return resolved;
}

function main() {
  const css = fs.readFileSync(TOKENS_CSS, 'utf8');
  const lightRaw = parseTokens(extractBlock(css, ':root'));
  const darkRaw  = parseTokens(extractBlock(css, '[data-theme="dark"]'));

  // Dark inherits everything from light (e.g. primitives, spacing, radii,
  // typography all live only in :root) then overrides the semantic tokens
  // it explicitly redefines.
  const darkMerged = { ...lightRaw, ...darkRaw };

  const out = {
    light: resolveRefs(lightRaw),
    dark:  resolveRefs(darkMerged)
  };

  fs.writeFileSync(TOKENS_JSON, JSON.stringify(out, null, 2) + '\n');
  const rel = path.relative(process.cwd(), TOKENS_JSON);
  console.log(
    '✓ Wrote ' + Object.keys(out.light).length + ' light + ' +
    Object.keys(out.dark).length + ' dark tokens → ' + rel
  );
}

main();
