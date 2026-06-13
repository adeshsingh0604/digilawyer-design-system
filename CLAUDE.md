# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static HTML/CSS design system documentation site for DigiLawyer. Lives under `docs/` in the repo (sibling folders `react/` and `storybook/` are separate workstreams). No build step, no package manager, no framework — open any `.html` file under `docs/` directly in a browser or serve `docs/` with any static file server.

## Viewing the Site

```bash
open docs/index.html
# or, from the repo root:
npx serve docs
# or
python3 -m http.server 8080 -d docs
```

## Architecture

### Shared CSS (`docs/shared/`)

- `tokens.css` — the single source of truth. Color primitives → semantic color tokens → component tokens. All component and layout CSS must reference tokens, never raw values. Theme switching toggles `data-theme="dark"` on `<html>`.
- `layout.css` — imports `tokens.css`, sets up the global header + fixed sidebar + scrolling main + fixed TOC layout, and defines shared page-level typography.
- `components.css` — imports `tokens.css`, defines the `demo-box`/`demo-panel`/`demo-tab` pattern, code blocks, token tables, callouts, the `.coming-soon` stub placeholder, and per-component blocks (.btn, .btn-group, .checkbox, .radio, header search, …).

### Shared JS — `docs/shared/ds.js`

One script does everything on every page:

- **Theme restore (pre-paint).** A small IIFE at the top reads `localStorage` and sets `data-theme` on `<html>` before any CSS is parsed. **`ds.js` MUST be loaded synchronously in `<head>` BEFORE the stylesheet links** — otherwise dark-mode pages flash light on reload.
- **Global header injection.** A fixed top bar with the DigiLawyer DS logo + version chip on the left, search input + theme toggle on the right. Auto-injected — pages don't need a mount point. Sits above the sidebar/TOC; offsets them down by `--ds-header-height` (56px) via layout.css.
- **Header search.** Substring match against a static index built from `SEARCH_DOCS` (pages + their sections) and `SEARCH_TOKENS` (semantic CSS tokens). Dropdown with keyboard nav (↓/↑/Enter/Esc), clicking a result navigates to the page + section anchor. **Keep these arrays in sync when documenting a new page or adding new semantic tokens.**
- **Sidebar injection** from the central `NAV` array. Adding/renaming/reordering pages is one edit, not 35. As of v2.6.0 the sidebar no longer carries its own logo or theme button — those live in the global header.
- **TOC auto-extraction** from `<main>`'s `h2[id]` anchors (default), with explicit override.
- **Scroll-spy** (IntersectionObserver + RAF scroll listener + hashchange click-pin) that keeps the right-rail active indicator in sync without flicker.
- **Theme toggle** writing back to `localStorage`.
- **Copy buttons** for any `.copy-btn[data-target=...]` element.
- **Version display** read from the `--ds-version` token.
- **Diagnostics.** `console.warn` when `DS_PAGE.key` doesn't match a NAV entry or `DS_PAGE.toc` references a missing anchor. Add `?ds-debug=1` to the URL (or set `window.DS_DEBUG = true` before load) to log every active-section transition with its trigger reason.

### Page structure (the v2.3.0 minimal pattern)

Every page should look like this. Stubs are even smaller (~25 lines) because they skip the `toc` and have a single `coming-soon` block in `<main>`.

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>… — DigiLawyer DS</title>
  <script>
    window.DS_PAGE = { key: 'colors', root: '../' };
    // Optional:
    //   toc: false                       → hide right-rail TOC
    //   toc: [{id,label},…]              → explicit TOC (curated labels / h3 anchors)
    //   omitted                          → auto-extract from h2[id] in <main>
  </script>
  <script src="../shared/ds.js"></script>
  <link rel="stylesheet" href="../shared/tokens.css">
  <link rel="stylesheet" href="../shared/layout.css">
  <link rel="stylesheet" href="../shared/components.css">
  <style>/* page-specific overrides only */</style>
</head>
<body>
  <!-- Global header is auto-injected by ds.js — no mount point needed. -->
  <nav   id="sidebar-mount"></nav>
  <main  class="main">
    <!-- content with h2[id] anchors -->
  </main>
  <aside id="toc-mount"></aside>
  <!-- inline <script> at end of body ONLY for page-specific behaviour
       (demo tabs, dynamic tables, filter pills). Theme, TOC, search, copy
       buttons all live in ds.js — never re-implement them per page. -->
