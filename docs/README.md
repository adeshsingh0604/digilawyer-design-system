# DigiLawyer Design System — Documentation Site

Static HTML/CSS/JS docs. No build step. Every page reads tokens from `shared/tokens.css` and behaviour from `shared/ds.js`.

This is the **canonical source of truth** for the design system. The React library and Storybook in the sibling folders consume what's defined here.

## Running locally

```bash
# from the repo root
open docs/index.html
# or
npx serve docs
```

## File structure

```
docs/
├── index.html              Overview / home
├── shared/
│   ├── tokens.css          Source of truth — every token (light + dark)
│   ├── layout.css          Page shell: header, sidebar, main, TOC
│   ├── components.css      Shared component styles (.btn, .checkbox, etc.)
│   └── ds.js               Shared JS: header + search + sidebar + TOC + theme + copy
├── foundation/
│   └── colors.html, typography.html, spacing.html, radius.html, shadows.html, grid.html
├── components/
│   └── 28 .html files, one per component (button.html, checkbox.html, …)
├── other/
│   └── changelog.html      Filterable version history
├── starters/
│   ├── component.html      ~25-line stub template
│   └── foundation.html     Documented-page template (with Full matrix scaffold)
└── scripts/
    └── migrate-stubs.js    Idempotent stub migration helper
```

## How a page is structured

Every page declares one `window.DS_PAGE` config block in `<head>`, then loads `ds.js` before the stylesheets. The header, sidebar, TOC, and search are auto-injected — no per-page mount points except `<nav id="sidebar-mount">` and `<aside id="toc-mount">`.

See the top of [`shared/ds.js`](shared/ds.js) for the full usage spec, and [`../CLAUDE.md`](../CLAUDE.md) for the canonical workflow.

## How to update a token

Edit `shared/tokens.css`. Tokens are in `:root` (light) and `[data-theme="dark"]` (dark overrides). Every page picks up the change automatically — no other files need touching.

**Rules:**
- Never reference a colour primitive directly in component CSS. Use semantic tokens (`--color-heading`, `--btn-primary-bg`).
- When adding a new component token group, add both the `:root` and `[data-theme="dark"]` blocks together.

## How to add a new component page

1. Copy `starters/component.html` (stub) or `starters/foundation.html` (fully-documented).
2. Replace the `KEY`, `LABEL`, `INTRO` placeholders.
3. In `shared/ds.js`: flip the `NAV` entry from `stub: true` to a regular link. For documented components, also add a `SEARCH_DOCS` entry with section anchors and append the new `--token-*` names to `SEARCH_TOKENS` so the new content is searchable.
4. Add component tokens to `shared/tokens.css` (both light and dark).
5. Bump version per the rules in [`../CLAUDE.md`](../CLAUDE.md).

## How to bump version

See "Versioning" section of [`../CLAUDE.md`](../CLAUDE.md). In short: bump `--ds-version` in `tokens.css`, `DS_VERSION` in `ds.js`, add a CHANGELOG entry, mirror it as a `<tr>` in `other/changelog.html`, and bump `../STATUS.md`. For MINOR/MAJOR, also refresh the Latest Changes cards on `index.html`.

After any tokens.css change, regenerate `shared/tokens.json` so downstream consumers (React, AI tools) see the new values:

```bash
node docs/scripts/build-tokens.js
```

## Scripts

### `scripts/build-tokens.js`

Parses `shared/tokens.css` and writes `shared/tokens.json` — a flat `{ light: {...}, dark: {...} }` lookup with `var(--…)` references resolved one level deep. Dark inherits everything from light (primitives, spacing, radii, typography) and then overrides the semantic tokens it explicitly redefines. Run after every tokens.css edit:

```bash
node docs/scripts/build-tokens.js
# ✓ Wrote 323 light + 323 dark tokens → docs/shared/tokens.json
```

Downstream consumers can `import tokens from './shared/tokens.json'` and look up values like `tokens.light['color-heading']` or `tokens.dark['btn-primary-bg']`.

### `scripts/new-component.js <name>`

Scaffolds a new (or upgrades an existing stub) component page. What it does automatically:
- Creates `components/<name>.html` from the foundation starter with `KEY`, `LABEL`, `INTRO` and `DS_PAGE` filled in.
- Refuses to clobber a page that's already documented (no `.coming-soon` block).

What it prints for you to paste manually (intentionally — regex on ds.js / tokens.css / components.css is too easy to break):
- NAV array tweak (flip `stub: true` → absent)
- `SEARCH_DOCS` documented entry with 5 sections
- `SEARCH_TOKENS` paste-block for the new component
- `tokens.css` block scaffold (light + dark)
- `components.css` block scaffold
- The version-bump checklist

```bash
node docs/scripts/new-component.js toggle
# ✓ Created docs/components/toggle.html
# ──────────────────────────────────────────
# PASTE INTO  docs/shared/ds.js  (NAV array)
# …etc
```

### `scripts/migrate-stubs.js`

Idempotent migration helper from the original v2.3 stub sweep. Safe to re-run; skips anything already on the v2.3 shape. You probably won't need this again.

## Hosting on GitHub Pages

The docs site is self-contained. To host:

1. Push the whole repo to GitHub.
2. **Settings → Pages** → source = `main` branch, folder = `/docs`.
3. The site goes live at `https://<user>.github.io/<repo>/`.

No build config needed — it's plain HTML.
