<!--
HOW TO UPDATE VERSION:
1. Decide change type: MAJOR / MINOR / PATCH
2. Update --ds-version in shared/tokens.css
3. Update sidebar logo version string in all HTML pages (find/replace sb-tag content)
4. Add new entry at the TOP of this CHANGELOG.md (below this comment block)
5. Add the same entry as a new row at the TOP of the <tbody> in pages/changelog.html
6. Update "Latest Changes" cards on index.html after every MINOR or MAJOR bump
7. Format: ## vX.X.X — DD MMM YYYY

MAJOR: breaking changes, full system restructure
MINOR: new component documented, new token group added
PATCH: bug fix, token correction, content update

SYNC INSTRUCTIONS (keep CHANGELOG.md and pages/changelog.html in sync):
Whenever you add a new row to pages/changelog.html, add the same entry here using:

## vX.X.X — DD MMM YYYY
### Type: MAJOR / MINOR / PATCH
### Updated by: Name
**What changed:** Short title
**Description:** Brief description
-->

## v2.8.0 — 25 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Scaffold tooling — `build-tokens.js` (tokens.json export) + `new-component.js` (page scaffold)
**Description:** Two new scripts in `docs/scripts/` to speed up future component work and unblock cross-tool token consumption. **`build-tokens.js`** parses `docs/shared/tokens.css` and emits `docs/shared/tokens.json` — flat `{light,dark}` lookup with `var()` references resolved one level (dark inherits light then overrides). Current output: 323 light + 323 dark tokens. Downstream React, AI tools, Figma plugins can now `import tokens from './shared/tokens.json'`. **`new-component.js <name>`** creates `docs/components/<name>.html` from the foundation starter with `KEY`/`LABEL`/`INTRO`/`DS_PAGE` substituted, refuses to clobber documented pages, and prints copy-paste blocks for the manual edits to ds.js NAV + SEARCH_DOCS + SEARCH_TOKENS, tokens.css, components.css, plus the version-bump checklist. Cuts next-component setup from ~30 min to ~10 min. Intentionally does NOT auto-modify ds.js / tokens.css / components.css (regex on those is too fragile). Documented in `docs/README.md` Scripts section; CLAUDE.md updated.

---

## v2.7.3 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Repo restructured — docs site moved into `docs/` alongside `react/` and new `storybook/`
**Description:** Moved the seven HTML-site folders (`index.html`, `components/`, `foundation/`, `other/`, `shared/`, `starters/`, `scripts/`) into a new top-level `docs/` folder. Created sibling `storybook/` folder (placeholder for the planned Storybook setup). Internal HTML links and the auto-injected sidebar/TOC/search continue working unchanged because every page uses page-relative paths (`../shared/ds.js` etc). `migrate-stubs.js` still resolves correctly from `docs/scripts/`. Rewrote root `README.md` as a monorepo intro (docs/ + react/ + storybook/); refreshed HTML-site-specific instructions into `docs/README.md`; added `storybook/README.md` placeholder. Updated repo-root path references in CLAUDE.md and STATUS.md to use the `docs/` prefix.

---

## v2.7.2 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Fix theme-toggle flicker and lag on the sidebar
**Description:** Toggling theme used to animate every element's `background` / `color` independently over 200ms — body, header, sidebar, each of ~30 nav links, every demo-box. The cascade visibly trailed and read as flicker, especially on the sidebar. `initThemeToggle()` now adds a `ds-no-transitions` class on `<html>` before flipping `data-theme`, forces a reflow so the new colours paint synchronously, then removes the class on the next animation frame. Transitions resume immediately for hover/focus etc. Theme change is now instant, no flicker. New global rule in `layout.css` (`html.ds-no-transitions *` suppresses transitions).

---

## v2.7.1 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Drop redundant `Tokens: ...` paragraph from component pages
**Description:** Removed the ad-hoc "Tokens: --foo, --bar, ..." paragraph from the bottom of API on `button-group.html`, `checkbox.html`, and `radio.html`. The paragraph was inconsistent (only on 3 of 4 documented components — `button.html` never had it) and added visual noise without adding information — token discoverability is already covered by the v2.6.0 global header search (every token indexed with context) and by `shared/tokens.css` as the source of truth. API tables now stay focused on the consumer surface (classes + attributes).