</body>
</html>
```

Critical ordering rules:
- `ds.js` script tag must come **before** the CSS links. Theme-restore runs at script-parse time and must beat the first paint.
- `window.DS_PAGE` must be declared before `ds.js` loads — easiest spot is right above the `<script src>`.
- CSS link order: `tokens.css` → `layout.css` → `components.css` → page `<style>`.

### Path conventions

- Root pages (`docs/index.html`) reference shared files as `shared/tokens.css` (page-relative); `DS_PAGE.root = ''`.
- Pages in `foundation/`, `components/`, `other/` reference them as `../shared/tokens.css`; `DS_PAGE.root = '../'`.

### Sidebar navigation

Categories: Foundation, Inputs, Data Display, Feedback, Navigation, Other. `.sb-link` for completed pages, `.sb-link-stub` for planned-but-undocumented (muted, non-clickable). The active link is set automatically from `DS_PAGE.key`.

The single source of truth is the `NAV` array near the top of `docs/shared/ds.js`. Adding a new page = one edit there. Promoting a stub to a full page = flip `stub: true` to absent on the relevant `NAV` entry.

### Token hierarchy

Color Primitives → Color Tokens (semantic, with dark-mode overrides) → Component Tokens (e.g. `--btn-primary-bg`). Never reference primitives directly from component CSS.

## Adding a New Component Page

1. Copy `docs/starters/component.html` (stub) or `docs/starters/foundation.html` (fully-documented) to the appropriate folder.
2. Replace `KEY`, `LABEL`, `INTRO` placeholders.
3. In `docs/shared/ds.js`, flip the matching `NAV` entry from `stub: true` to a regular link.
4. Add any component tokens to `docs/shared/tokens.css` under both `:root` and `[data-theme="dark"]`.
5. For documented pages: write your content under `<main>` using `h2[id="..."]` anchors — they become TOC entries automatically.
6. Bump version + update `STATUS.md` per the versioning rules.

### Required sections for a fully-documented component

Every documented component page should include these h2 sections, in this order. The `foundation.html` starter already scaffolds them.

1. **Default / overview** — the simplest possible example.
2. **Variants** — primary, secondary, tertiary, etc.
3. **Sizes** — lg / md / sm / xs.
4. **States** — default, hover, disabled, plus any component-specific states (selected, loading, indeterminate).
5. **Full matrix** — the canonical reference grid showing every relevant variation of the component. The axes differ per component: Button uses state × size × variant (table generated by inline JS); Button Group uses position (Left / Middle / Right / Up / Down) in a single row. Pick the axes that actually describe the component's structural surface. Use em-dashes for intentionally-unsupported combinations and document the skip rules in the section's `.desc` paragraph. See [`docs/components/button.html`](docs/components/button.html) and [`docs/components/button-group.html`](docs/components/button-group.html) for the two canonical patterns.
6. **API** — class + attribute reference table.

Optional but encouraged: **With icons**, **Composition** (how this combines with other components), and a **Figma reference** section linking the source design node.

## Versioning

Semantic versioning: MAJOR for breaking token changes, MINOR for a new component fully documented or a new token group, PATCH for bug fixes or content updates.

**One command handles the version bump — run this, not the manual steps:**

```bash
node docs/scripts/bump-version.js <version> <patch|minor|major> "<title>" "<description>"
```

This updates `tokens.css` (single source of truth for all version displays), `STATUS.md`, `CHANGELOG.md`, `changelog.html`, and rotates the Latest Changes cards on the Overview page automatically.

## Deferred cleanups (good first issues)

- **Per-page card CSS.** `docs/foundation/radius.html` (`.rad-card`), `shadows.html` (`.sh-card`), `grid.html` (`.bp-card`), and `index.html` (`.qlink-card`, `.cl-card`) all define structurally similar card patterns with slightly different proportions. A single `.tok-card` base with size modifiers in `components.css` would drop ~50 lines of duplicated style across foundation pages. Risk: visual regression; do this with screenshot comparison.
- **CHANGELOG + STATUS dual-update.** Every PATCH currently touches `CHANGELOG.md`, `docs/other/changelog.html`, and `STATUS.md`. A tiny `docs/scripts/sync-changelog.js` could read `CHANGELOG.md` as the source of truth and regenerate the table rows in `changelog.html` + the version line in `STATUS.md`.

## Component Rules

These rules apply every time you touch any component — docs or React.

### Non-negotiable

- **Never hardcode a hex value or rgba() in component CSS.** Every color must come from a CSS custom property token (`var(--token-name)`). If the right token doesn't exist, add it to `tokens.css` first.
- **Always update both `:root` and `[data-theme="dark"]` together.** Every new token group needs a declaration in both blocks, even if the dark value is the same as light.
- **Never touch `layout.css` for component work.** Layout is off-limits. Component styles live in `components.css` only.
- **Never reference primitive tokens directly** (`--primitive-neutral-950` etc.) in component CSS. Use semantic or component tokens only.
- **Run `node docs/scripts/build-tokens.js` after every `tokens.css` change** so `tokens.json` stays in sync for React/Figma consumers.

### Component pages

- **Never remove the API section** from a component page — it's the machine-readable contract.
- **Never re-implement in a page script** anything `ds.js` already handles: theme toggle, TOC, scroll-spy, copy buttons, tab switching, search.
- **Scope page-local layout helpers under `.demo-panel.my-class`** — not `.my-class` alone. Specificity must reach (0,2,0) to beat `.demo-panel.active`. See DESIGN.md § 9.
- **Page-specific CSS prefix** — use a short component prefix on all page-local classes (e.g., `.rt-` for Rating, `.al-` for Alert) to prevent cross-page collisions.
- **Never change `DS_PAGE` config** unless renaming the page's key in the NAV array at the same time.

### Tokens and dark mode

- **Private `--_` variables** (e.g., `--_rt`, `--_bg`, `--_fg`) are internal cascade bridges set by modifier classes and read by child selectors. Never expose them as public tokens or reference them from outside the component block.
- **Dark mode is data-attribute driven** — `[data-theme="dark"]` on `<html>`. Never use `prefers-color-scheme` media queries in this system.

### Release ceremony

Run the bump script — it handles everything in one command:

```bash
node docs/scripts/bump-version.js <version> <patch|minor|major> "<title>" "<description>"
```

What it updates automatically: `tokens.css` (version + date tokens) · `STATUS.md` · `CHANGELOG.md` · `docs/other/changelog.html` · Latest Changes cards in `docs/index.html`.

### Per-component rules

Detailed rules for each individual component live in `.claude/components/<name>.md`. Read the relevant file before editing any component.

## Current State (v2.31.7)

All 36 pages use the minimal page pattern. All 25 components are fully documented with light + dark Figma-verified. The global header (logo + version chip + search + theme toggle) is injected by `ds.js` at runtime — no per-page change required.

**Search index lives in `ds.js`** — `SEARCH_DOCS` covers pages + sections, `SEARCH_TOKENS` covers semantic CSS tokens. When you add a new page or tokens, update both arrays.

**React workstream** lives in `react/`. One component implemented (Button). See `DESIGN.md → React & Figma Code Connect Readiness` for 9 actionable issues before adding more components.

## Scripts (`docs/scripts/`)

- **`build-tokens.js`** — parses `docs/shared/tokens.css` → writes `docs/shared/tokens.json` (flat `{light,dark}` lookup, var() refs resolved one level). Re-run after every tokens.css change so downstream consumers (React, AI tools, Figma plugins) see the new values.
- **`new-component.js <name>`** — scaffolds `docs/components/<name>.html` from the foundation starter and prints paste-blocks for the NAV / SEARCH_DOCS / SEARCH_TOKENS / tokens.css / components.css edits. Cuts next-component setup from ~30 min to ~10 min. Does NOT auto-modify ds.js / tokens.css / components.css (regex on those files is too easy to break).
- **`migrate-stubs.js`** — idempotent migration script from the original v2.3 stub sweep. Safe to re-run; skips anything already on the v2.3 shape.
