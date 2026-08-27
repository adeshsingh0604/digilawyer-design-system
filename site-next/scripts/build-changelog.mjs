/**
 * Generates src/data/changelog.generated.json from the repo CHANGELOG.md.
 *
 * Why a build step rather than reading the file directly:
 *   - Vite's `?raw` import has no Next equivalent.
 *   - `fs.readFileSync` would work in a Server Component, but `latestVersion`
 *     is consumed by Sidebar.jsx, which is a Client Component — pulling `fs`
 *     into the client bundle is not an option.
 *   - A generated JSON is importable from both sides.
 *
 * CHANGELOG.md stays the single source of truth: this regenerates on every
 * dev/build, so bumping a version still updates the site for free. Never
 * hand-edit the generated file.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(here, '../../CHANGELOG.md');
const OUT = resolve(here, '../src/data/changelog.generated.json');

/** Identical parsing rules to the Vite site's data/changelog.js. */
function parse(md) {
  const body = md.replace(/<!--[\s\S]*?-->/g, '');
  return body
    .split(/^## /m)
    .slice(1)
    .map((chunk) => {
      const [heading, ...rest] = chunk.split('\n');
      const text = rest.join('\n');
      const [version, date] = heading.split('—').map((s) => s.trim());
      const field = (re) => (text.match(re)?.[1] ?? '').trim();
      return {
        version,
        date,
        type: field(/### Type:\s*(.+)/),
        author: field(/### Updated by:\s*(.+)/),
        title: field(/\*\*What changed:\*\*\s*(.+)/),
        description: field(/\*\*Description:\*\*\s*([\s\S]+?)(?:\n\n|$)/),
      };
    })
    .filter((e) => e.version);
}

const entries = parse(readFileSync(SOURCE, 'utf8'));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(entries, null, 2) + '\n');

const authors = [...new Set(entries.map((e) => e.author).filter(Boolean))];
console.log(
  `✓ changelog.generated.json — ${entries.length} entries, ` +
    `latest ${entries[0]?.version}, ${authors.length} contributor(s)`
);
