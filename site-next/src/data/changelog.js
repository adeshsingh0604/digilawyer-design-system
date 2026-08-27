/**
 * The repo CHANGELOG.md remains the single source of truth. It is parsed at
 * build time by scripts/build-changelog.mjs into changelog.generated.json,
 * which both Server and Client Components can import — Sidebar.jsx needs
 * `latestVersion` on the client, so reading the .md with `fs` here is not an
 * option. Bumping a version still updates this page for free.
 *
 * Do not hand-edit the generated file.
 */
import entries from './changelog.generated.json';

export const changelog = entries;

export const latestVersion = changelog[0]?.version ?? '';

/** Distinct contributors, for the changelog page's "Updated by" filter. */
export const contributors = [...new Set(changelog.map((e) => e.author).filter(Boolean))].sort();

/** Distinct release types (MAJOR / MINOR / PATCH), for the type filter. */
export const releaseTypes = [...new Set(changelog.map((e) => e.type).filter(Boolean))];