---

## v2.7.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Radio Button component — full documentation
**Description:** New `.radio` component (label wrapper + visually-hidden `<input type="radio">` + circular `.radio-box` + `.radio-dot` inner indicator). Same a11y pattern as `.checkbox` — pure CSS state via `:checked` / `:disabled` / `:focus-visible`, browser handles single-select semantics via shared `name="…"` group. Implemented 1:1 from the [Base-AI Figma library](https://www.figma.com/design/jKtF7a0jm6o1ikGpdz3WO2/Base-AI?node-id=105-1673) — every Figma variable maps to a token already in `tokens.css`. Documented at `components/radio.html` with 5 sections (Default / Variants / States / Full matrix / API); matrix is 2 variants × 3 states matching the Figma exactly. Added 13 new `--radio-*` component tokens (light + dark). Extended `SEARCH_DOCS` (Radio Button promoted from stub to documented) and `SEARCH_TOKENS` (+13 radio tokens) in `ds.js` so the new content is searchable from the global header.

---

## v2.6.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Persistent global header — logo + version chip + global search + theme toggle on every page
**Description:** New top bar injected by `ds.js` on every page. **Left:** DigiLawyer DS wordmark + the same `.sb-tag` version chip already used in the sidebar (auto-bound to `DS_VERSION`). **Right:** search input + theme toggle. Sticky at the top — content scrolls beneath via `--ds-header-height: 56px`; layout.css shifts the sidebar/TOC down by that amount and bumps `.main` padding-top. Sidebar lost its own logo/version/theme button — they all live in the global header now (cleaner, no duplication). **Search index** (`SEARCH_DOCS` + `SEARCH_TOKENS` in `ds.js`) covers every page, every documented section, and ~120 semantic CSS tokens — flattens to ~220 entries. Substring match, ranked exact → prefix → contains, then page → section → token. Dropdown shows the label + its context page; clicking navigates to the page+anchor. Full keyboard nav: ↓/↑ to highlight, Enter to navigate, Esc to close. New sprite symbol `#ico-search`. New token `--ds-header-height`. CLAUDE.md documents the header as a shared ds.js component and notes that `SEARCH_DOCS` / `SEARCH_TOKENS` must be kept in sync when documenting new pages.

---

## v2.5.1 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** `not-allowed` cursor now actually shows on disabled buttons (and disabled buttons inside button groups)
**Description:** All five button disabled rules (`.btn-primary:disabled`, `.btn-secondary:disabled`, `.btn-tertiary:disabled`, `.btn-ghost:disabled`, `.btn-danger:disabled`) had `cursor: not-allowed` paired with `pointer-events: none` — the second declaration was swallowing hover events before the cursor could apply, so disabled buttons just showed the default arrow. Dropped `pointer-events: none` from all five rules. The native HTML `disabled` attribute already prevents clicks, so removing pointer-events has no functional regression — it just lets the cursor render. Matches the `.checkbox` wrapper pattern (`.checkbox:has(.checkbox-input:disabled) { cursor: not-allowed; }`) that already worked correctly. Button groups inherit automatically since they compose `.btn-*` classes.

---

## v2.5.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Checkbox component — full documentation
**Description:** New `.checkbox` component implementing the [Base-AI Figma reference](https://www.figma.com/design/jKtF7a0jm6o1ikGpdz3WO2/Base-AI?node-id=105-863) — 3 variants (Unchecked / Checked / Indeterminate) × 3 states (Default / Hover / Disabled) at the canonical 16×16 size. Built on a native `<input type="checkbox">` wrapped in a `<label>` — fully keyboard-accessible with zero JS for state (only used to set the `.indeterminate` property which has no HTML attribute equivalent). Added 13 component tokens to `shared/tokens.css` (light + dark): `--checkbox-bg`, `--checkbox-border`, `--checkbox-bg-hover`, `--checkbox-border-hover`, `--checkbox-bg-disabled`, `--checkbox-border-disabled`, `--checkbox-checked-bg`, `--checkbox-checked-border`, `--checkbox-checked-glyph`, `--checkbox-checked-bg-hover`, `--checkbox-checked-border-hover`, `--checkbox-checked-bg-disabled`, `--checkbox-checked-border-disabled`. Added two new sprite symbols to `ds.js` — `#ico-check` and `#ico-dash` — reusable for future selection components (radio, list-group). Documented at `components/checkbox.html` with 5 sections (Default / Variants / States / Full matrix / API) and a 3×3 grid matrix matching Figma exactly. New `.is-hover` documentation helper class on `.checkbox` forces the hover visual at rest for matrix cells.

---

## v2.4.4 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Trim Button Group docs — drop Variants and Figma reference sections
**Description:** Removed two redundant sections from `components/button-group.html`: the **Variants** tab block (conflicted with the established "no all-primary group" rule, and the Full matrix now covers variant guidance in its intro copy) and the **Figma reference — Remote / Local** demo (the position-based Full matrix now teaches the structural Figma reference directly). Page is down to 9 sections: Default, Attached vs separated, Sizes, With icons, Toggle / selection, Vertical, States, Full matrix, API. Also refreshed the page intro to drop the "five variants" framing and instead point users to Secondary/Tertiary/Ghost as the base + primary-fill or active-border for the selected button.

---

## v2.4.3 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Button Group — Full matrix reshaped to position variants; new `.btn-pos-*` helpers
**Description:** Replaced the v2.4.2 state × size × variant matrix in `components/button-group.html` with a position-based row matching the [Base-AI Figma reference](https://www.figma.com/design/jKtF7a0jm6o1ikGpdz3WO2/Base-AI?node-id=78-2602) — five cells showing Left / Middle / Right / Up / Down position styling. Position is the structural property that actually defines a button-group's anatomy, so the matrix now teaches that directly. Added five new standalone helper classes to `components.css`: `.btn-pos-left`, `.btn-pos-middle`, `.btn-pos-right`, `.btn-pos-up`, `.btn-pos-down` — each applies the position-specific border-radius and collapses the border that would meet an adjacent button. Inside a real `.btn-group` position is still automatic via `:first-child`/`:last-child`; the helpers are for documentation and hand-composed layouts. Added `.bg-matrix-row` / `.bg-matrix-cell` / `.bg-matrix-cell-label` layout helpers to `components.css`. Updated CLAUDE.md to generalize "Full matrix" — the axes differ per component (state × size × variant for Button, position for Button Group), pick what describes the component's structural surface.

---

## v2.4.2 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Button Group — Full matrix, universal toggle, active-border selection style; matrix scaffold in starter
**Description:** Added the canonical Full matrix section to `components/button-group.html` — 4 states × 4 sizes × 5 variants, generated by an inline JS loop, with documented skip rules (no all-primary groups, active-border selection only on Tertiary base). Generalised the toggle behaviour: every `.btn-group` is now interactive by default; opt out per-group with `data-no-toggle` (used on the static matrix cells). Added a new `.btn-group-active-border` wrapper modifier so the selected button can adopt the `.btn-active-border` solid-border look instead of the primary fill. Cleaned up the Figma reference section by removing the in-page token mapping paragraph. Updated `starters/foundation.html` to scaffold the Full matrix + API table sections — every new component page now inherits the pattern automatically. CLAUDE.md "Adding a New Component Page" now lists the required h2 sections.

---

## v2.4.1 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Figma reference demo in Button Group — Remote/Local toggle from Base-AI library
**Description:** Implemented the "Remote / Local" segmented toggle from the [Base-AI Figma library](https://www.figma.com/design/jKtF7a0jm6o1ikGpdz3WO2/Base-AI?node-id=4073-27909) as a live interactive demo in `components/button-group.html`. Achieved 1:1 visual parity using existing tokens — every Figma variable maps to a token in `tokens.css` (`Button/Primary/Default/Background` → `--btn-primary-bg`, `Product/Border` → `--btn-tertiary-border`, etc.). Three small refinements to align with Figma's pill aesthetic: (1) added `--spacing-xxs: 4px` to fill the semantic gap (Figma uses it; previously only the primitive `--space-1` existed); (2) bumped `.btn-group > .btn` font-weight to `--fw-semibold` for clearer reads at small sizes; (3) `.btn-xs` corners inside a group now use `--radius-md` (8px) instead of `--radius-sm` (6px) to match Figma's pill radius. Solo `.btn-xs` (outside any group) keeps `--radius-sm` for standalone tightness.

---

## v2.4.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Button Group component — full documentation
**Description:** New `.btn-group` component composes existing button variants/sizes into related rows or columns. Two grouping styles: attached (`.btn-group`, shared borders, segmented-control look) and separated (`.btn-group-separated`, gap between buttons). Both support `.btn-group-vertical`. Selection state via `aria-pressed="true"` (semantic) or `.active`. Documented at `components/button-group.html` with 9 sections (default, attached vs separated, variants, sizes, with icons, toggle/selection, vertical, states, API), interactive toggle demos, and copy-paste code samples. Added two tokens: `--btn-group-gap` and `--btn-group-overlap`. NAV entry already exists; no stub flag to flip.

---

## v2.3.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Audit pass — auto-extract TOC, bulk-migrate every page, add diagnostics, drop boilerplate
**Description:** Restructured ds.js so each page declares just `key` and `root` — the right-rail TOC is auto-extracted from `<main>` `h2[id]` anchors by default. Explicit `toc: [...]` still wins for curated labels (only `index.html` and `foundation/colors.html` use it now). Bulk-migrated all 26 remaining component stubs from the legacy hardcoded-sidebar pattern to the lean v2.3 shell via `scripts/migrate-stubs.js` — each stub dropped from ~99–115 lines to ~25. Dropped redundant `toc` arrays from the seven foundation/built pages whose TOCs just restated their h2 IDs. Added `console.warn` diagnostics when `DS_PAGE.key` doesn't match a NAV entry or `DS_PAGE.toc` references a missing anchor, plus a `?ds-debug=1` URL toggle that logs every active-section transition with its trigger reason. Added `starters/component.html` and `starters/foundation.html` minimal templates and rewrote the CLAUDE.md "Adding a New Component Page" flow to use them.

---

## v2.2.3 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Pin TOC active state during click-driven smooth scroll; add RAF-throttled scroll listener as IO backup
**Description:** v2.2.2 set the right active section on `hashchange`, but the IntersectionObserver kept firing mid-smooth-scroll and `update()` would compute from the still-moving viewport — briefly flipping the indicator back to the wrong section before scroll completed. That flicker is what was reading as "indicator jumps / stuck / not working." Added a `pinUntil` timestamp set on hashchange so `update()` is a no-op for ~800ms after a click. Also added a `requestAnimationFrame`-throttled scroll listener alongside the IO so fast scroll can never out-run the indicator. Lowered the line to a fixed 100px from viewport top — simpler and more predictable than the previous viewport-percentage formula.

---

## v2.2.2 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** TOC scroll-spy still picked the wrong section near the top of a page; clicks on the first/last link did nothing visible
**Description:** v2.2.1 placed the activation line at 30% of the viewport, but pages like the overview have several headings stacked within the top ~200px (h1#overview + intro + h2#quick-links). The "last heading above the line" rule then picked quick-links even when the page was scrolled to the very top showing overview. Lowered the line to `min(20vh, 140px)` so only one heading qualifies at scrollY=0. Also wired the hashchange listener to read the URL hash directly and call `setActive` — clicking a TOC link now highlights the target immediately instead of waiting for the smooth-scroll to cross the line.

---

## v2.2.1 — 22 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Fix TOC scroll-spy stalling on click and inside long sections
**Description:** The v2.2.0 IntersectionObserver callback only updated when a heading was inside the 15–30% activation zone, so clicking a TOC link (heading lands at the top of the viewport, above the zone) and scrolling within a tall section both left the indicator stuck. Rewrote `initTOCSpy` to treat IO as a "something crossed the 30% line" trigger and recompute the active section on every fire as the last heading whose top is at or above the 30% line. Added a hashchange listener and a bottom-of-page snap so the last section becomes active when the page can't scroll any further.

---

## v2.2.0 — 22 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Shared TOC component, head-loaded ds.js
**Description:** ds.js now renders the on-page TOC from a `window.DS_PAGE.toc` array — pages declare their sections instead of duplicating the scroll-spy script. Moved `<script src="ds.js">` to `<head>` so the theme-restore IIFE fires before first paint (eliminates the flash of light theme on dark-mode reloads). Migrated all 10 built pages (index, changelog, 6 foundation pages, button, button-group) to the new pattern. New API: `window.DS_PAGE = { key, root, toc: [{id, label}, ...] }` plus body mount points `<nav id="sidebar-mount">` and `<aside id="toc-mount">`.

---

## v2.1.0 — 18 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Shared JS architecture (ds.js)
**Description:** Created shared/ds.js handling sidebar injection, version display from CSS tokens, localStorage theme toggle, TOC scroll-spy, and copy buttons. Added README.md with setup and contribution docs.

---

## v2.0.5 — 17 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Overview page restructure
**Description:** Quick Links updated to foundation links only, added full Components section with all component cards and links, Latest Changes moved to bottom of page

---

## v2.0.4 — 17 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Full token audit — replaced hardcoded values
**Description:** Replaced hardcoded colors and px values with CSS tokens across components.css, layout.css, shadows.html, typography.html, and index.html. Added --sidebar-width and --toc-width layout tokens. Syntax highlight colors and layout micro-spacing kept as intentional hardcodes.

---

## v2.0.3 — 17 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Removed Bigotech references, cleaned up overview page
**Description:** Replaced all Bigotech mentions with DigiLawyer, removed 5-products card, made intro section minimal so Quick Links appears in first fold

### Changed
- `index.html`: all "Bigotech" references removed or replaced with "DigiLawyer"
- `index.html`: "5 Products powered" stat card removed
- `index.html`: stat-grid (4 cards) replaced with a single inline stats line
- `index.html`: hero-rule decorative element removed
- `index.html`: intro paragraph shortened to one sentence
- `index.html`: main padding-top reduced from 52px to 28px; Quick Links now visible in first fold at 1440px

---

## v2.0.2 — 17 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Overview page improvements and changelog restructure
**Description:** Moved changelog to other/changelog.html, added Quick Links section and Latest Changes section to overview page, sidebar Other section added

### Changed
- Changelog moved from `pages/changelog.html` to `other/changelog.html`
- Sidebar: new "Other" section added with Changelog link
- `index.html`: new Quick Links section with 6 cards (Colors, Typography, Spacing, Button, Button Group, Changelog)
- `index.html`: new Latest Changes section positioned before Colors section
- Old "Quick links" and "Latest Changes" sections removed from bottom of overview

# DigiLawyer Design System — Changelog

## v2.0.0 — 17 May 2026
### Type: MAJOR
### Updated by: Adesh Singh
**What changed:** Initial release
**Description:** Complete token architecture, Button and Button Group, multi-page docs, categorised sidebar, light/dark mode

### Added
- Complete token architecture: Color Primitives, Color Tokens (light + dark mode), Typography, Spacing, Radius, Shadows, Grid
- Button component — full documentation with variants, sizes, states, icons, loading, full matrix, API reference
- Button Group component — position-based grouping (Left, Middle, Right) with nested Button instances
- Multi-page documentation structure with shared CSS architecture (`tokens.css`, `layout.css`, `components.css`)
- Foundation pages: Colors, Typography, Spacing, Radius, Shadows, Grid — all with real content and visual examples
- Stub pages for all remaining components across 5 categories
- Categorised sidebar navigation: Foundation, Inputs, Data Display, Feedback, Navigation
- Light and dark mode support via `data-theme="dark"` on `<html>`
- `sb-link-stub` style for planned-but-not-yet-documented components
- TODO.md with prioritised task list (High / Medium / Low)
- CHANGELOG.md with semantic versioning rules
- `pages/changelog.html` with filter bar (Type, Updated by, Reset) and sync instructions
