/**
 * Fails if the docs-site chrome and the design system share a class name.
 *
 * Both stylesheets load into the same document, and the site's loads second —
 * so any shared name means the chrome silently restyles a real component, and
 * a preview stops telling the truth. That is the one thing this site must not
 * do, so it is a build-blocking error rather than a warning.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');

const classNames = (css) =>
  new Set(
    [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1])
  );

const site = classNames(read('../src/styles/site.css'));
const ds = classNames(read('../../docs/shared/components.css'));

const shared = [...site].filter((c) => ds.has(c)).sort();

if (shared.length) {
  console.error(
    `\n✖ ${shared.length} class name(s) collide with the design system:\n` +
      shared.map((c) => `    .${c}`).join('\n') +
      `\n\n  Rename the site-chrome class with a "dlui-" prefix.\n`
  );
  process.exit(1);
}

console.log(`✔ no CSS collisions (${site.size} chrome classes checked against ${ds.size} DS classes)`);
