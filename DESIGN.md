# DigiLawyer Design System — Architecture Guide

> For developers joining the project. Everything in this document is derived directly from the codebase — no invented conventions.

---

## Table of Contents

1. [Project overview](#1-project-overview)
2. [Token hierarchy](#2-token-hierarchy)
3. [File structure](#3-file-structure)
4. [Dark mode](#4-dark-mode)
5. [Component page patterns](#5-component-page-patterns)
6. [ds.js — what it handles automatically](#6-dsjs--what-it-handles-automatically)
7. [Contribution rules](#7-contribution-rules)
8. [Versioning and the release ceremony](#8-versioning-and-the-release-ceremony)
9. [CSS specificity rules](#9-css-specificity-rules)
10. [Search index maintenance](#10-search-index-maintenance)
11. [Scripts](#11-scripts)

---

## 1. Project overview

A static HTML/CSS documentation site. No build step, no bundler, no framework. Open any `.html` file directly in a browser, or serve the `docs/` folder with any static file server:

```bash
open docs/index.html
# or
npx serve docs
# or
python3 -m http.server 8080 -d docs
```

The sibling folders `react/` and `storybook/` are separate workstreams. This document covers only the `docs/` site.

---

## 2. Token hierarchy

`docs/shared/tokens.css` is the **single source of truth** for every value in the system. It is organised in three layers, declared top to bottom in the `:root` block.

### Layer 1 — Color Primitives

Raw hex values named by color scale and numeric step. These never change between light and dark mode.

```css
--primitive-neutral-950: #2D2D2D;
--primitive-blue-500:    #3156DF;
--primitive-red-600:     #CD3232;
```

Eight scales exist: Neutral, Blue, Gold, Red, Green, Yellow, Purple, Orange. Each has ~12 steps (25 → 950).

**Rule: primitives are never referenced directly in component CSS.** They exist only so that semantic tokens can be defined without raw hex values.

### Layer 2 — Semantic (Color) Tokens

Named by purpose, not by visual value. These are the tokens that components and layout CSS consume.

```css
--color-bg:         #FFFFFF;
--color-heading:    #2D2D2D;
--color-subheading: #5D5D5D;
--color-border:     rgba(0,0,0,0.10);
--color-info-bg:    rgba(49,86,223,0.10);
--color-info-text:  #2843CD;
```

Semantic tokens also include non-color values: typography (`--font-primary`, `--fs-14`, `--fw-semibold`, `--lh-24`), spacing (`--spacing-md`, `--spacing-xl`), radius (`--radius-sm`, `--radius-md`), shadows (`--shadow-1` through `--shadow-5`), and system layout variables (`--ds-header-height`, `--sidebar-width`, `--toc-width`).

### Layer 3 — Component Tokens

Named by component and role. These reference semantic concepts (not primitives) so they can be overridden in dark mode without breaking the cascade.

```css
/* Button — Primary */
--btn-primary-bg:          #2D2D2D;
--btn-primary-text:        #FFFFFF;
--btn-primary-bg-hover:    #3D3D3D;
--btn-primary-bg-disabled: #E7E7E7;

/* Checkbox */
--checkbox-checked-bg:     #2D2D2D;
--checkbox-checked-glyph:  #FFFFFF;
```

Every component that adds new visual surface area adds a corresponding token group here, under both `:root` (light) and `[data-theme="dark"]` (dark).

### The rule in practice

```css
/* ✅ Correct — references a component token */
.btn-primary { background: var(--btn-primary-bg); }

/* ✅ Correct — references a semantic token */
.page-title  { color: var(--color-heading); }

/* ❌ Wrong — hardcoded hex */
.btn-primary { background: #2D2D2D; }

/* ❌ Wrong — references a primitive directly */
.btn-primary { background: var(--primitive-neutral-950); }
```

---

## 3. File structure

```
docs/
├── shared/
│   ├── tokens.css       ← source of truth for all values
│   ├── layout.css       ← global header, sidebar, TOC, main column
│   ├── components.css   ← demo scaffolding + all component CSS blocks
│   └── ds.js            ← runtime: header, sidebar, TOC, search, theme, scroll-spy
├── scripts/
│   ├── build-tokens.js  ← tokens.css → tokens.json
│   ├── new-component.js ← scaffold a new component page
│   └── migrate-stubs.js ← idempotent v2.3 migration helper
├── starters/
│   ├── component.html   ← stub template (copy this for a new page)
│   └── foundation.html  ← fully-documented page template
├── foundation/          ← Colors, Typography, Spacing, Radius, Shadows, Grid
├── components/          ← one .html per component (25 pages)
├── other/
│   └── changelog.html   ← full version history with filter bar
└── index.html           ← overview / landing page
```

### When to touch each shared file

| File | Touch when |
|---|---|
| `tokens.css` | Adding a new component (new token group), fixing a token value, bumping `--ds-version` |
| `layout.css` | Changing the global layout — header height, sidebar width, main padding |
| `components.css` | Adding CSS for a new component, fixing an existing component's styles |
| `ds.js` | Adding a page to the NAV, promoting a stub, updating `SEARCH_DOCS`/`SEARCH_TOKENS`, bumping `DS_VERSION` |

**Do not touch `layout.css` or `ds.js` for per-component style work.** Component CSS lives entirely in `components.css`. Per-page layout overrides live in a `<style>` block inside the page's `<head>`.

---

## 4. Dark mode

Theme switching is driven by a single HTML attribute: `data-theme="dark"` on `<html>`. Toggling it is the entire mechanism — no class swaps, no JS style manipulation, no media queries for theme.

### How token overrides work

`tokens.css` has a `[data-theme="dark"]` block that re-declares only the tokens whose values change in dark mode. Primitives are never re-declared — they don't change.

```css
/* Light (in :root) */
--color-bg:      #FFFFFF;
--color-heading: #2D2D2D;
--btn-primary-bg: #2D2D2D;
--btn-primary-text: #FFFFFF;

/* Dark (in [data-theme="dark"]) — same token names, different values */
--color-bg:      #1C1C1C;
--color-heading: #FFFFFF;
--btn-primary-bg: #FFFFFF;   /* inverts — white button on dark page */
--btn-primary-text: #2D2D2D;
```

Because every component reads from its token, the entire UI repaints correctly the moment `data-theme` changes — no JavaScript needs to know which components are on screen.

### Theme persistence — no flash on reload

`ds.js` reads `localStorage.getItem('ds-theme')` in a synchronous IIFE at the very top of the file, before any CSS has been parsed, and sets `data-theme` on `<html>` immediately. This is why **`ds.js` must be loaded synchronously in `<head>` BEFORE the stylesheet `<link>` tags** — if the order is reversed, the CSS parses with the wrong theme and the user sees a flash.

```html
<!-- ✅ Correct order -->
<script src="../shared/ds.js"></script>
<link rel="stylesheet" href="../shared/tokens.css">
<link rel="stylesheet" href="../shared/layout.css">
<link rel="stylesheet" href="../shared/components.css">

<!-- ❌ Wrong — ds.js after CSS means theme flash on dark-mode reload -->
<link rel="stylesheet" href="../shared/tokens.css">
<script src="../shared/ds.js"></script>
```

### The no-hardcode rule

**Never write a hex value or rgba() in `components.css` or in a page `<style>` block.** All values must come from tokens. If the right token doesn't exist yet, add it to `tokens.css` first (under both `:root` and `[data-theme="dark"]`), then reference it.

---

## 5. Component page patterns

### The minimal page shell

Every page in `docs/` uses this exact pattern:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Button — DigiLawyer DS</title>
<script>
  window.DS_PAGE = { key: 'button', root: '../' };
</script>
<script src="../shared/ds.js"></script>
<link rel="stylesheet" href="../shared/tokens.css">
<link rel="stylesheet" href="../shared/layout.css">
<link rel="stylesheet" href="../shared/components.css">
<style>/* page-specific overrides only */</style>
</head>
<body>
<nav id="sidebar-mount"></nav>

<main class="main">
  <h1 class="page-title">Button</h1>
  <p class="page-intro">…</p>
  <h2 id="default">Default</h2>
  …
</main>
<aside id="toc-mount"></aside>

<script>/* page-specific interactive behaviour only */</script>
</body>
</html>
```

### `window.DS_PAGE` config

Declared in an inline `<script>` immediately before the `ds.js` `<script src>`:

| Property | Required | Values |
|---|---|---|
| `key` | Yes | Must exactly match a `key` in the `NAV` array in `ds.js` |
| `root` | Yes | `''` for `docs/index.html`; `'../'` for pages in subfolders |
| `toc` | No | Omit → auto-extract `h2[id]` from `<main>`. `false` → hide TOC. `[{id, label}, …]` → explicit list |

### Path conventions

- `docs/index.html` uses `shared/tokens.css` (no `../`); `DS_PAGE.root = ''`
- All pages under `foundation/`, `components/`, `other/` use `../shared/tokens.css`; `DS_PAGE.root = '../'`

### Required sections for a component page

Every fully-documented component page has these `h2` sections, in this order:

1. **Default** — the simplest possible example, no variant modifiers
2. **Variants** — the different visual modes (primary, secondary, etc.)
3. **Sizes** — lg / md / sm / xs where applicable
4. **States** — default, hover, disabled, plus component-specific states
5. **Full matrix** — canonical reference grid. Axes vary per component (Button: state × size × variant; Rating: shape × colour × fill-state). Use em-dashes for intentionally unsupported combinations.
6. **API** — class and attribute reference table (`<table class="api-table">`)

Optional sections: **Interactive** (live demo), **Composition** (how this composes with other components).

### Demo scaffolding classes

These come from `components.css` and are used on every page:

```html
<!-- Outer container — provides border and border-radius -->
<div class="demo-box">

  <!-- Optional tab bar — switches between demo-panels -->
  <div class="demo-tabs">
    <button class="demo-tab active" data-group="basic" data-panel="b-all">ALL</button>
    <button class="demo-tab" data-group="basic" data-panel="b-primary">PRIMARY</button>
  </div>

  <!-- Panels — only the .active one is shown -->
  <div id="b-all" class="demo-panel active">
    <!-- component demos go here -->
  </div>
  <div id="b-primary" class="demo-panel">…</div>

</div>

<!-- Code block below the demo-box -->
<div class="code-wrap">
  <div class="code-bar">
    <span class="code-lang">HTML</span>
    <button class="copy-btn" data-target="my-code-id">Copy</button>
  </div>
  <pre id="my-code-id">…</pre>
</div>
```

`ds.js` handles tab switching and copy buttons automatically — no page-level JS needed for these.

### Page-specific CSS scoping

When a component page needs layout helpers (custom grid, row/column arrangements for demos), define them in the page `<style>` block, not in `components.css`. Scope them with a component-specific prefix to avoid collisions:

```css
/* Rating page — prefix: rt- */
.demo-panel.rt-row { display: flex; flex-wrap: wrap; gap: 24px; }
.demo-panel.rt-grid { display: grid; grid-template-columns: 90px 1fr; }
```

Note the selector form: `.demo-panel.rt-row`, not `.rt-row`. See [CSS specificity rules](#9-css-specificity-rules) for why this matters.

### Inline JS — when and how

The end-of-body `<script>` block is for **page-specific interactive behaviour only**:

- Live demos that respond to user input
- Dynamic table generation (e.g., full-matrix rendered from inline JS)
- Custom interactive states

**Never re-implement** in a page script anything that `ds.js` already handles: theme toggle, TOC, scroll-spy, copy buttons, tab switching, search.

### SVG sprite pool pattern

Components that need custom icons (Alert, Rating, etc.) declare a hidden SVG sprite pool at the top of `<body>` and reference symbols via `<use>`:

```html
<!-- Hidden pool — zero dimensions, before sidebar-mount -->
<svg style="position:absolute;width:0;height:0;overflow:hidden;" xmlns="http://www.w3.org/2000/svg">
  <symbol id="ico-my-icon" viewBox="0 0 24 24">
    <path d="…"/>
  </symbol>
</svg>

<!-- Usage anywhere in the page -->
<svg width="20" height="20"><use href="#ico-my-icon"/></svg>
```

`ds.js` injects its own sprite pool (sidebar/header icons) as `<body>`'s first child. Page-level pools come after `sidebar-mount`.

---

## 6. ds.js — what it handles automatically

`ds.js` runs on every page and provides all shared chrome. Once loaded, a page gets all of this for free:

| Feature | What it does |
|---|---|
| **Theme restore** | Reads `localStorage['ds-theme']`, sets `data-theme` on `<html>` before first paint — no flash |
| **Global header** | Injects `<header class="ds-header">` as `<body>`'s first child: logo + version chip + search + theme toggle |
| **Sidebar** | Replaces `<nav id="sidebar-mount">` with a full `<nav class="sidebar">` built from the `NAV` array. Active link set from `DS_PAGE.key` |
| **Sidebar scroll** | Saves scroll position to `sessionStorage['ds-sidebar-scroll']` on user scroll + link click; restores it on load. Clicking a `.qlink-card` (overview cards) sets a pending-active flag so the destination page nudges the sidebar to show the active link |
| **TOC** | Replaces `<aside id="toc-mount">` with a right-rail TOC auto-extracted from `h2[id]` in `<main>` (overridable via `DS_PAGE.toc`) |
| **Scroll-spy** | IntersectionObserver + scroll listener; keeps the active TOC link in sync with the viewport |
| **Theme toggle** | Listens to the header toggle button; swaps `data-theme` and persists to `localStorage` |
| **Header search** | Substring match on `SEARCH_DOCS` + `SEARCH_TOKENS` indices; keyboard nav (↓/↑/Enter/Esc) |
| **Copy buttons** | Any `<button class="copy-btn" data-target="id">` copies the `innerText` of `#id` to the clipboard |
| **Version chip** | Reads `--ds-version` from computed CSS; displays it in the header brand area |
| **Demo tabs** | `data-group` + `data-panel` attributes on `.demo-tab` elements wire up panel switching automatically |
| **Diagnostics** | `console.warn` on missing `DS_PAGE.key`. Add `?ds-debug=1` to the URL to log every scroll-spy transition |

---

## 7. Contribution rules

### Adding a new component

1. **Scaffold the page** using the script (prints paste blocks for every file you need to edit):
   ```bash
   node docs/scripts/new-component.js my-component
   ```
   This creates `docs/components/my-component.html` from the foundation starter and prints the exact paste blocks for steps 2–5.

2. **Add component tokens** to `docs/shared/tokens.css` under both `:root` (light) and `[data-theme="dark"]`:
   ```css
   /* My Component */
   --mycomp-bg:   …;
   --mycomp-text: …;
   ```

3. **Add component CSS** to `docs/shared/components.css`:
   ```css
   /* ── MY COMPONENT ── */
   .mycomp { background: var(--mycomp-bg); color: var(--mycomp-text); }
   ```

4. **Promote the NAV entry** in `docs/shared/ds.js`: remove `stub: true` from the matching entry in the `NAV` array (or add a new entry if one doesn't exist).

5. **Update the search index** in `docs/shared/ds.js`: add an entry to `SEARCH_DOCS` (page + sections) and any new tokens to `SEARCH_TOKENS`.

6. **Write the page content** — follow the required sections order in § 5.

7. **Run the token build** after any change to `tokens.css`:
   ```bash
   node docs/scripts/build-tokens.js
   ```

8. **Bump the version and run the release ceremony** — see § 8.

### Rules that apply to all contributions

- **No hardcoded values** — every color, size, radius, and shadow must come from a token.
- **No primitives in component CSS** — only semantic or component tokens.
- **No per-page re-implementation** of anything `ds.js` already handles.
- **Page-specific CSS** lives in the page's `<head><style>` block, scoped with a component prefix. It never goes in `components.css`.
- **Every new token group** must have both a light (`:root`) and dark (`[data-theme="dark"]`) declaration, even if the dark value is the same.

---

## 8. Versioning and the release ceremony

The system uses semantic versioning:

| Type | When | Example |
|---|---|---|
| **MAJOR** | Breaking token changes, full restructure | Renaming a token group |
| **MINOR** | New component fully documented, new token group | Adding Rating |
| **PATCH** | Bug fix, content update, token correction | Fixing a dark-mode value |

### The 6-step release ceremony

Every version bump touches **exactly these files**, in this order:

1. **`docs/shared/tokens.css`** — bump `--ds-version: "X.X.X"` near the bottom of `:root`
2. **`docs/shared/ds.js`** — bump `var DS_VERSION = 'X.X.X'` near the top of the IIFE
3. **`CHANGELOG.md`** — add a new entry at the very top (below the header comment):
   ```markdown
   ## vX.X.X — DD Mon YYYY
   ### Type: PATCH / MINOR / MAJOR
   ### Updated by: Name
   **What changed:** Short title
   **Description:** Full description
   ```
4. **`docs/other/changelog.html`** — add a new `<tr>` at the top of `<tbody id="changelog-body">`:
   ```html
   <tr data-type="patch" data-by="Name">
     <td class="ver">vX.X.X</td>
     <td><span class="type-badge patch">PATCH</span></td>
     <td>Short title</td>
     <td>Full description</td>
     <td style="white-space:nowrap;">DD Mon YYYY</td>
     <td>Name</td>
   </tr>
   ```
5. **`docs/index.html`** — for MINOR or MAJOR releases only: update the "Latest Changes" grid. Always exactly **3 content cards**. Add the new release at the top; drop the oldest. Update the version badge `<span class="version-badge">` and "Last updated" date.
6. **`STATUS.md`** — update "Current Version" and "Last Updated". For MINOR releases, move the component from "What is Pending" to "What is Built".

After any token change, also regenerate `tokens.json`:
```bash
node docs/scripts/build-tokens.js
```

---

## 9. CSS specificity rules

### The demo-panel override pattern

`.demo-panel.active` (specificity 0,2,0) is declared in `components.css` and overrides the default `display: none` on `.demo-panel`. Page-level layout helpers that set a custom `display` on `.demo-panel` must reach the same specificity to win on source order.

**Always scope page-local layout modifiers under `.demo-panel.my-class`, never as a standalone `.my-class`:**

```css
/* ✅ Correct — specificity (0,2,0), wins over .demo-panel.active by source order */
.demo-panel.rt-row {
  display: flex;
  flex-wrap: wrap;
}

/* ❌ Wrong — specificity (0,1,0), loses to .demo-panel.active which is (0,2,0) */
.rt-row {
  display: flex;
}
```

### Private custom property cascade

Some complex components use `--_` prefixed internal variables as a CSS cascade bridge. A modifier class sets the variable; child selectors read it:

```css
/* Modifier sets the private variable */
.rating-yellow { --_rt: var(--rating-star); }  /* #FFC107 */
.rating-red    { --_rt: var(--rating-heart); } /* #CD3232 */

/* Child reads the private variable with a fallback */
.rating-item.is-filled { color: var(--_rt, var(--rating-brand)); }
```

This lets you write one CSS rule for a child that responds to any of several parent modifiers, without repeating the child rule for each variant. The convention is:
- `--_` prefix = internal, not part of the public token API
- Always include a fallback: `var(--_rt, var(--rating-brand))`
- Set the variable on the wrapper/modifier class, read it in children

---

## 10. Search index maintenance

The global search (header search bar) runs against a static index in `ds.js`. **Every time you add a page, add sections to a page, or add new semantic tokens, you must update both arrays.**

### `SEARCH_DOCS`

One entry per page, listing every section anchor:

```javascript
{ label: 'Rating', href: 'components/rating.html', context: 'Component',
  sections: [
    ['default',     'Default'],
    ['shapes',      'Shapes'],
    ['colors',      'Colors'],
    ['sizes',       'Sizes'],
    ['states',      'States'],
    ['interactive', 'Interactive'],
    ['api',         'API']
  ]
}
```

Each pair is `[id, label]` — `id` must match an `h2[id]` on the page.

### `SEARCH_TOKENS`

One entry per semantic or component token:

```javascript
['--rating-brand', 'components/rating.html#api', 'Rating']
```

Primitive tokens (`--primitive-*`) are not indexed — they're never searched for by consumers.

---

## 11. Scripts

All scripts live in `docs/scripts/` and run with Node.js from the project root.

### `build-tokens.js`

```bash
node docs/scripts/build-tokens.js
```

Parses `docs/shared/tokens.css` and writes `docs/shared/tokens.json` — a flat `{ light, dark }` lookup with `var()` references resolved one level. Run this after every `tokens.css` change. The JSON file is consumed by downstream tools (React, Figma plugins, AI tooling).

### `new-component.js <name>`

```bash
node docs/scripts/new-component.js tooltip
```

1. Creates `docs/components/tooltip.html` from `docs/starters/foundation.html`
2. Prints paste blocks for: NAV entry, SEARCH_DOCS entry, SEARCH_TOKENS entries, tokens.css token group, components.css CSS block

The script prints; it does not auto-modify `ds.js`, `tokens.css`, or `components.css`. Those edits require human review to avoid regex errors on large files.

### `migrate-stubs.js`

Idempotent migration script from the v2.3 page pattern sweep. Safe to re-run; skips anything already on the correct shape. Not needed for new work.

---

## Appendix: The complete load order

```html
<head>
  <!-- 1. DS_PAGE config — must come before ds.js -->
  <script>
    window.DS_PAGE = { key: 'mypage', root: '../' };
  </script>

  <!-- 2. ds.js — synchronous, theme-restore runs immediately -->
  <script src="../shared/ds.js"></script>

  <!-- 3. CSS — in this exact order -->
  <link rel="stylesheet" href="../shared/tokens.css">
  <link rel="stylesheet" href="../shared/layout.css">
  <link rel="stylesheet" href="../shared/components.css">

  <!-- 4. Page-specific styles last -->
  <style>/* scoped overrides */</style>
</head>
<body>

  <!-- 5. Sidebar mount — replaced by ds.js at DOMContentLoaded -->
  <nav id="sidebar-mount"></nav>

  <!-- 6. Main content with h2[id] section anchors for TOC -->
  <main class="main">
    <h1 class="page-title">…</h1>
    <h2 id="default">Default</h2>
    …
  </main>

  <!-- 7. TOC mount — replaced by ds.js at DOMContentLoaded -->
  <aside id="toc-mount"></aside>

  <!-- 8. Page-specific JS last — only interactive/demo behaviour -->
  <script>/* page-specific only */</script>

</body>
```

If anything in `<head>` is out of order, one of three things breaks:
- `DS_PAGE` after `ds.js` → `cfg()` returns `{}` → sidebar has no active link
- `ds.js` after CSS → dark mode flashes light on reload
- CSS out of order → tokens not available when layout or components parse

---

## React & Figma Code Connect Readiness

> Audit performed against the codebase at v2.31.7. All findings reference actual files and line numbers.

### Folder structure (confirmed)

All three workstream folders exist at the repo root:

```
digilawyer-design-system/
├── docs/        ← HTML/CSS documentation site (canonical visual reference)
├── react/       ← React component library — Vite build, Storybook 8 at react/.storybook/
└── storybook/   ← Root-level README placeholder only. Storybook is NOT configured here.
                    The actual Storybook config lives at react/.storybook/.
```

`storybook/README.md` exists and explains the planned setup. `react/README.md` was created as part of this audit.

---

### 🔴 Blockers — broken before first `npm run storybook`

#### 1. `react/src/index.js` — file does not exist

`react/package.json` declares `"main": "src/index.js"` but the file is missing. The library has no public entry point. No component can be imported by downstream consumers.

**Fix:** Create `react/src/index.js` and export each component from it as components are added:
```js
export { Button, default as Button } from './components/Button';
```

#### 2. `react/src/tokens/index.js` line 1 — broken import path

```js
// Current — resolves to /digilawyer-design-system/shared/tokens.json (DOES NOT EXIST)
import tokens from '../../../shared/tokens.json';

// Correct — tokens.json lives inside docs/
import tokens from '../../../docs/shared/tokens.json';
```

The `docs/` path segment is missing. The import silently fails at build time.

#### 3. `react/src/tokens/index.js` line 3 — broken destructuring

```js
// Current — all named exports will be undefined
export const { color, typography, spacing, radius, shadow, breakpoint, grid, dark } = tokens;
```

`tokens.json` has the shape `{ "light": { "btn-primary-bg": "#2D2D2D", … }, "dark": { … } }` — a flat key-value map under `light` and `dark`. There are no `color`, `typography`, `spacing`, etc. keys. Every named export from this file is `undefined`.

**Fix:** Change the destructuring to match the actual shape:
```js
export const { light, dark } = tokens;
export default tokens;
// Usage: tokens.light['btn-primary-bg']  →  "#2D2D2D"
```

#### 4. `react/.storybook/preview.js` line 2 — broken tokens.css import path

```js
// Current — resolves to /digilawyer-design-system/shared/tokens.css (DOES NOT EXIST)
import '../../shared/tokens.css';

// Correct
import '../../docs/shared/tokens.css';
```

Storybook currently cannot load the design tokens. All CSS custom properties (`var(--color-heading)` etc.) will resolve to their browser defaults. The `data-theme` decorator wires up correctly but has nothing to toggle.

---

### 🟡 Structural issues — should fix before adding more components

#### 5. `react/.storybook/preview.js` line 3 — manual CSS imports won't scale

```js
import '../src/components/Button/Button.css';
```

This pattern requires manually adding a new import for every component. It also means Storybook will fail to render any component whose CSS hasn't been manually listed here.

**Fix:** Either have each component import its own CSS (`import './Button.css'` inside `Button.jsx` — already done for Button), or create a single `src/index.css` that imports all component stylesheets. Remove per-component imports from `preview.js` and import only `src/index.css`. Since `Button.jsx` already imports `Button.css`, the per-component pattern is already working — remove the duplicate manual import from `preview.js`.

#### 6. `react/src/components/Button/Button.css` — hardcoded hex values throughout

All 37 color declarations in `Button.css` are raw hex values. The file has token name comments (e.g., `/* color.button.primary.bg */`) but does not use CSS custom properties. This means:

- Token changes in `docs/shared/tokens.css` do **not** propagate to the React component
- Dark mode overrides in lines 179–250 also hardcode hex values, duplicating the theme logic already in `tokens.css`
- The `[data-theme="dark"]` blocks in `Button.css` will go out of sync with `tokens.css` as the system evolves

**Root cause:** The current approach treats `tokens.json` as the source for React rather than `tokens.css`. The React CSS copies token values as literals.

**Recommended fix:** Import `docs/shared/tokens.css` at the top of `Button.css` and use CSS custom properties:
```css
/* Button.css */
.btn--primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}
/* Dark mode is then handled automatically by tokens.css [data-theme="dark"] — no overrides needed here */
```
This eliminates the entire `[data-theme="dark"]` block from `Button.css` (currently ~75 lines) and keeps React perfectly in sync with the docs site.

#### 7. `react/src/components/Button/Button.css` line 29–30 — hardcoded focus ring colour

```css
/* Current — hardcoded blue, not theme-aware */
.btn:focus-visible {
  outline: 2px solid #3156DF;
}
```

The HTML docs site uses `var(--color-heading)` for the same focus ring (components.css line 145), which inverts correctly in dark mode (white ring on dark page). The React version will always show a blue ring regardless of theme.

**Fix:** `outline: 2px solid var(--color-heading)` — consistent with the docs site.

#### 8. Class naming divergence between HTML docs and React

The HTML documentation site and the React library use different class naming conventions for the same component:

| Concern | HTML docs (`components.css`) | React (`Button.css`) |
|---|---|---|
| Variant modifier | `.btn-primary` | `.btn--primary` |
| Size modifier | `.btn-md` | `.btn--md` |
| Child element | `.btn-label` | `.btn__label` |

The React library intentionally uses BEM double-hyphen/double-underscore notation. **This is not a bug** — but it means the two implementations cannot share a stylesheet and must be kept in sync manually. Document this split explicitly so developers don't assume the stylesheets are interchangeable.

#### 9. `react/src/components/Button/Button.jsx` — no `className` prop forwarding

```jsx
// Current — className from the caller is silently dropped
export function Button({ variant, size, disabled, loading, iconLeft, iconRight, children, onClick }) {
```

Standard practice in React component libraries is to accept and merge `className`:
```jsx
export function Button({ variant, size, disabled, loading, iconLeft, iconRight, children, onClick, className }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, loading ? 'btn--loading' : null, className]
    .filter(Boolean).join(' ');
```

Without this, Storybook decorators and host application styles cannot be applied to the component.

---

### 🟢 What's already correct

- **Token pipeline works.** `build-tokens.js` correctly generates `docs/shared/tokens.json` with flat `{ light, dark }` keys. Running `node docs/scripts/build-tokens.js` after any `tokens.css` change keeps JSON in sync.

- **Storybook `data-theme` decorator is correct.** `preview.js` sets `document.documentElement.setAttribute('data-theme', theme)` which mirrors the exact mechanism used by the HTML docs site. Once the `tokens.css` import path is fixed (issue #4), theme switching in Storybook will work identically to the docs.

- **`Button.jsx` props map cleanly to Figma.** `variant`, `size`, `disabled`, `loading` match the Figma component property names. No prop renaming will be needed for Code Connect.

- **Stories coverage is solid.** Playground, AllVariants, AllSizes, WithIcons, Disabled, and Loading are all covered with `autodocs` enabled.

- **Component-level CSS import is in place.** `Button.jsx` imports `./Button.css` directly, so the component is self-contained when added to a project.

---

### Figma Code Connect readiness

Code Connect maps Figma component nodes to React component code so Figma's Dev Mode shows the real markup.

**What's needed before Code Connect can be wired up:**

| Item | Status |
|---|---|
| `@figma/code-connect` npm package | ❌ Not in `react/package.json` devDependencies |
| `.figma.ts` mapping files per component | ❌ None exist |
| Figma node IDs in machine-readable form | ⚠️ Documented in HTML page intros as prose (e.g., "Mirrors Figma node 114-30") but not in a structured format |
| Prop names matching Figma property names | ✅ `variant`, `size`, `disabled` align |

**When ready, the workflow per component is:**
```bash
cd react
npx figma connect create src/components/Button/Button.jsx --figma-node-url https://www.figma.com/design/…?node-id=…
```
This scaffolds a `.figma.ts` file. Each prop is then mapped to the corresponding Figma component property. Because the HTML docs already record Figma node IDs in every page's intro paragraph, those IDs are the starting point.

**Private CSS custom properties and Code Connect:** The `--_` prefixed internal variables used in complex components (Alert: `--_bg`, `--_fg`; Rating: `--_rt`) are implementation details and have no impact on Code Connect — Code Connect operates at the React prop level, not the CSS variable level.

---

### Recommended action order

1. **Fix broken imports first** (issues #2, #3, #4) — unblocks `npm run storybook`
2. **Create `src/index.js`** (issue #1) — unblocks library consumption
3. **Switch `Button.css` to CSS custom properties** (issue #6) — eliminates dark-mode duplication and keeps React in sync with the token source
4. **Fix focus ring token** (issue #7) — 1-line change
5. **Add `className` forwarding to `Button.jsx`** (issue #9) — 2-line change
6. **Remove manual CSS import from `preview.js`** (issue #5) — 1-line change
7. When ≥3 components are implemented: **install `@figma/code-connect`** and scaffold `.figma.ts` files
