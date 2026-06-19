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

## v2.53.1 — 19 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Canary protocol for AI sessions
**Description:** Add canary token to react/components-manifest.json and CLAUDE.md rule requiring it be stated at the start of every session before any design system work, to prevent hallucinated component/token references.

## v2.53.0 — 15 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Responsive Phase 3 — HTML docs Responsive sections
**Description:** Add Responsive section (with 390 px mobile demo frame) to Button, Table, Tabs, Pagination, and Breadcrumb component docs pages. Add .rsp-phone utility to components.css.

## v2.52.0 — 15 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Responsive Phase 2 — Storybook viewports + Responsive stories
**Description:** Add DigiLawyer breakpoints (390/744/1440) to Storybook viewport toolbar via preview.js. Add Responsive story to Button, Table, Tabs, Pagination, and Breadcrumb demonstrating mobile CSS utilities.

## v2.51.0 — 15 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Responsive utilities
**Description:** Add responsive CSS for Button, Table, Tabs, Pagination and Breadcrumb — mobile breakpoint (≤743 px) rules in components.css

## v2.50.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Breadcrumb
**Description:** Hierarchical location molecule: Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbCurrent + chevron icons. Hover now shows underline (CSS fix for HTML + React). All 25 components complete.

## v2.49.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Link
**Description:** Inline text hyperlink atom: 3 colour variants × 4 sizes × 3 states, leading/trailing icon slots, underline + disabled props.

## v2.48.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Progress Bar
**Description:** Linear progress atom: ProgressBar with 7 colours × 2 sizes, determinate + indeterminate. Storybook: Playground, Default, Variants, Sizes, States, FullMatrix.

## v2.47.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Snackbar
**Description:** Toast notification molecule: Snackbar + SnackbarClose. 7 variants × 3 states (semi/filled/border). Storybook: Playground, Default, Variants, States, FullMatrix.

## v2.46.1 — 14 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Table kebab alignment
**Description:** Center the kebab action button in action-only columns — changed .table-cell-end from justify-content:flex-end to center.

## v2.46.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Table
**Description:** Data grid organism: TableWrap, Table, TableCell, TableCellAction + KebabIcon. Full Storybook coverage — Default (6×4 grid), Composition, States, FullMatrix.

## v2.45.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Options — React component
**Description:** Single selectable row with leading/trailing slots, 3 sizes, 3 states. OptionsMenu wrapper. Storybook: Playground, Default, Variants, Sizes, States, FullMatrix.

## v2.44.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** DatePicker — React component
**Description:** Single and range date picker with day/month/year view navigation, controlled and uncontrolled modes, minDate/maxDate, and interactive Input trigger story.

## v2.43.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** UploadMedia — React component
**Description:** Drop-target / file-list upload field with empty, 1-file, 2-file, and 3-file (limit) states. Controlled and uncontrolled modes, image preview, per-file remove, hover state, and Storybook stories.

## v2.42.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Rating — React component
**Description:** Star and heart rating component with half-step, read-only, disabled, three sizes, three colours, and Storybook stories.

## v2.41.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Slider — React component
**Description:** Slider and SliderRange components. Three track sizes (4/8/12px). Tooltip-on-hover and permanent-value-label display modes. Range variant with two thumbs and cross-constraint guard. Thumb position computed with the exact thumbPx formula from the HTML docs.

## v2.40.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Pagination — React component
**Description:** Pagination, PaginationPrev, PaginationNext, PaginationItem, and PaginationEllipsis components. Three sizes (lg/md/sm), interactive Default story with page state, EdgePages and FullMatrix stories.

## v2.39.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Tabs — React component
**Description:** Tabs, Tab, TabPanel components with lg/md/sm sizes, horizontal/vertical alignment, four states (default, hover, active, disabled), WAI-ARIA role=tablist/tab/tabpanel, and interactive Default story with panel switching.

## v2.38.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Tooltip — React component
**Description:** Tooltip pill with 3 sizes, 4 arrow positions, icon slots, and TooltipHost for CSS-only hover/focus show without JavaScript.

## v2.37.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Alert — React component
**Description:** Alert component with 7 semantic colours, 3 variants (Semi-filled, Filled, Border), dismiss button, and AlertBtnPrimary/Secondary action helpers.

## v2.36.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Avatar — React component
**Description:** Avatar component with Icon, Initials, and Image variants; 4 sizes; hover state; AvatarStack and AvatarStatus composition helpers.

## v2.35.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Badge — React component
**Description:** Badge component with Dot, Label, and Verify variants; 7 semantic colours; 3 sizes; BadgePin composition helper.

## v2.34.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Tag — React component
**Description:** Tag React component with 8 colors, 3 variants, 4 sizes, removable chips, and filter chip support.

## v2.33.0 — 14 June 2026
### Type: MINOR
### Updated by: Adesh
**What changed:** Dropdown — React component
**Description:** Dropdown and DropdownItem React components available in Storybook. Matches Figma panel chrome exactly.

## v2.32.1 — 13 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** React Storybook links on every component page + collaboration workflow
**Description:** (1) Added "React Storybook" Quick Link card on the Overview page linking to the live Storybook. (2) `ds.js` now auto-injects a "For React" section at the bottom of every component page — components with React stories get a card with a direct Storybook link; remaining components show a "coming soon" note. CSS for the banner added to `components.css`. (3) Added `CONTRIBUTING.md` with developer and designer workflow, branch naming, commit conventions, versioning rules, changelog process, and revert instructions. (4) Added GitHub PR template (auto-fills checklist on every PR) and three issue templates: Bug Report, Design Feedback, Token Change. (5) Deployed React components (Button, Checkbox, Toggle, Radio, ButtonGroup, Input with Tags + OTP, Textarea) to GitHub Pages Storybook at `/storybook/`.

## v2.31.7 — 3 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Overview — empty 4th changelog card replaced by "View full changelog" card-link. Sidebar — clicking any .qlink-card (overview component cards) now sets a pending-active flag so the destination page nudges the sidebar to show the active link.
**Description:** (1) **Overview Latest Changes**: removed the empty `<div class="cl-card">` that was rendering as a blank box in the 4th grid slot. Replaced it with `<a class="cl-card cl-card-more" href="other/changelog.html">` — a full-height card-styled link with "View full changelog →" centered, hover-lift on `.cl-card-more`. The separate `.cl-more` text link below the grid was removed. (2) **Sidebar navigation from content**: added `SIDEBAR_PENDING_ACTIVE_KEY = 'ds-sidebar-pending-active'` to ds.js. `initSidebarScrollPersistence` now attaches a click handler to every `.qlink-card` that sets this flag. On page load, `init()` checks the flag first — if set, clears it and calls `nudgeSidebarToActive(sidebar)` (deferred to window.load for CSS timing); if not set, falls back to the existing sessionStorage restore path. `nudgeSidebarToActive` does the same minimal edge-nudge as before (scroll only if active link is off-screen, never center).

## v2.31.6 — 3 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Sidebar scroll persistence — fixed two bugs that caused the saved position to be lost on navigation. Save is now synchronous (no RAF) + triggered on every link click. Restore runs twice (at DOMContentLoaded and window.load) to guarantee it applies after CSS makes the sidebar scrollable.
**Description:** Bug 1 — **RAF race condition**: the v2.31.5 scroll listener used `requestAnimationFrame` to debounce the save. If the user scrolled then clicked a link before the next animation frame, the RAF was cancelled by navigation and the latest `scrollTop` never reached sessionStorage. Fix: save synchronously on every scroll event (no RAF). Sidebar scrolls infrequently so the cost is negligible. Bug 2 — **Restore before CSS applies**: `restoreSidebarScroll` ran synchronously at `DOMContentLoaded`, but at that point `position: fixed; height: calc(100vh - 56px)` hadn't applied yet, so the sidebar had no height constraint and wasn't scrollable — setting `scrollTop` was silently ignored. Fix: restore both immediately (works on cached loads where CSS is already ready) and again at `window.load` (guaranteed to run after the stylesheet has applied). Double-set is harmless. Belt-and-suspenders: added a `click` listener on all `.sb-link` elements to force-save `scrollTop` right before browser navigation.

## v2.31.5 — 3 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Sidebar — replaced all auto-scroll logic with sessionStorage-based scroll persistence. Sidebar never moves automatically; scroll position is fully user-controlled and preserved across page navigations within the same tab session.
**Description:** Removed `scrollSidebarToActive()`, the `window.load` deferral, and the visibility-check nudge (v2.31.3 + v2.31.4). Added two functions in their place: `restoreSidebarScroll(sidebar)` reads `ds-sidebar-scroll` from sessionStorage and sets `sidebar.scrollTop` immediately after `buildSidebar()` runs; `initSidebarScrollPersistence(sidebar)` attaches a passive `scroll` listener (RAF-debounced) that writes the current `scrollTop` to sessionStorage on every user scroll. On first visit (no saved value), sidebar sits at natural position 0. sessionStorage errors (private browsing, storage full) are silently ignored. The active link still gets `.active` class via `buildSidebar()` — it just highlights wherever it is in the list without any movement.

## v2.31.4 — 3 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Sidebar — eliminated scroll-to-center jump on navigation. `scrollSidebarToActive()` now uses a visibility check instead of always centering. If the active link is already in the viewport, no scroll happens. Only `ds.js` changed.
**Description:** The centering formula (`target = offsetTop - clientHeight/2 + itemHeight/2`) always snapped the sidebar to put the active link in the middle of the viewport, even when it was already visible. Users saw a jump every time they clicked a link. New logic: read `sTop/sH/aTop/aH`, check if `aTop < sTop` (link above viewport → nudge up to its top edge) or `aTop + aH > sTop + sH` (link below viewport → nudge down to its bottom edge). If neither condition is true, the link is already fully visible — do nothing at all. Combined with the `window.load` deferral from v2.31.3, the sidebar is now fully stable: no jump when navigating via a visible link, minimal nudge only when directly loading a URL whose active link is off-screen (e.g. Changelog at the very bottom).

## v2.31.3 — 3 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Sidebar — fixed intermittent active-link scroll position. `scrollSidebarToActive()` now defers to `window.load` instead of running at `DOMContentLoaded`, so it always measures layout after CSS is applied.
**Description:** Root cause: `DOMContentLoaded` fires after HTML parsing but before stylesheets are applied. When `scrollSidebarToActive()` ran at DOMContentLoaded, `sidebar.clientHeight` was 0 (`.sidebar { height: calc(100vh - 56px) }` not yet computed) and `active.offsetTop` was meaningless in natural-flow layout. The calculation always resolved to `target ≤ 0`, clamped to 0, so `sidebar.scrollTop = 0`. Links near the top of the nav (Button, Colors) happened to be visible at position 0 — those appeared to "work". Links lower down (Rating, Slider, Date Picker — ~20th item) were off-screen — those appeared to "not work". The intermittency was caused by cache: on a fast/cached load CSS had painted before DOMContentLoaded fired, so the calculation was accidentally correct; on a cold load it wasn't. Fix: in `init()`, replace `scrollSidebarToActive()` with a conditional — if `document.readyState === 'complete'` (CSS already loaded) call directly, otherwise register `window.addEventListener('load', scrollSidebarToActive, { once: true })`. The `load` event is guaranteed to fire after all linked CSS, fonts, and images are ready. Only `ds.js` was changed; no HTML, CSS, or other files touched.

## v2.31.2 — 2 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Rating Interactive — both Full and Half modes shown side by side. Full Rating row (whole integers only) + Half Rating row (left 50% = .5, right 50% = full), each with all 3 colour variants. Controlled via `data-half="true"` attribute.
**Description:** Interactive section restructured from a single 3-widget row into two labelled groups separated by a divider: **Full Rating** (3 widgets, no `data-half`) and **Half Rating** (3 widgets, `data-half="true"`). Both groups contain Stars·Yellow / Stars·Brand / Hearts·Red. JS refactored: removed fragile `idx`-based `valEl` lookup — now uses `rating.closest('.rt-demo-pair').querySelector('.rt-current')` via DOM traversal so any number of widgets works without an index map. Added `useHalf = rating.dataset.half === 'true'` flag: in full mode `hoverVal` always returns `i + 1`; in half mode it uses midpoint detection via `getBoundingClientRect`. API table gains a new `data-half="true"` row documenting the flag. `data-interactive` row updated to cross-reference `data-half`.

## v2.31.1 — 2 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Rating Interactive — half-rating interaction added. Hover left 50% of icon = half rating preview; hover right 50% = full integer. Click commits the half or full value. Works on all 3 variants (star-yellow, star-brand, heart-red).
**Description:** Rewrote the interactive JS in `rating.html`. Old: `mouseenter` set a full integer on each item. New: `mousemove` + `mouseenter` detect cursor position via `getBoundingClientRect` (safe against child `<svg>` offsetX skew). `hoverVal(item, e, i)` returns `i + 0.5` when `clientX - rect.left < rect.width / 2`, else `i + 1`. `renderVal(val, preview)` handles fractional values: `Math.floor(val)` items get fill icon, `val % 1 !== 0 ? Math.floor(val) : -1` gets the half icon, the rest get stroke. Preview path adds `.is-preview`; commit path adds `.is-filled` / `.is-half`. `mouseleave` restores committed state. Value label displays `"2.5 / 5 stars"` format for half ratings.

## v2.31.0 — 2 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Rating — fully documented (Star + Heart, 3 colours, 3 sizes, 3 fill states, interactive). Last planned component — DigiLawyer Design System is now complete. 4 new --rating-* tokens.
**Description:** 1:1 with Figma nodes 114-30 + 114-198 (light) + 5970-310 + 5970-401 (dark). Two icon shapes: **Star** and **Heart**, each with three fill states — Filled (solid), Half (left-half fill + full outline), Stroke (outline only). Three colour variants: `.rating-brand` (`--rating-brand`, inverts dark), `.rating-yellow` (`--rating-star` #FFC107, star canonical), `.rating-red` (`--rating-heart` #CD3232, heart canonical). Three sizes: `.rating-lg` 24px / default 20px / `.rating-sm` 16px. Empty icons always use `--rating-empty` (#D1D1D1) regardless of colour modifier — driven by a `--_rt` private custom property cascade. SVG sprite pool with 6 symbols (star-fill/stroke/half + heart-fill/stroke/half) hidden in the page; icons reference them via `<use href="#..."/>`. Half-icon rendered without `clipPath` — explicit left-half polygon path plus full-shape stroke overlay. `data-interactive` attribute enables hover-preview (`.is-preview`) + click-to-rate (`.is-filled`) via page-scoped JS. `data-shape="heart"` switches `<use>` href IDs automatically. `aria-readonly="true"` disables interactions for display-only use. 7 sections: Default · Shapes · Colors · Sizes · States · Interactive · API. States section rendered from inline JS (3 sizes × 6 icons). Interactive section: 3 live widgets (star-yellow, star-brand, heart-red). Page-scoped layout helpers (`.demo-panel.rt-row/col/grid`) scoped under `.demo-panel` to avoid v2.26.2 CSS specificity conflict. 4 new tokens: `--rating-brand` (dark-mode inverts to #FFFFFF), `--rating-empty` (#D1D1D1), `--rating-star` (#FFC107), `--rating-heart` (#CD3232). No component stubs remain — system is complete.

## v2.30.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Slider — 5 bugs fixed + page restructured. Thumb centred on track, hover/drag rings, 3 sizes (4/8/12px), tooltip hidden by default (hover/drag only), two separate count modes.
**Description:** Complete rewrite of `.slider` CSS block. (1) **Thumb centring**: `input height: 16px` (= thumb diameter) + `margin-top: calc((--track-h - 16px) / 2)` centres thumb on any track height. (2) **Hover/drag rings**: `:hover` → `box-shadow: 0 0 0 8px var(--slider-ring-hover)`; `:active` → `14px var(--slider-ring-active)`. 2 new tokens, alpha-white in dark mode. (3) **3 track sizes**: `--track-h` CSS var on `.slider-field`; `.slider-md`=8px, `.slider-lg`=12px. Thumb margin-top auto-adjusts. (4) **Tooltip hidden at rest**: `.slider-tip { opacity: 0 }` by default; `.has-tip:hover` or `.has-tip.is-dragging` shows it. `.is-dragging` added/removed via JS mousedown/up handlers. (5) **Two count modes**: `.has-tip` = tooltip pill (ephemeral, hover/drag); `.has-val` = permanent bottom label. Padding reserved only when the class is present. Page restructured with Tooltip Count / Bottom Count / Range / Sizes / States / Interactive sections.

## v2.29.2 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Alert dark-mode — fixed 3 root causes: (1) body text invisible in coloured semi-filled dark alerts; (2) brand semi-filled dark primary button invisible (white on white); (3) brand filled dark primary button invisible. Border radius confirmed 8px.
**Description:** Three CSS-cascade root-cause fixes in the `.alert` block in components.css. (1) **Body text invisible in coloured semi-filled dark**: Dark semi-filled bgs for Info/Danger/Success/etc. are LIGHT tints (`#DDE7FC`, `#FDF3F3`, etc.), not dark surfaces. The old `--_body: var(--color-heading)` resolved to `#FFFFFF` (white) in dark mode → white text on white/near-white bg = invisible. Fixed: changed base `--_body: var(--_fg)` so the body colour follows the same accent colour as icon/title (dark blue on light blue, dark red on light pink, etc.). **Border** variant overrides `--_body: var(--color-heading)` because its bg = `--color-bg` (dark page bg in dark mode → white text readable). (2) **Brand semi-filled dark button invisible**: Brand dark semi-text = `#FFFFFF` → `--_b1bg = #FFFFFF` (white btn) with hardcoded `--_b1fg = #FFFFFF` = white on white. Fixed: in `.alert-brand` modifier, override `--_b1fg: var(--alert-brand-filled-text)`. `--alert-brand-filled-text` = `#FFFFFF` in light (dark btn = white text ✓) and `#2D2D2D` in dark (white btn = dark text ✓). Same token used for `--_b2bd` to make secondary border mode-adaptive. (3) **Brand filled dark button invisible**: Dark mode brand filled → alert bg = `#FFFFFF` (white). `rgba(255,255,255,0.92)` primary btn on white = invisible. New combined rule `.alert-brand.alert-filled` overrides `--_b1bg: var(--alert-brand-filled-text)` and `--_b1fg: var(--alert-brand-filled-bg)` which flip correctly: light → white btn + dark text on dark bg; dark → dark btn + white text on white bg.

## v2.29.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Alert header alignment fixed (icon + title + close now centre-aligned; both icon slots fixed at 24px). Deleted notification.html, accordion.html, list-group.html, images.html. Removed accordion/list-group/images from NAV, SEARCH_DOCS, and the overview component grid. Updated overview component grid to show "Alert" instead of "Notification".
**Description:** (1) **Alert alignment** — `.alert-header` was `align-items: flex-start`; changed to `align-items: center` so the 24px icon, the title text, and the close button all sit on the same axis. Both icon slots (`.alert-icon` and `.alert-close`) are now `flex: 0 0 24px; width: 24px; height: 24px`, matching each other and the Figma spec. The close icon SVG stays at 16×16 inside the 24px hit target. (2) **Deleted files** — `notification.html`, `accordion.html`, `list-group.html`, `images.html` removed from disk. Accordion, List Group, Images entries removed from NAV and SEARCH_DOCS in ds.js; "Notification" card replaced with "Alert" in the overview component grid. STATUS.md now shows only 2 pending stubs (Slider, Rating) plus a new "Removed Components" section documenting the decisions.

## v2.29.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Alert component fully documented — replaces "Notification" system-wide. 70 new `--alert-*` tokens (35 light + 35 dark). 7 colours × 3 variants (Semi-filled / Filled / Border).
**Description:** The component previously called "Notification" is renamed "Alert" everywhere: NAV entry (label + href + key), SEARCH_DOCS, SEARCH_TOKENS, STATUS.md stubs list. The old `notification.html` stub remains on disk but is no longer linked; the new `alert.html` is the canonical page. Spec: Figma 140-6541 (light) + 5958-2561 (dark). Structure: header row (20px icon + Body 1 Medium title + dismiss close) → Body 2 Regular description → flex row of action buttons (Caption 1 Semi Bold). 3 visual variants: **Semi-filled** (default, tinted bg + coloured title/icon, accent primary button), **Filled** (solid accent bg, all-white text/icon/body, primary button inverts to white bg + accent text), **Border** (page bg, coloured hairline, same coloured title as semi-filled). 7 colours: Brand · Info · Danger · Success · Warning · Notice · Alert/orange. **Token design:** 5 tokens per colour × 7 = 35 per mode: `semi-bg`, `semi-text`, `filled-bg`, `filled-text` (= `#FFFFFF` for all except Brand which inverts in dark), `brd-border`. **CSS cascade:** colour modifier (`.alert-info` etc.) sets 5 internal CSS custom props (`--_accent`, `--_bg`, `--_fg`, `--_b1bg`, `--_b2fg` plus derived vars for filled/border); variant modifier (`.alert-filled` / `.alert-border`) overrides what needs to change without re-specifying everything. The `--_accent` variable always holds the vivid colour so the Filled variant's primary button can use `--_b1fg: var(--_accent)` even after overriding `--_fg` to white for title/icon — this is the key architectural point that avoids the circular-dependency problem in CSS variable cascades. Brand filled in dark: white bg + dark text (true inversion). Full matrix renders 7 × 3 = 21 surfaces from inline JS (3 variant sections × 7-column grid). tokens.json regenerated.

## v2.28.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tooltip page — fixed alignment (Sizes now a proper 2-col grid, Positions sectioned into labelled rows), added Interactive hover demo, added `.tooltip-host` CSS to components.css.
**Description:** Two layout fixes. (1) Sizes section was a 4-col grid causing Large+tooltip in cols 1-2 and Medium+tooltip in cols 3-4, with Small on the next row at col 1. Rewrote to a 2-column grid (90px label | auto tooltip) with one row per size — matches the pattern used by all other size sections. (2) Positions section used the same 4-col grid whose column widths were too narrow for the tooltip text, causing the row labels to get clipped at the left edge (showing "OTTOM", "IGHT", "EFT"). Rewrote as a `flex-direction: column` container with one `tt-pos-block` per position, each block having a label + a flex-row of 3 sizes — identical to the Tabs Alignment section pattern. Added `.tooltip-host` interactive hover CSS to components.css: wraps a trigger + an absolutely-positioned tooltip child that hides at rest (`opacity: 0`) and fades in on `:hover`/`:focus-within` without JavaScript. Position is driven by the same `.tooltip-top/bottom/right/left` classes. New Interactive section in `tooltip.html` shows 4 buttons × 4 positions live. Added `.tooltip-host` API row to the table.

## v2.28.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Tooltip fully documented — 3 sizes × 4 arrow positions. Added 1 missing `--tooltip-border` token. The `--tooltip-bg` and `--tooltip-text` tokens already existed and already invert correctly (dark pill in light mode, light pill in dark mode).
**Description:** 1:1 with Figma node 140-7707 (light) + 2289-4036 (dark). Light mode: bg `#2D2D2D`, text `#F6F6F6`, border `rgba(255,255,255,0.10)`. Dark mode: bg `#F6F6F6`, text `#2D2D2D`, border `rgba(0,0,0,0.10)`. Tooltip deliberately INVERTS between modes — dark pill on light page, light pill on dark page — so it always contrasts with the surface behind it. Sizes: default Large (40 px, Body 2 14/24 Medium) / `.tooltip-md` Medium (32 px, Caption 1 12/16) / `.tooltip-sm` Small (24 px, Caption 2 10/12). All three sizes use `padding: 8px 12px` (spacing-xs / spacing-sm) except sm which drops to `6px 8px`. Arrow caret uses a `::after` fill triangle + `::before` border triangle (one pixel larger) so the 10% hairline follows the arrow tip. Four arrow positions: `.tooltip-top` (tooltip above, arrow at bottom pointing down), `.tooltip-bottom` (below, arrow up), `.tooltip-right` (to the right, arrow left), `.tooltip-left` (to the left, arrow right). `.tooltip-icon` slot scales icon 16 / 14 / 12 px with the parent size. New `tooltip.html` runs the 5-section pattern (Default / Sizes / Positions / Full matrix / API); Full matrix renders 4 positions × 3 sizes = 12 tooltip cells from inline JS. ds.js: stub flag dropped, SEARCH_DOCS gains 5 anchors, 3 SEARCH_TOKENS rows for `--tooltip-bg/text/border`.

## v2.27.2 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Avatar badge pinning — rewritten to CSS custom properties for truly auto-adjusting badge placement at every avatar size, any badge size.
**Description:** Previous approaches (percentage-based `top/right: 14%` or `14.6%`) were mathematically close but had two failure modes: (1) percentages are relative to the stack's layout box, which varies between avatar sizes, so the derived pixel value drifted slightly; (2) no explicit `overflow: visible` on the stack risked parent-level clipping. The new approach defines `--_av-r` (avatar full radius including border) as a CSS custom property on `.avatar-stack`, then computes `--_av-pin: calc(50% - var(--_av-r) * 0.7071)` — the exact pixel distance from the container edge to the 45° circle edge point (derived from `center - r/√2`). When `.avatar-stack-lg / -sm / -xs` override `--_av-r`, CSS cascades `--_av-pin` automatically, so `.avatar-pin-tr` and `.avatar-pin-br` always use the correct offset for that avatar size. `transform: translate(50%, ±50%)` then places the badge's CENTER on that edge point, so any badge width/height auto-extends outward proportionally — a small 8px dot badge sits on the edge with half inside/half out, a wide count pill extends further out, exactly as Figma intends. Added `overflow: visible` to `.avatar-stack` to ensure badges are never clipped by ancestor containers.

## v2.27.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Avatar — transposed the Sizes grid (rows = sizes, columns = variants per Figma) and fixed the `.avatar-pin-br` status-dot position so it sits centred on the circle's bottom-right edge at every size.
**Description:** Two fixes. (1) **Sizes grid was the wrong axis.** It rendered variants as rows (Icon / Initials / Image) with an awkward 4th "X-small" row that broke the pattern. Figma lays sizes out as rows (Large → X-small) with the three variants as columns. Rewrote the grid: a header row of variant labels (Icon / Initials / Image) followed by four size rows (Large 48 / Medium 40 / Small 32 / X-small 24), each row showing the same size across all three variants. (2) **Status dot drifted off the edge.** `.avatar-pin-br` pinned the dot's bottom-right *corner* with `bottom: 7%; right: 7%` — a percentage of the stack box that placed the dot's centre around 80% / 80% (slightly inside the disc), and the offset shifted per dot size since the corner-to-centre distance grew with the dot. Switched to a size-independent centre-anchor: `left: 83%; top: 83%; transform: translate(-50%, -50%)` places the dot's *centre* on the circle's 45° bottom-right edge (~4:30) regardless of avatar or dot size, matching Figma. The top-right count pin (`.avatar-pin-tr`) was already correct and is unchanged. Pure positioning + docs-layout fix; no token or structural changes.

## v2.27.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Avatar fully documented — 3 fill variants × 4 sizes + Badge composition (count + status dot). 2 new tokens added; the legacy `--avatar-bg-hover` corrected to match Figma's hover==default.
**Description:** 1:1 with Figma node 125-2432 (light) + 5914-6626 (dark). New `.avatar` rule in components.css: a circular disc — blue `--avatar-bg` (#3156DF), white `--avatar-text`, 1px `--avatar-border` (black-10%) hairline, `overflow: hidden` to clip the Image variant. Three fill variants: `.avatar-icon` (wraps an inline SVG silhouette at ~56% diameter, `currentColor`), `.avatar-initials` (1–2 letters Semi Bold, font scales 20/16/12/10 px), `.avatar-image` (clips an `<img>` via object-fit: cover, grey placeholder when empty). Four sizes — `.avatar-lg` 48 / default md 40 / `.avatar-sm` 32 / `.avatar-xs` 24. Figma reports identical disc tokens in light AND dark, so the component is mode-agnostic; the only cross-mode change is the page surface behind it. Hover keeps the same background (Figma's Hover bg == Default) and overlays a 10% black scrim (`--avatar-overlay-hover`) to signal interactivity — used only when the avatar is a button/link. **Composition with Badge:** `.avatar-stack` shrink-wraps the avatar so pinned children anchor to its corners without being clipped by the avatar's own overflow. `.avatar-pin-tr` pins a `.badge.badge-label.badge-danger` count (or `.badge-dot`) to the top-right; `.avatar-pin-br` pins an `.avatar-status` dot to the bottom-right. The status dot carries a 2px page-bg ring for separation and four colours (`-online` green / `-busy` red / `-away` yellow / `-offline` grey); `.avatar-stack-lg/-sm/-xs` scale the dot. **Tokens:** added `--avatar-border` (rgba(0,0,0,0.10)) + `--avatar-overlay-hover` (rgba(0,0,0,0.10)); kept `--avatar-bg-hover` for API parity but corrected it from the old brighter-blue placeholders (#2739A6 light / #4675EB dark) to #3156DF in both modes to match Figma. New `avatar.html` runs the 6-section pattern (Default / Variants / Sizes / States / Composition / Full matrix / API). ds.js: stub flag dropped, SEARCH_DOCS gains 7 section anchors, 5 SEARCH_TOKENS rows added for the `--avatar-*` family. tokens.json regenerated.

## v2.26.2 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Doc-page demo layouts on Link, Pagination, Breadcrumb (and latent on Table) collapsed inline — the page-local grid/column helpers were losing a CSS-specificity tie to `.demo-panel.active`. Scoped them under `.demo-panel` to win on source order.
**Description:** Distinct from v2.26.1 (which fixed the component-level icon↔text alignment). This is the demo-section layout: the Variants / Sizes / Separators / States sections render their label-and-example rows inside `<div class="demo-panel active {prefix}-grid">` (or `-row`). The shared `.demo-panel.active` rule has specificity (0,2,0) and sets `display: flex; align-items: center; justify-content: center; flex-wrap: wrap`. The page-local helpers (`.ln-grid`, `.pg-grid`, `.bc-grid`, `.tbl-row`, etc.) were single-class selectors at specificity (0,1,0) — so `display: grid` and `flex-direction: column` lost to the demo-panel's flex, and every label + example flowed into one centered wrapping line (e.g. "DEFAULT HOVER DISABLED Title Title Title BRAND Title…" all inline). This is the exact specificity bug fixed for Progress Bar in v2.22.1; the four newest pages reintroduced it because they were authored from the older single-class template. Fix: rescope each helper under `.demo-panel.{prefix}-grid` / `.demo-panel.{prefix}-row` so it ties the (0,2,0) specificity and wins on source order (page `<style>` is parsed after components.css). Added `justify-items: start` to the grids + `justify-content: flex-start` to the columns so cells left-align instead of inheriting the demo-panel's centering. Pages touched: `link.html`, `pagination.html`, `breadcrumb.html`, and `table.html` (the latter had the same latent bug in its Composition section — patched proactively). The horizontal `flex-wrap` row helpers on the older pages (badge, dropdown, input, tag, etc.) are unaffected: they happen to align with `.demo-panel.active`'s flex direction, so only `gap`/`padding` differ cosmetically — no layout break, left as-is.

## v2.26.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Alignment fixes across Link, Breadcrumb, and Pagination — three independent issues, all subtle, all from inline-flex / icon-vs-text composition.
**Description:** Three distinct root causes, all on inline icon ↔ text layouts: (1) **Pagination icon ↔ label gap was 0.** `.btn` base sets `gap: 0` (line 130 of components.css); the `.pagination .btn` cascade was overriding `height / padding / font / line-height` but never restoring the gap, so the chevron icon stuck flush against the "Previous" / "Next" label with no breathing room. Fixed by adding `gap: var(--spacing-xs)` (4 px) on lg / md cascades and `gap: var(--spacing-xxs)` (2 px) on sm. (2) **Link didn't baseline-align in flowing text.** `.link` is `display: inline-flex` (needed so the optional `.link-icon` can sit beside the text), but inline-flex without `vertical-align` defaults to the last line-box baseline — when a link is dropped into a `<p>` of running text it sat a pixel or two off the surrounding baseline. Fixed by adding `vertical-align: middle`. Also added `display: block` to `.link-icon svg` to prevent the inline-image baseline gap from sneaking under the icon. (3) **Breadcrumb separator height differed between variants.** `.breadcrumb-separator` had `display: inline-flex` with no explicit height — for the SVG variant the height came from the 16 × 16 SVG; for the `/` text variant the span inherited the breadcrumb's 24 px line-height. The two variants sat at slightly different positions in the row because their box centers didn't match. Fixed by giving the separator `height: 1em` + `line-height: 1`, with `width: 1em; height: 1em; display: block` on its inner SVG. Both variants now occupy exactly the font's em-box and cross-axis-center identically. Bonus: the `1em` sizing means `.breadcrumb-sm` doesn't need a separate `.breadcrumb-sm .breadcrumb-separator svg` rule — the SVG auto-scales with the font-size cascade. Dropped that override.

## v2.26.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Breadcrumb fully documented — `.breadcrumb` + `.breadcrumb-item` + `.breadcrumb-separator` + `.breadcrumb-current`. **Zero new tokens** — composes entirely with foundation tokens (`--color-subheading` for the trail, `--color-heading` for the current page).
**Description:** 1:1 with Figma node 141-9432 (light) + 5942-1172 (dark). Breadcrumb is a flat flex row — trail items (`.breadcrumb-item`) render as Body 1 Medium in `--color-subheading`, hover lifts to `--color-heading`. The final crumb (`.breadcrumb-current` + `aria-current="page"`) reads as Body 1 Semi Bold in `--color-heading` and is rendered as a `<span>` (not an anchor) because the user is already there. Separator markup is consumer-supplied — drop in an inline SVG (`#ico-chev-right-thin`, `#ico-chev-right-thick`) or any glyph character (e.g. `/`) and the component just styles whatever's in the slot. All three Figma variants demo without needing separator-modifier classes. `.breadcrumb-sm` density drops to Body 2 (14/20) for tight surfaces; the separator icon steps 16 → 14 px through the cascade. The component ships no own colour family — every value flows through `--color-subheading` and `--color-heading`, so a future foundation refresh propagates automatically. New `breadcrumb.html` runs the 6-section pattern (Default / Separators / Sizes / States / Composition / API); Composition section pairs a breadcrumb above an H1 + folder-path breadcrumbs inside a Table's cells. ds.js: stub flag dropped, SEARCH_DOCS extended with 6 section anchors; SEARCH_TOKENS untouched.

## v2.25.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Pagination fully documented — `.pagination` wrapper + `.pagination-ellipsis` + `.btn-square` modifier. **Zero new tokens** — composes entirely with the existing Button system.
**Description:** 1:1 with Figma node 141-8644 (light) + 5941-919 (dark). Pagination is a pure composition over the canonical Button primitive: the active page cell reuses `.btn.btn-primary` (with `aria-current="page"`), inactive page cells + Previous / Next reuse `.btn.btn-ghost`. The wrapper supplies a 3-tier density cascade — `.pagination-lg` 40 px / `.pagination` 36 px (default md) / `.pagination-sm` 32 px — that overrides Button's standard heights and typography to match Figma's Body 1 / Body 2 / Caption 1 Semi Bold spec. Chevron icons step 16 / 14 / 12 px through the same cascade. New `.btn-square` modifier clamps `min-width` to the row height and drops horizontal padding so page-number cells track a uniform square grid; `.pagination-ellipsis` is a non-interactive `<span aria-hidden="true">…</span>` that occupies the same cell footprint without the button surface. The cascade is owned by `.pagination[-size]` rather than the inner `.btn-{size}` classes — drop the per-button size suffix and let the wrapper drive the row. No new tokens, no new --pagination-* family — every colour flows through `--btn-primary-*` and `--btn-ghost-*` so a future Button-token refresh propagates automatically. New `pagination.html` runs the 6-section pattern (Default / Sizes / States / Composition / Full matrix / API); Full matrix renders 3 sizes × 4 page-position states (page 1 with Prev disabled / mid-range with two ellipses / second-to-last / last page with Next disabled) via inline JS. Composition section shows the icon-only Prev/Next variant for tight surfaces and a paginated Table footer. ds.js: stub flag dropped, SEARCH_DOCS extended with 6 section anchors; SEARCH_TOKENS untouched (no new tokens).

## v2.24.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Link fully documented — 3 variants × 4 sizes × 3 states + icon slot. Added 1 missing token (`--link-brand-hover`); the other 6 Link tokens were already in place.
**Description:** 1:1 with Figma node 140-7864 (light) + 5940-2868 (dark). New `.link` rule in components.css covers the base (Body 1 Semi Bold, inline-flex, no underline at rest, `--link-default-text`, `:hover` adds underline + swaps to `--link-hover-text`). Three colour variants — `.link-brand` (`#9B8B5D` resting, dark mode lifts hover to `#BAB28A`), `.link-blue` (`#3156DF` / `#4675EB` resting + `#2739A6` / `#6999F1` hover). Four sizes — default Body 1, `.link-sm` Body 3 (14/20), `.link-xs` Caption 1 (12/16), `.link-xxs` Caption 2 (10/12). `.link-underline` pins the underline at rest for cases where the link is the dominant interactive. `.link-icon` slot scales 16 / 14 / 12 / 10 px with the parent size; SVG inherits `currentColor` so it tracks variant + state automatically. `.is-disabled` / native `disabled` / `aria-disabled="true"` all drop to `--link-disabled-text`. New `link.html` runs the 6-section pattern (Default / Variants / Sizes / States / With icons / Full matrix / API); the Full matrix renders 3 × 4 × 3 = 36 cells from a small inline JS generator. Added `--link-brand-hover` token in both modes; tokens.css comment now spells out the variant + state matrix. ds.js: stub flag dropped, SEARCH_DOCS extended with 7 section anchors, 7 SEARCH_TOKENS rows added for the `--link-*` family.

## v2.23.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Table fully documented — `.table` + `.table-wrap` + `.table-cell` + `.table-cell-action` per Figma. 6 new tokens. New utility classes `.table-cell-end` + `.td-num`. Page passes through the /simplify cleanup pass.
**Description:** 1:1 with Figma node 140-5139 (light) + 5892-39544 (dark). The component is a real HTML `<table>` with `border-collapse: collapse`. `.table-wrap` clips the outer corners to 8 px (border-radius can't apply to `<table>` directly under border-collapse). Header strip uses `#F6F6F6` light / `#2D2D2D` dark; body rows are transparent so the page surface shows through. All cell borders are a 5%-alpha hairline. `.table-cell` is a flex wrapper inside `<td>` for label + trailing action — `display: flex` can't sit on a `td` itself without breaking table layout. `.table-cell-action` is the per-cell 24 × 24 icon button (kebab / More) that fades to the header bg on hover. Added two utility classes after a simplify pass: `.table-cell-end` flips justify-content to flex-end for action-only columns, `.td-num` applies `font-variant-numeric: tabular-nums` + right-align in one shot. 6 new `--table-{header|body}-{bg|text|border}` tokens × 2 modes (12 total). Full page docs covers Default (6 × 4 grid with kebab in every cell), Structure (canonical markup), Composition (badges / tags / status dots inside cells), States (per-cell kebab hover), Full matrix (cross-mode preview), API. ds.js: stub flag dropped, SEARCH_DOCS extended with 6 section anchors, 6 SEARCH_TOKENS rows added. /simplify cleanup pass landed 8 quality fixes on this same release: restored a broken `/* ── GLOBAL HEADER ──` comment opener that the Table append truncated, trimmed a 24-line markup-example comment to a 1-line pointer, dropped a dead `min-height: 24px`, dropped a no-op `border-color` override on `.table th`, added the two utility classes, moved `.is-hover` doc helper from page-local style to components.css, replaced an IIFE-generated Default table with literal HTML (eliminates layout-shift flash), and swept 10 + 4 inline `style=` repeats to the new utility classes.

## v2.22.10 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tabs now compose with the canonical Badge component — the legacy `.tab-badge` alias is retired. All 31 in-page badge instances now use `<span class="badge badge-label badge-info">…</span>`, and a small cascade rule auto-sizes the badge to match the parent tab size.
**Description:** v2.22.3–v2.22.6 rewrote the Badge component (three Label heights, proper Caption 2 typography, scalloped Verify glyph, Brand-dark inversion). Tabs were still using the legacy `.tab-badge` alias — which duplicated Badge's tokens locally instead of consuming them through the canonical component. Refactor (1) bulk-replaced every `<span class="tab-badge">…</span>` in `tabs.html` with `<span class="badge badge-label badge-info">…</span>` (31 instances across Default / Sizes / States / Alignment / Full matrix demos). Code-block sample + page-intro prose + Default-section desc all updated to reference the new canonical class. (2) Removed the `.tab-badge` CSS block from `components.css` (the 26-line rule that duplicated Badge tokens + its two `.tab-sm / .tab-lg .tab-badge` overrides). (3) Replaced it with a tight cascade rule: `.tab.tab-sm > .badge.badge-label:not(.badge-sm):not(.badge-lg)` and the matching `.tab-lg` selector auto-apply the Badge's own sm / lg sizing values, but only when the consumer hasn't pinned an explicit `badge-sm / badge-lg` on the markup (so manual overrides still win). The default md tab leaves the badge at Badge's default 16 px height. (4) API table row updated to document `.badge.badge-label.badge-info` as the canonical class with a historical note that `.tab-badge` was retired in v2.22.10. The Vertical alignment variant is unaffected — same cascade works on badges inside the `.tab-label-row` wrapper. No token changes, no visual regression. Tabs are now a true downstream consumer of the Badge component, so future Badge updates flow through automatically.

## v2.22.9 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tabs — icons now scale per tab size; Alignment section restructured so each tab size lives in its own `.tabs` row (was stretching small tabs to the height of the large)
**Description:** Two follow-up fixes on v2.22.8. (1) Icons were hardcoded `width: 16px; height: 16px` on every tab regardless of size — Figma actually scales them. Added size-specific rules: horizontal lg / md / sm → 20 / 16 / 14 px; vertical bumps up to 24 / 20 / 16 px because the icon owns its own row with breathing room above the label. (2) The Alignment demo put three different-sized tabs (`tab-lg` + default + `tab-sm`) in a single `.tabs` row — but `.tabs` uses `align-items: stretch`, so the small tab got stretched to 64 px tall to match the large vertical tab. Looked broken and confusing. Rewrote the demo as a 3 × 2 grid: rows are sizes (lg / md / sm), columns are alignments (horizontal / vertical), each cell is its own `.tabs` row with one tab. Pixel-size labels in the left column (48 / 64 etc.) make the vertical-vs-horizontal height delta unmistakable. Description copy in the section header now also calls out the "one size per row" rule.

## v2.22.8 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tabs — added Vertical alignment variant (`.tab-vertical`) per the refreshed Figma node 5934-1968. Tabs now ship in both Horizontal (icon · label · badge in a row) and Vertical (icon-on-top, label-row below) layouts.
**Description:** The new dark Figma reference (5934-1968) exposes a second axis on every tab — Alignment = Horizontal | Vertical. Pulled `get_metadata` and confirmed: every size × state has both alignment symbols, with vertical-symbol heights 64 / 52 / 48 px (vs horizontal 48 / 40 / 32 for lg / md / sm). Added `.tab-vertical` CSS modifier — flips `flex-direction` to column, sets the new heights, and reserves 4 px gap between the icon and the label row. Introduced `.tab-label-row` as an inner span so the label text + optional `.tab-badge` stay side-by-side under the icon in vertical layout. Active-state bottom-border still anchors at the bottom of either layout — same `--tab-active-border` token, no token changes. Added a new "Alignment" h2 section to tabs.html with both layouts demoed at all three sizes, updated the page intro to call out the axis, and extended the API table with rows for the two new classes. Search index gets the new `#alignment` anchor. Source-node citations refreshed across `tokens.css` + `tabs.html` (dark 5914-6861 → 5934-1968). Existing horizontal-tab markup is unchanged.

## v2.22.7 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tabs — re-audited against refreshed Figma nodes (3817-106 light, 5914-6861 dark). All 24 tab state/colour tokens already match 1:1. Fixed `.tab-badge` colour + typography + size-scaling to match the Figma spec.
**Description:** Pulled fresh `get_variable_defs` on both nodes. Tab tokens (4 states × 3 fields × 2 modes = 24 values) all confirmed already in parity — no token changes. The actual mismatch was on the inline `.tab-badge` count chip: it was using `--badge-brand-bg` (dark grey) but Figma shows every tab badge as Badge_Label Blue (Info, `#2843CD`). Also the typography was wrong — 6 px font on a 12 px pill vs Figma's Caption 2 Semi Bold (10 px / 12 px line) at the md tab default. Refactored `.tab-badge` to compose with the Info Badge tokens (`--badge-info-bg/text/border`) and use proper Caption 2 typography. Added size-scaling rules so the badge tracks the parent tab size: `.tab-sm .tab-badge` shrinks to 12 px tall + 8 px font, `.tab-lg .tab-badge` grows to 20 px tall + 12 px font, matching the Badge component's three Label heights. Source-node citations refreshed in `tokens.css` + `tabs.html` to point to the current Figma frames (dark `5887-4266` → `5914-6861`). Existing markup `<span class="tab-badge">9</span>` keeps working — only the rendered visual changes.

## v2.22.6 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Badge Verify variant — rebuilt as the scalloped/serrated verified-account glyph from Figma (12 outer bumps + central disc + white check), not a plain circle with a check
**Description:** Pulled the actual 12 px render from Figma node 123-2263 and confirmed Verify is the classic Twitter-style scalloped verified badge — 12 small outward bumps around a central disc with a white check on top. Previous implementations (`<circle r="6">` then later just a check stroke) never had the serrated outline. Rewrote the `#ico-badge-check` symbol to paint the full visual: a `<g>` of 13 circles (1 central r=5 disc + 12 radius-1 bumps at every 30° around radius 5) for the scalloped shape, plus a check `<path>` on top. The `.badge.badge-verify` container is now transparent (no background, no border) — the SVG owns the surface. Colours are driven by two new CSS custom properties (`--vs` for shape fill, `--vc` for check stroke) set per colour modifier — so Brand-dark inverts correctly (white scalloped shape + dark check) and the other six chromatic variants render white check on coloured scalloped shape in both modes. Tab badges and Dot/Label badges are unaffected (they don't carry `.badge-verify`).

## v2.22.5 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Badge page — sidebar disappeared after v2.22.4. Fixed: an unterminated HTML comment in badge.html was swallowing downstream markup including `<nav id="sidebar-mount">`.
**Description:** In v2.22.4 I added a multi-line note above the `#ico-badge-check` symbol and opened it with `<!--` but accidentally closed it with C-style `*/` instead of HTML's `-->`. The browser parser, having no `-->` to terminate the comment, kept consuming the document until it found the next valid `-->` further down the page — which sat after several blocks of real markup including the sidebar mount point. ds.js's `mount.parentNode.replaceChild(...)` then no-op'd because `getElementById('sidebar-mount')` returned null, and the page rendered with no sidebar at all. Replaced the bad `*/` with a proper `-->` and verified comment balance is now 10 opens / 10 closes. Same content, valid syntax. No CSS or token changes.

## v2.22.4 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Badge Verify variant — the check glyph was invisible (white-on-white). Removed the redundant inner disc from the SVG symbol so the badge's own coloured background shows through.
**Description:** The `#ico-badge-check` sprite carried `<circle cx="6" cy="6" r="6" fill="currentColor"/>` followed by a hard-coded `stroke="#FFFFFF"` check path. `currentColor` on a `.badge` is the text token — `#FFFFFF` for every chromatic variant — so the inner circle painted a solid white disc directly on top of the badge's coloured background, then the white check drew white-on-white. Net effect: every Verify badge rendered as a blank white circle inside the coloured halo border, with no check visible. The `.badge` element already provides the disc (background + border + radius-full), so the SVG should only carry the check stroke. Rewrote the symbol to a single `<path>` stroked in `currentColor`, bumped stroke-width 1.2 → 1.6 so it reads at the small badge sizes, and slightly tuned the corner coordinates for visual balance. Now the verify check inherits the badge text token correctly: white on the 6 chromatic colours, dark on the Brand-in-dark inversion. No CSS or token changes — pure SVG fix.

## v2.22.3 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Badge Label sizes — added the missing 3-height pill spec per Figma (Small 12 / Medium 16 / Large 20 px). Previous implementation only had one Label height (12 px), missing the other two from Figma's `Size=Small(12px) / Small(16px) / Large(20px)` variant axis.
**Description:** Audited the Figma metadata (`get_metadata` on nodes 123-2217 + 123-2267) and found Badge has TWO orthogonal size axes that weren't both implemented. (1) Dot / Verify variants are square at sm 4 / md 8 / lg 12 px — already correct. (2) **Label variant has three pill heights at sm 12 / md 16 / lg 20 px** — only the smallest was implemented. Added two new size rules in components.css: `.badge.badge-label.badge-sm` (12 tall, 8 px font) and `.badge.badge-label.badge-lg` (20 tall, 12 px font), with default `.badge.badge-label` now md (16 tall, 10 px font = Figma's Caption 2 Semi Bold). The size selectors use specificity (0,3,0) so they win over the plain `.badge-sm` / `.badge-lg` (0,1,0) — dots stay 4/12 px square, labels become auto-width pills at the right heights. min-width = height keeps the 1-digit form circular; 2 / 3 / 4-digit content auto-grows the pill width per Figma's Max Num axis. Updated badge.html Sizes section: now shows Dot/Verify across 3 sizes AND a 3 × 4 grid for Label (3 heights × 4 digit-count widths). API table updated to document the Dot/Verify-vs-Label size split. Full matrix description clarified. Tabs `.tab-badge` is a standalone alias and unaffected.

## v2.22.2 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Badge — re-audited against refreshed Figma nodes (123-2217 / 123-2267 light, 5926-1828 / 5926-1773 dark). No token values changed — every bg / text / border matches 1:1. Source-node comments updated for traceability.
**Description:** The design team refreshed the Badge frames in Figma, producing new dark-mode node IDs (5926-1828 / 5926-1773) replacing the older 5897-1277 / 5897-1222. Pulled fresh `get_variable_defs` for all four nodes and diffed every single value: 7 colours × 3 fields (bg / text / border) × 2 modes = 42 token values, all already pixel-exact in `tokens.css`. Brand inversion (light: `#2D2D2D` bg + white text, dark: `#FFFFFF` bg + `#2D2D2D` text), the 6 chromatic colours (Blue `#2843CD`, Green `#20994F`, Yellow `#E29500`, Orange `#DF7417`, Red `#CD3232`, Purple `#7F56D9`), and the halo border (white in light, `#1C1C1C` in dark) — all confirmed unchanged. Only updated the source-node comment in `tokens.css` and the "Mirrors Figma node …" line in `badge.html` to cite the current frame IDs so future audits trace to the right place. No CSS changes, no rendered visual change.

## v2.22.1 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Progress Bar page — fix Variants / States / Sizes label-bar layout (was flowing inline) and rebuild Interactive section with radio-style active states + inline % readout
**Description:** Three fixes on `docs/components/progress-bar.html`. (1) Layout: the `.pb-grid` and `.pb-row` helpers used single-class selectors (specificity 0,1,0) and lost to the shared `.demo-panel.active` rule (0,2,0), which set `display: flex`. Result: label + bar pairs flowed inline like text — three pairs per row instead of one. Fixed by scoping every layout helper under `.demo-panel.{class}` so specificity ties and our page-style wins on source order. Now each Variants / Sizes / States row is a single label-left + bar-right pair, vertically stacked. (2) Interactive section restructured: the live bar now sits in a `.pb-bar-row` flex container with the % value inline-right (was previously dangling at the end of the Value control row). The three control rows (Value / Colour / Size) are now a 2-column grid — labels left in an 80px column, options right in a flex row — so labels stack vertically and options align horizontally. (3) Colour and Size now behave like radio groups (only one active, `role="radio"` + `aria-checked`). Active selection uses `.btn-primary` (dark fill); inactive uses `.btn-secondary`. Ramp and Indeterminate are toggles with their own active state (`aria-pressed`), mutually exclusive with each other. Selected button is unmistakable now.

## v2.22.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Progress Bar fully documented — 7 colours × 2 sizes (8 / 12 px) + indeterminate, live interactive demo, 42 new tokens (21 × 2 modes), promoted from stub to full page
**Description:** 1:1 with Figma node 3007-14257 (light) + 5917-1593 (dark). Replaces the legacy 4-token progress block (--progress-filled / -green / -yellow / -red) with the full Figma spec: 7 colours (Brand / Blue / Green / Purple / Orange / Yellow / Red) × 3 fields (bg / border / progress) = 21 tokens per mode. Tracks sit at ~20% alpha of the progress colour for the 6 chromatic variants; Brand is the outlier — neutral black @ 10% in light, white @ 10% in dark — to keep its track from competing with semantic colour. Border is transparent everywhere but kept named so a future outlined variant can swap it without forking the rule. New .progress CSS in components.css: base track + .progress-fill child (width-driven, 0.24 s ease), .progress-sm (8 px, default) / .progress-md (12 px), 7 .progress-{color} modifiers, and .progress-indeterminate (1.4 s looped sweep animation for unknown-duration work). The fill clips at the corners via overflow: hidden + radius-full on the track so 0% / 100% both render cleanly. New components/progress-bar.html with the standard 6 sections plus an Interactive section: ramp/value-step buttons drive a real percentage on the live bar, plus colour and size swap buttons. Full matrix renders 7 × 5 grids (color × value) twice — once at sm, once at md. ds.js: stub flag dropped, SEARCH_DOCS gains sections, SEARCH_TOKENS gains all 21 new token names. Latest Changes cards refreshed; Snackbar (v2.19.0) drops off, Progress Bar moves to top.

## v2.21.4 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Date Picker Interactive demo — title-button view-switch and prev/next nav arrows now actually work (were being closed in the same tick by the outside-click handler)
**Description:** The Day → Month → Year drill-down looked broken — clicking the "July 2024 ⌄" title appeared to do nothing. Root cause was a click-event race, not a logic bug. The panel handler calls `render()` which replaces `panel.innerHTML`, detaching the originally-clicked button from the DOM. The click event then continues bubbling up to the document-level outside-click handler, which checks `field.contains(e.target)` — and `Node.contains()` returns false for a detached node — so the handler decides the click was "outside" and immediately calls `close()`, hiding the panel before the user sees the new view. Fix: `e.stopPropagation()` at the top of the panel click delegate. The click never reaches the document handler, so the outside-click logic doesn't see in-panel clicks at all. Same fix unblocks the prev/next nav arrows, which had the same race. Outside-click dismissal still works because clicks outside the panel never trip this guard.

## v2.21.3 — 1 June 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Date Picker Interactive demo — input pinned to the top of the canvas (was vertically centered), and the title-click view-switch now always lands on the correct year range
**Description:** Two fixes on `docs/components/date-picker.html`. (1) Layout: `.dp-interactive-panel` now forces `align-items: flex-start` + `justify-content: flex-start`, so the Text Input sits at the top of the 620px canvas instead of being centered. The calendar drops down absolutely-positioned below the input — when the input was centered, the calendar still rendered but its bottom rows overflowed the demo panel's bottom edge. Pinning the input to the top recovers ~250px of room below it. (2) JS: when the user clicks the title in Month view to jump to Year view, we now recompute `yearRangeStart = Math.floor(viewDate.getFullYear() / 12) * 12` instead of leaving the prior value. Without this, if the user had paged through year ranges via prev/next earlier in the session, the Month→Year hop landed on a stale range that didn't contain the year they were just viewing. The Day→Month→Year drill-down is the canonical Material/MUI date-picker interaction; this patch makes it reliably re-anchor on every transition.

## v2.21.2 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Date Picker Interactive demo — min-height 500 → 620 so the open calendar fits cleanly inside the demo canvas
**Description:** v2.21.1 bumped the Interactive demo panel's min-height to 500px to make room for the absolutely-positioned calendar. Turned out to be tight: the input-field block above takes ~100px, the calendar panel itself is ~360px (header 32 + weekdays 24 + 6 weeks × 32 + 32px panel padding × 2), and the demo panel's own padding adds another 56px top + bottom. Math came to ~530px and the calendar's bottom row overflowed below the panel's bottom border. Bumped `.dp-interactive-panel { min-height }` to 620px — generous enough to contain the calendar plus breathing room above and below. The comment block in the page CSS spells out the math so the next change has a paper trail.

## v2.21.1 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Date Picker Interactive demo — calendar was clipped by `.demo-box`'s `overflow: hidden` and the default `.demo-panel` min-height (100px). Added page-local helpers so the open calendar has room.
**Description:** Two new page-scoped classes on `docs/components/date-picker.html`: `.dp-interactive-box` overrides the inherited `overflow: hidden` to `visible` (so the absolutely-positioned calendar panel can spill out of the demo container instead of being chopped at the edges); `.dp-interactive-panel` bumps `min-height` from 100px to 500px (the calendar panel itself is ~360px tall, plus the input above and breathing room). The Interactive section's `.demo-box` and inner `.demo-panel` now carry these helpers — clicking the field opens a full calendar that sits cleanly below the input and is fully visible. No CSS or token changes to the shared `.datepicker` component itself — purely a docs-page visibility fix.

## v2.21.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Date Picker — full documentation (4 variants + 5 cell states), composes with Text Input as the trigger, live interactive calendar
**Description:** New `.datepicker` component documented 1:1 from the Base-AI Figma library (light nodes 105-1786 + 105-2329 + 105-2431, dark nodes 5913-1594 + 5913-1609 + 5913-1616). Floating panel with a 7-column day grid, optional two-month range view, 4×3 month picker, 4×3 year picker. **Four variants**: Single (day grid for picking one date), Range (two months side-by-side with `.is-range-start` + `.is-in-range` + `.is-range-end` styling), Month picker (4×3 month-name grid, navigated by year), Year picker (4×3 grid of 12 years at a time, navigated by 12-year ranges). **Five cell states**: Default · Hover · Active (the canonical inversion — dark fill + white text in light, white fill + dark text in dark) · In-range (the middle days of a range, using `--datepicker-cell-bg-in-range`) · Disabled / Other-month. Panel chrome reuses the same shadow + radius + border language as Dropdown so the visual elevation is consistent across the system. 10 new `--datepicker-*` tokens × light + dark = **20 total**. **Composes with Text Input as the trigger** per Adesh's spec: the live Interactive demo wires a real `.input` shell to a calendar panel that opens on click, fills the input with `9 July 2024`-style strings on date select, and closes on outside click. The page script handles month navigation with the ‹/› buttons, view-switching when the title is clicked (Day → Month → Year → Day), and 12-year-range navigation in the year view. State lives entirely in the demo script; lifting `fmt()` / `render()` / `renderDay()` / `renderMonth()` / `renderYear()` / `open()` / `close()` into ds.js would make this a reusable widget. Documented at `docs/components/date-picker.html` with **6 sections** (Default / Variants / States / Interactive / Full matrix / API). The Full matrix at the bottom is a 3×5 grid — cell states (Default / Hover / Active / In-range / Disabled) applied to all three cell types (Day / Month / Year) — with em-dashes for the in-range column on Month + Year (not applicable). NAV entry promoted from `stub: true` to documented; SEARCH index extended with 6 section anchors + 10 token entries. Stub count drops from 14 to 13. Dark mode is Figma-verified out of the gate (no Known Issue carries forward).

## v2.20.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Badge — full documentation (3 variants × 3 sizes × 7 colours), Tabs `.tab-badge` refactored to compose with Badge tokens
**Description:** New `.badge` component documented 1:1 from the Base-AI Figma library (light nodes 123-2217 + 123-2267, dark nodes 5897-1277 + 5897-1222). Tiny status / count indicator — sized 4–12 px. **Three structural variants**: `.badge-dot` (solid coloured disc, no content — use as an inline status marker with `aria-label`), `.badge-label` (auto-width pill containing 1–4 digits of count text at 6px Inter Semi Bold), `.badge-verify` (fills with an SVG check-mark icon, typically pairs with `.badge-info` for "Verified" status). **Three sizes** for dot + verify: `.badge-sm` (4×4), default `md` (8×8), `.badge-lg` (12×12). Label badges always render at 12px tall — width auto-fits the digit count. **Seven semantic colours** matching Snackbar's intent palette (Brand · Info · Danger · Success · Warning · Notice · Alert). Brand inverts in dark mode (white tile + dark text) so it stays readable on the dark page surface — the same pattern Black-Tag uses. The other six colours keep the same vivid bg + white text in both modes. **1px halo border** separates the badge from whatever surface it sits on — white halo in light, `#1C1C1C` (page bg) halo in dark — so the badge reads as a "punched-out" disc on any host element. **Composition helper `.badge-pin`** anchors any badge at `top: -4px; right: -4px` of an inline-block parent (button, avatar, tab, nav icon). 21 new `--badge-*` tokens × light + dark = 42 total. Documented at `docs/components/badge.html` with 7 sections (Default / Variants / Sizes / Colors / Composition / Full matrix / API). Full matrix is 7 colours × 6 rows (3 dot sizes + 4 label widths, with one row dropped to keep the grid even) = 42 cells. **Tabs refactored**: the `.tab-badge` inline helper added in v2.18.0 with theme-aware `--color-heading`/`--color-bg` inversion is now an alias that composes with the canonical `--badge-brand-*` tokens. Existing tab markup keeps working unchanged — same visual treatment, but the colour values now flow through the proper Badge token group instead of leaning on semantic page tokens. NAV entry promoted from `stub: true` to documented; SEARCH index extended with 7 section anchors + 21 token entries. Stub count drops from 15 to 14.

## v2.19.5 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Snackbar Positions section — triggers fire Info Filled (was Brand Semi) and the buttons restyle to preview what they'll fire
**Description:** The Positions section demonstrated stacking + anchoring with Brand semi-filled toasts. Switched to **Info Filled** (blue background, white text) per request — easier to see against any of the six viewport corners and consistent with the kind of confirmation toast most apps anchor to a position. The 6 position-trigger buttons now also restyle inline via the same token-lookup pattern the Variants section uses — reads `--snackbar-info-deep` for the button bg + border and `--snackbar-info-filled-text` for the button text via `getComputedStyle()`. Wrapped in `restylePositionTriggers()`; runs on page load and re-runs whenever `<html>` `data-theme` flips (via `MutationObserver`) so the previews track light/dark exactly like the Variants triggers do. Section's intro paragraph updated to mention the change. The `fireSnackbar()` call passes `variant: 'snackbar-info'` + `state: 'snackbar-filled'`. No CSS or token changes — purely page script.

## v2.19.4 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Snackbar — adds `box-shadow: var(--shadow-3)` to the base rule
**Description:** Single-line addition on `.snackbar` to lift the toast off any surface, matching the elevation language the Dropdown panel uses. Picks up the per-theme shadow automatically — light mode renders the subtle `0 4px 16px 4px rgba(0,0,0,0.06)` drop; dark mode renders the deeper `0 4px 16px 4px rgba(0,0,0,0.30)` drop (set in v2.17.0's black-shadow audit). Every snackbar everywhere — Default, Variants, States, Interactive, Positions, Full matrix — now reads as a proper floating notification rather than a flat inline block.

## v2.19.3 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Snackbar dark Semi backgrounds — rgba transparent tints → solid dark colours (matches light-mode pattern)
**Description:** Six dark-mode Semi backgrounds (Info / Danger / Success / Warning / Notice / Alert) were `rgba(variant, 0.20)` transparent tints. Brand was already solid. The transparent values meant the snackbar surface changed appearance depending on what surface it sat over — on the page (`#1C1C1C`) it composited one way; on a `bg-2` demo panel (`#2D2D2D`) it composited differently; in a future card or modal it'd composite differently again. Light mode has always used solid pale colours (`#C3D6FA`, `#FCE4E4`, etc.) — the snackbar surface is predictable regardless of context. Dark mode now matches: each variant gets a solid dark colour, picked at roughly a 20–25% blend of the variant's deep colour over the dark page bg. Values: Info `#212B4D`, Danger `#4A2929`, Success `#224429`, Warning `#4A4119`, Notice `#382E4F`, Alert `#4D341A`. Visual on the page bg is nearly identical to the previous rgba (which composited to similar shades). On other surfaces the snackbar now renders with the same surface it always does — no more "shifts depending on container". Border state semi-rgba tokens are unchanged because borders genuinely benefit from compositing (they're a 1px line; transparency reads as colour-tinted hairline). Filled state tokens unchanged.

## v2.19.2 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Snackbar dark mode — Brand Filled now readable, Brand Semi no longer merges with `--color-bg-2`, other Semi variants lifted from 15% → 20% alpha for visibility
**Description:** Three real bugs in v2.19.0's dark mode caught in review. Root model bug: my CSS hardcoded `color: #FFFFFF` for every Filled variant, but in dark mode `--snackbar-brand-deep` itself is `#FFFFFF` (Brand inverts to white-on-dark) — so Brand Filled rendered as white background with white text. Same problem propagated to the inverted action button (hardcoded white bg + hardcoded white text inside Brand Filled). Fix: introduced a `--snackbar-{v}-filled-text` token per variant (7 × light + 7 × dark = 14 new tokens). Light mode: every variant's filled-text is `#FFFFFF`. Dark mode: Brand inverts to `#2D2D2D`, every other variant stays `#FFFFFF`. CSS now reads `var(--snackbar-{v}-filled-text)` instead of hardcoded `#FFFFFF` in both the snackbar text rule and the action-button bg + border-color rules. Each Filled-state action button is now properly inverted per variant — coloured variants render as a white pill on the snackbar's vivid bg (light + dark), Brand renders as a dark pill on white in dark mode. Second fix: `--snackbar-brand-semi-bg` in dark was `#2D2D2D`, which is the same value as `--color-bg-2` — so Brand Semi-filled toasts blended into every demo panel + matrix container in the docs (and into any `bg-2` surface in real apps). Bumped to `#3D3D3D` so the toast sits one neutral step brighter than the panel under it and lifts off every system surface. Third fix: the other six Semi variants used `rgba(X, 0.15)` over the dark page, which produced barely-tinted dark surfaces. Raised to `rgba(X, 0.20)` — matches the alpha pattern Tag dark uses for outline tints (v2.17.1) and lifts the toast off `--color-bg`. Page-script `restyleTriggers()` in `snackbar.html` updated to read the new `filled-text` token so the variant trigger buttons preview the corrected filled state. CSS rule diff: 7 snackbar Filled rules + 7 action-button rules now read tokens instead of hex literals (was 14 hardcoded `#FFFFFF`, now 14 token references).

## v2.19.1 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Snackbar Interactive section — segmented State toggle + variant triggers preview the snackbar style they'll fire
**Description:** Two demo bugs in the Interactive section, both rooted in v2.19.0 markup mistakes. (1) **State toggle had no visible selected state and rendered as 3 detached pill buttons** — I'd used `.btn-pos-l` / `.btn-pos-m` / `.btn-pos-r` (don't exist) instead of the canonical `.btn-pos-left` / `-middle` / `-right`, and `.is-active` instead of the `.active` / `aria-pressed="true"` pair that `.btn-group-active-border` actually keys off. Fixed the markup + added the `.btn-group-active-border` wrapper class — now the segmented control collapses cleanly, the selected segment shows the transparent-fill + strong-outline treatment (same look the Button Group page documents). (2) **The 7 variant trigger buttons rendered as flat grey `.btn-secondary` regardless of variant or state** — they should preview the snackbar style they'll fire so the user sees the colour + state combination *before* clicking. Solved with a `restyleTriggers()` function in the page script that reads the live `--snackbar-{variant}-deep` / `-semi-bg` / `-border-border` token values via `getComputedStyle()` and writes inline `background` / `color` / `border-color` to each trigger. The same rules the `.snackbar` variant + state CSS uses are applied directly to the `.btn` — Semi: pale bg + deep text; Filled: solid deep bg + white text; Border: page bg + colored hairline + deep text. State toggle clicks call `restyleTriggers()` so flipping Semi → Filled → Border live-re-skins all 7 buttons. A `MutationObserver` on `<html>`'s `data-theme` attribute re-runs the function when the theme toggle flips, so the previews track dark mode too. The fire-snackbar handler is unchanged — the change is purely visual on the trigger buttons.

## v2.19.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Snackbar — full documentation (7 variants × 3 states) + MUI-style interactive demo + 6-position stacking regions
**Description:** New `.snackbar` component documented 1:1 from the Base-AI Figma library (node 161-5424). Inline notification toast — 320px wide × 48px tall, with a leading 24×24 icon, Caption 1 Medium label (truncating), and a trailing actions group that holds an optional `.btn.btn-primary.btn-sm` action button + a `.snackbar-close` × dismiss button. **Seven colour variants** (Brand · Info · Danger · Success · Warning · Notice · Alert) × **three states** (Semi-filled / Filled / Border) = **21 surface combinations**, all matching Figma exactly in light mode. Per-variant tokens use a clean 3-field schema — `--snackbar-{variant}-deep` (the deep colour, used as semi-text + filled-bg + border-text), `--snackbar-{variant}-semi-bg` (pale solid tint), `--snackbar-{variant}-border-border` (10% medium-shade rgba). 21 new tokens per mode = 42 total. **The Filled-state action button inverts via a descendant rule** — white bg + variant deep text — so the same `.btn.btn-primary.btn-sm` markup composes correctly across all three states. **MUI-style interactive demo** per Adesh's spec: the Interactive section ships 7 variant trigger buttons + a 3-state segmented toggle; clicking any variant fires a real toast at top-right with the chosen state, stacks downward, auto-dismisses after 4 seconds, and supports manual dismissal via the × button. **Positions demo** adds 6 viewport-anchor trigger buttons (top-left/center/right + bottom-left/center/right) — each anchors its own `.snackbar-region` (fixed-position container), with bottom regions stacking upward via reverse insertion in the page script's `fireSnackbar()`. Slide-in / slide-out animations via `snackbar-in` / `snackbar-out` keyframes (200ms in, 180ms out). 21 cells in the Full matrix, mirroring Figma 1:1. Documented at `docs/components/snackbar.html` with **7 sections** (Default / Variants / States / Interactive / Positions / Full matrix / API). NAV entry promoted from `stub: true` to documented; SEARCH index extended with 7 section anchors + 21 token entries. Stub count drops from 16 to 15. **Dark mode is best-effort** — Figma dark reference wasn't shared in this batch, so the dark `--snackbar-*` block uses sensible interpretations (vivid filled bgs that read on dark surfaces; 15% rgba semi tints; 20% rgba borders). Flagged as a Known Issue for a future verification pass — same pattern as Tag dark in v2.17.1.

## v2.18.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Tabs — full documentation, both light + dark Figma-verified, with a live interactive demo
**Description:** New `.tab` component documented 1:1 from the Base-AI Figma library (light node 3817-106, dark node 5887-4266). Horizontal navigation row: a `.tabs` container holds N `.tab` buttons, each with a bottom-border that flips from a hairline (10% black/white) in Default/Hover/Disabled to a solid `#2D2D2D` (light) / `#FFFFFF` (dark) when the tab is active. Three sizes — `.tab-lg` (48px, Body 1 16/24 Medium), default `md` (40px, Body 2 14/24 Medium), `.tab-sm` (32px, Caption 1 12/16 Medium). Four states — Default · Hover (native `:hover` + `.is-hover` doc helper) · Active (driven by `aria-selected="true"` preferred, `.is-active` fallback) · Disabled. Optional leading `.tab-icon` (16×16 SVG) and trailing `.tab-badge` (small pill inverted via `--color-heading` / `--color-bg`, will refactor to compose with the Badge component when that page lands). **7 new `--tab-*` tokens** added per mode (previously only 5 existed): `--tab-default-bg`, `--tab-default-border`, `--tab-hover-border`, `--tab-hover-text`, `--tab-active-bg`, `--tab-disabled-bg`, `--tab-disabled-border`. The pre-existing 5 (`--tab-default-text`, `--tab-hover-bg`, `--tab-active-border`, `--tab-active-text`, `--tab-disabled-text`) were already Figma-correct from v2.0.0. Documented at `docs/components/tabs.html` with **5 sections** (Default / Sizes / States / Full matrix / API); skipped Variants since Tabs has no structural variants — only sizes and states. **The Default section is live-interactive**: a 6-line inline script wires the tab buttons to swap `tabpanel`s on click + flip `aria-selected`. The Full matrix at the bottom is 3 sizes × 4 states = 12 cells, static reference. NAV entry promoted from `stub: true` to documented; SEARCH index extended with the 5 section anchors + 12 token entries. Stub count drops from 17 to 16. The dark-mode audit promise from v2.17.0 carries forward — Tabs ships dark-verified out of the gate, no followup needed.

## v2.17.2 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Yellow primitives refreshed from Mode.tokens.json (12 stops) + cascading semantic + component derived tokens + colors.html swatches
**Description:** Color Primitives ZIP delivered an updated Yellow scale — the whole 12-stop ladder shifted from a flat butter/gold tone to a warmer amber→tan→brown ramp. Applied across three layers: (1) **12 primitive tokens** in `:root` (the only primitives that change per mode are 0 — primitives have a single value): Yellow.25 #FFF8D7→#FFFDF0, .50 #FFF3B8→#FFFDEA, .100 #FFED97→#FFFAC5, .200 #FFE35A→#FFF585, .300 #FFDE39→#FFEA46, .400 #FFD91B→#FFDB1B (only +1 hex unit on green channel), .500 #FFD400→#FFC107 (the biggest shift — moves out of "school-bus yellow" into a deeper amber), .600 #E9C200→#E29500 (was a pale gold, now reads as a true amber-brown), .700 #D5B101→#BB6902 (collapsed onto a brown), .800 #C9A700→#985008 (deeper brown), .900 #BD9D00→#7C420B (chocolate-brown), .950 #AB8E00→#482200 (near-black brown). The top end of the scale (50–300) lightened — the bottom end (700–950) darkened and got significantly more brown. (2) **8 cascaded component-token references** updated where the old hex was the literal value of a changed primitive stop: in light mode `--color-warning-text`, `--input-warning-caption`, `--tag-yellow-outline-text` were all #E9C200 (Yellow.600 old) → #E29500 (Yellow.600 new); `--tag-yellow-filled-bg` was #FFD400 (Yellow.500 old) → #FFC107 (Yellow.500 new). In dark mode the same four tokens picked up Yellow.500 #FFD400 → #FFC107, plus `--tag-yellow-filled-bg` ramped from #FFD91B → #FFDB1B (Yellow.400 — 1-unit shift). (3) **Opacity base tokens preserved** — Opacity.Yellow keeps the same `#DFCF13` base across all alpha stops in the new JSON, so `rgba(223,207,19,0.10)` / `0.20` derived tokens (`--color-warning-bg`, `--tag-yellow-outline-bg`, `--tag-yellow-outline-border`) didn't need touching. (4) **`docs/foundation/colors.html`** updated: the 12-swatch primitive Yellow row (line 58) and the `--color-warning-text` semantic-token swatches (line 92) now show the new hexes. (5) `tokens.json` regenerated (370 × light/dark, unchanged token count — values only). Visual impact: see component list in turn output.

## v2.17.1 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag dark-mode tokens now match Figma 5856:4255 1:1 — closes the Known Issue called out in v2.17.0
**Description:** Last piece of the dark-mode audit. Full rewrite of the dark `[data-theme="dark"]` Tag token block. **Outline tokens** (8 colours × 3 fields = 24 surfaces, used by both `.tag-outline` and `.tag-semi` variants): six colours had the wrong bg shade plus wrong alpha (20% — too saturated — instead of Figma's flat 10%); Blue's text + border had been ramped to `#4675EB`/`#6999F1` lighter values when Figma actually uses `#3156DF` (Blue/500); Yellow's text + border were both `#FFD400` when Figma splits them (`#FFD400` text, `#DFCF13` border); Grey's border was `#E7E7E7` (too pale — got lost against the dark page) when Figma specifies `#6D6D6D` (Neutral/500); Black's border was `rgba(255,255,255,0.10)` (matched the bg, so the border was invisible) when Figma specifies `rgba(0,0,0,0.10)` (still invisible, but the intent matches the light "ghost outline" treatment). **Two new Filled overrides**: `--tag-yellow-filled-bg` `#FFD400 → #FFD91B` and `--tag-orange-filled-bg` `#DF7417 → #ED8A19`. Both ramp UP in dark mode — Yellow becomes more saturated (gold-amber), Orange becomes lighter (closer to the warning Alert palette) — for visibility against the dark page surface. The Black Filled inversion (white tile with dark text) was already correct from v2.11.5. Total: 24 dark Outline tokens updated + 2 new dark Filled overrides. Light unchanged. Status closes: the "Tag dark-mode tokens have not been verified against Figma" Known Issue from STATUS.md is removed.

## v2.17.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Dark-mode parity audit across 9 components + black drop shadows + new `--upload-*` token group
**Description:** Batched dark-mode audit against 9 Figma source nodes shared by Adesh in a single message. Result: most components were already Figma-correct (Button 4591-7454, Button Group 5875-39367, Text Input 2371-1792, Text Area 3555-12987, Dropdown 5872-3349, Toggle 3745-361, Options 5837-3332 from v2.16.5). Three concrete deltas had to land in this PATCH-by-payload-but-MINOR-by-scope release: (1) **Checkbox + Radio dark hover/disabled steps corrected** — `--checkbox-bg-hover` and `--radio-bg-hover` `#3D3D3D → #2D2D2D` (Figma uses the same step as the dropdown panel hover); `--checkbox-checked-bg-hover` + `border-hover` and the matching Radio tokens `#E7E7E7 → #D1D1D1` (Figma uses Neutral/200 as the white-tile hover ramp); `--checkbox-checked-bg-disabled` + `border-disabled` and matching Radio tokens `#6D6D6D → #454545` (matches Button Primary disabled). (2) **New `--upload-bg` + `--upload-bg-hover` token group** — Upload Media diverges from Text Input in dark mode (Figma node 3643-23015: Upload sits at `#2D2D2D` with hover at `#3D3D3D`, while Text Input sits at a uniform `#3D3D3D`). Previously `.upload` reused `--input-default-bg` / `--input-hover-bg`, which collapsed onto the wrong shell colour in dark. Added a small dedicated token group (2 tokens × light + dark = 4 entries); in light both reduce to the same value as the equivalent `--input-*` tokens, so light renders identically. (3) **Dark drop shadows replaced from white glow to deep black** — `--shadow-1` through `--shadow-5` in the `[data-theme="dark"]` block were `rgba(255,255,255,X)` with `X` ranging `0.02–0.10`, which created an ambient-light "glow" rather than depth. Figma's source also uses white shadow tokens in dark mode (`Shadow/3/Color = #ffffff0f`), but the industry-standard implementation across Material Design 3, iOS, and Tailwind uses **deep black drop shadows with elevated alpha** to create real elevation on dark surfaces — that's what Adesh asked for and what we ship: `rgba(0,0,0, X)` with `X` stepping `0.15 / 0.20 / 0.30 / 0.35 / 0.40` for shadows 1–5. Toggle thumb shadow also flips from `rgba(255,255,255,0.10)` to `rgba(0,0,0,0.40)` for the same reason. Net effect: every `.dropdown` panel, every elevated card, every popover now has a real drop shadow in dark mode that visibly lifts the element. Total: 1 CSS rule changed (`.upload` background), 14 token values updated, 4 new tokens added. **Tag dark mode was not in the audit batch** — flagging it as a deferred followup since Tag was the original concern but didn't make this URL list.

## v2.16.5 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Options dark-mode tokens now match Figma node 5837:3332. Dropdown inherits the fix.
**Description:** Re-verified the `[data-theme="dark"]` `--options-*` group against the dark-mode Figma reference (node 5837-3332). Three changes: (1) `--options-bg` `#2D2D2D → #1C1C1C` — matches Figma's `Options/Default/Background: #1c1c1c`. In dark mode this equals `--color-bg`, which is also the dropdown panel background, so default rows now blend into the panel (rows are visually invisible until interacted with — the canonical menu UX). (2) `--options-bg-hover` `rgba(255,255,255,0.05)` → solid `#2D2D2D` — matches Figma's `Options/Hover/Background: #2d2d2d`. The dark-mode mental model is the inverse of light: light mode DIMS the row on hover via a 5% black overlay; dark mode LIFTS the row on hover to a solid lighter surface. The solid value sits 17 RGB units brighter than the panel, which is more visible than the 5% white overlay (which only produced ~6 unit difference). (3) `--options-text-disabled` `#B0B0B0 → #888888` — matches Figma's `Options/Disable/Placeholder-text` (Neutral/400). `--options-bg-disabled` (`#3D3D3D`) and the three text tokens (`--options-text`, `--options-text-hover`, `--options-border`) already matched Figma. Light-mode tokens unchanged. Dropdown is unaffected at the CSS level — the panel's `background: var(--color-bg)` already evaluates to `#1C1C1C` in dark, and the chrome (`border`, `shadow-3`, `radius-md`) hasn't changed — but the visual outcome is different because the rows inside now match the panel.

## v2.16.4 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Options Medium — icon size 24 → 16 and typography Body 1 → Body 2 (Figma 98:17811). Fix propagates to Dropdown automatically.
**Description:** Re-verified all three Options sizes against the latest Figma node (98:17811, the canonical Options + Dropdown reference). Default bg already matched Figma's `#FFFFFF`; no token change. Two real bugs in Medium (the default size, so all `.options` without a size modifier were affected): (1) leading + trailing icons were 24×24, Figma specifies **16×16** for Medium; (2) typography was Body 1 (16/24), Figma specifies **Body 2 (14/24)**. Restructured the CSS so the base `.options` rule encodes the Medium spec (16px icons, Body 2 type, 12px horizontal padding) and `.options-lg` explicitly bumps icons back to 24×24 and font to Body 1 (16/24). Small was already correct from v2.16.3. Same icon + typography pattern applies inside Dropdown panels — fix propagates automatically because `.dropdown` just wraps `.options` children. Updated `docs/components/options.html` Sizes-section `.desc` to call out the corrected "24/16/16 px" icon scale and "Body 1 / Body 2 / Caption 1" typography ladder; API rows for the base `.options` rule, `.options-lg`, and "no size class (md)" entry adjusted to match. Visual effect: Medium rows (the most common surface) are now noticeably more compact than v2.12.0–v2.16.3 — same height (40px) but smaller content, exactly as Figma intended.

## v2.16.3 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Options Small — padding + typography now match Figma 1:1
**Description:** Verified `.options-sm` against Figma node 3420:2915 and found three bugs from v2.12.0: (1) horizontal padding `--spacing-xs` (8px) → `--spacing-sm` (12px) — Figma's `px-[var(--spacing\/spacing-sm,12px)]`; (2) font-size `--fs-14` → `--fs-12`; (3) line-height `--lh-20` → `--lh-16` — together Caption 1 (12/16), not Body 3 (14/20) as the docs had claimed. Height (32px) and icon size (16×16) were already correct. The padding inconsistency was the visible bug — lg + md both use 12px horizontally, but sm was 8px, so Small rows looked narrower than the rest at the same content width. The typography swap is the bigger semantic shift: Small Options are 12px text now, matching the rest of the Caption 1 surface across the system. Also updated `docs/components/options.html`: the Sizes-section `.desc` now says "Caption 1 (12/16)" instead of "Body 3 (14/20)" and notes the shared 12px horizontal padding; the API row for `.options-sm` updated to match.

## v2.16.2 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Upload Media — hero glyph swapped from gallery-add to a classic upload arrow-into-tray
**Description:** Per design feedback the empty-state icon now reads as "upload" rather than "image gallery". Replaced the SVG sprite symbol — was a rounded gallery rect with a + circle pinned top-right (`ico-gallery-add`); now a clean two-stroke upload glyph (`ico-upload`): an upward arrow stem + chevron head landing into a 3-side tray (open at top), matching the Lucide/Feather/Heroicons convention. Single sprite definition, renamed id, and all 8 references on the Upload Media page (7 inline `<use>` calls across the Default / Variants / States / Full matrix sections + 1 in the inline page script's `renderEmpty()` HTML string) updated in one pass. Prose mention in the Default section's `.desc` also shifted from "gallery-add icon" to "upload-arrow icon". No CSS, no tokens, no component API changes.

## v2.16.1 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Upload Media — Default demo now opens a real file picker, renders selected files as pills with thumbnail previews, and removes on × click
**Description:** The Default-section `.upload` widget on the Upload Media page is now fully interactive end-to-end. New opt-in attribute `data-upload-interactive` on any `.upload` shell auto-wires it via the inline page script: clicking the Choose-file `.btn` opens a hidden native `<input type="file">`, selected images are read with FileReader and rendered as `.upload-file` pills with **live thumbnail previews** in the `.upload-file-thumb` slot (non-images fall back to the placeholder SVG). The × remove button on each pill actually deletes that file from the selection and re-renders. The 5MB / 3-file limit from Figma is enforced: oversize files are silently skipped, and the Choose button hides once the limit is hit — matching the "After upload (3 files)" state in the Figma matrix. Two new optional attributes documented in the API: `data-upload-max` (integer cap, default 3) and `data-upload-accept` (MIME filter passed through to the picker, e.g. `image/*`). Other demos on the page (Variants / States / Full matrix) stay static as visual references — only widgets with the opt-in attribute become interactive. No CSS changes, no token changes — pure HTML attribute + page script.

## v2.16.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Upload Media — full documentation (4 content variants × 2 states)
**Description:** New `.upload` component documented 1:1 from the Base-AI Figma library (node 3348-6794). Drop-target / file-list surface for picking media — used as the open-state of any "Choose file" or drag-and-drop affordance. **Four content variants × two states = 8 cells**: Empty (hero illustration + CTA), 1 file, 2 files, and 3 files / limit reached (no Choose button), each at Default + Hover. The empty state stacks a 32×32 `.upload-icon` (gallery-add glyph), a Body 2 Semi-Bold heading ("Click to choose file"), a Caption 1 subheading ("Max: 5MB file"), and the primary trigger. The file-list state replaces the hero with a `.upload-files` `<ul>` of `.upload-file` pills (white surface, 24×24 thumb · filename · × remove button) followed by the same Max-caption + optional Choose-file button. **Zero new tokens** — reuses `--input-default-bg / -hover / -border / -label / -placeholder` from Text Input + `--color-bg / --color-border / --color-heading / --color-subheading` for the file pills, all of which already matched Figma's `--upload-media-*` group 1:1 from v2.0.0. **Zero new component CSS for the Choose file button** — composes with the existing `.btn.btn-primary.btn-sm` (32px primary). Documented at `docs/components/upload-media.html` with 5 sections (Default / Variants / States / Full matrix / API); the Sizes section is omitted because Figma exposes only one size (320×240 shell). NAV entry promoted from `stub: true` to documented; SEARCH index extended with the 5 section anchors. Stub count drops from 18 to 17.

## v2.15.3 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Text Area — per-size typography, icon, and padding now match Figma 1:1
**Description:** v2.15.0 shipped all three Text Area sizes sharing Body 2 (14/24) typography and a 16×16 trailing icon — but Figma differentiates the sizes on those exact axes, not on container height. Corrected per the design context for nodes 101:18502 (Large), 101:18520 (Medium), 101:18536 (Small): (1) **Large** — Body 1 (16/24) placeholder, 24×24 trailing icon, 12px symmetric padding. Inset of the absolutely-positioned trailing icon shifts to 12px to match. Inner textarea reserves 32px of right padding. (2) **Medium** (default) — keeps Body 2 (14/24), 16×16 icon, 8/12 padding. (3) **Small** — drops to Caption 1 (12/16), keeps 16×16 icon and 8/12 padding. All three sizes share a 120px starting min-height per Figma's source code — the "size" axis here is typography density, not container height. Removed the previous `.textarea-lg { min-height: 160 }` and `.textarea-sm { min-height: 80 }` rules — they were my interpretation, not the spec. Native vertical resize still works. Updated `docs/components/textarea.html` intro, Sizes-section description, Full-matrix column headers (`Large · 160 → Large · Body 1`, etc.), and API rows to match the corrected size semantics.

## v2.15.2 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Text Area — fix broken native resize + anchor handle to shell bottom-right (Figma parity)
**Description:** Two bugs from v2.15.0 traced to the same root cause — over-constrained flex layout on the shell. (1) Resize broken: the shell had a fixed `height: 120px` and the inner `<textarea>` had `height: 100%`, so the native `resize: vertical` handle was draggable but the textarea couldn't actually grow past its locked parent. Fixed by changing the shell to `min-height` and the textarea to `min-height` for initial size — now the shell grows when the user drags. (2) Resize handle floated near the middle of the shell: the trailing icon was a flex sibling, so the textarea was sized to fill only the space left of the icon — putting the textarea's bottom-right corner (where the browser draws the handle) somewhere inside the shell rather than at the shell's corner. Fixed by restructuring the shell to `position: relative` + block layout, letting the textarea span the shell's full inner width with `padding-right` reserved for the icon, and pulling `.textarea-trailing` out into an absolutely-positioned top-right slot. The native handle now lands precisely at the shell's bottom-right corner, matching Figma's decorative handle position 1:1.

## v2.15.1 — 31 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Text Input — typed text weight medium → regular
**Description:** `.input > input` font-weight dropped from `--fw-medium` (500) to `--fw-regular` (400) per design revision. Affects every native `<input>` inside an `.input` shell across all 3 sizes (lg/md/sm) and all 8 states. Label (`--fw-medium`), caption (`--fw-regular`), OTP cell (`--fw-semibold`), and Text Area placeholder (`--fw-regular`) are unchanged. No token changes.

## v2.15.0 — 31 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Text Area — full documentation, shares wrapper + tokens with Text Input
**Description:** New `.textarea` component documented 1:1 from the Base-AI Figma library (node 101-18519). Multi-line counterpart to Text Input — three sizes (lg 160 / md 120 / sm 80) × eight states (Default · Hover · Focus · Filled · Success · Warning · Error · Disabled) = **24 surface combinations**. The key architectural win: Text Area **reuses the same `.input-field` wrapper, `.input-field-label`, `.input-field-caption`, state modifiers (`.input-field-success/-warning/-error/-disabled`), and the entire `--input-*` token group** from Text Input — Figma's design-token table calls both groups `--text-input-*` for exactly this reason, and my v2.0.0 tokens already covered both. Only the **shell** is new (`.textarea`): taller, `align-items: flex-start` so the trailing icon sits at the top, native `<textarea>` with `resize: vertical` preserved (locked to `resize: none` when disabled), Body 2 typography (14/24) instead of Text Input's Body 1, and a smaller 16×16 trailing icon (kept constant across sizes — it's an affordance, not content). Hover / Focus / Filled handled the same way as Text Input — `:hover`, `:focus-within`, `:has(textarea:not(:placeholder-shown))` — no JS required. Doc helpers `.is-hover` / `.is-focus` / `.is-filled` force visual states at rest for the Full matrix. Variants section shows the three real structural variants: with trailing icon (Figma canonical), without trailing icon, fixed-height (`resize:none`). 6-section page per CLAUDE.md; SEARCH_DOCS extended with section anchors. No token changes — zero new tokens for the second release in a row.

## v2.14.0 — 29 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Text Input — full documentation (3 sizes × 8 states × 3 variants)
**Description:** New `.input` component documented 1:1 from the Base-AI Figma library (node 2260-4637). The largest documented surface so far: **72 combinations** = 3 sizes (lg 48 / md 40 / sm 32) × 8 states (Default · Hover · Focus · Filled · Success · Warning · Error · Disabled) × 3 variants (Default text · Tags · OTP). Markup is a `.input-field` wrapper around a `.input-field-label`, a `.input` shell (flex row with leading icon · native `<input>` · trailing icon), and a `.input-field-caption`. The shell handles Hover, Focus, and Filled states automatically via native `:hover`, `:focus-within`, and `:has(input:not(:placeholder-shown))` — no JS required. Success/Warning/Error only change the caption colour; the input chrome stays neutral so the field never screams. Disabled prefers the native HTML `disabled` attribute and the shell adapts via `:has()`. Tags variant (`.input-tags`) wraps to host `.tag` chips inline with the editable input (recipients pickers, category multi-select). OTP variant (`.input-otp`) renders N single-character cells (verification codes). Doc helpers `.is-hover`, `.is-focus`, `.is-filled` force visual states at rest for the Full matrix (3 sizes × 8 states = 24 cells of the Default variant). All 12 existing `--input-*` tokens (light + dark) already matched Figma 1:1 — no token additions needed. Search index extended with the 6 section anchors + 12 token entries.

## v2.13.0 — 29 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Dropdown — full documentation, Figma-exact panel chrome, alias of .options-menu
**Description:** New `.dropdown` component implemented 1:1 from the Base-AI Figma library (node 144-1623). The Dropdown is the floating panel that wraps one or more `.options` rows — the open state of any select, combobox, or menu trigger. Three Figma-exact corrections to the panel chrome (which previously lived only as `.options-menu`): (1) border-radius `--radius-xs (4px) → --radius-md (8px)`; (2) drop shadow `--shadow-5 (heavy 10% alpha) → --shadow-3 (subtle 6% alpha, matches Figma's "Shadow-3")`; (3) added `gap: var(--spacing-xs)` so rows sit 8px apart instead of touching. No new tokens — reuses `--color-bg`, `--color-border`, `--shadow-3`, `--radius-md`, `--spacing-xxs/xs`. CSS selector is `.dropdown, .options-menu` combined — both names render identically so existing Options-page demos pick up the chrome fixes transparently. Documented at `docs/components/dropdown.html` with 4 sections (Default / Sizes / Composition / API); Sizes section shows the 1/2/3/5/10-option Figma variants in a wrapping grid; Composition shows mixed Tag colors for status menus, a checkmark-style single-select list, and a small-size compact menu. NAV entry promoted from `stub: true` to documented; SEARCH index extended with the page sections.

## v2.12.0 — 29 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Options — sizes (lg/md/sm), Tag composition, Figma-exact tokens
**Description:** Re-implemented Options 1:1 against the Base-AI Figma library (node 3420-2878). Three new things: (1) **3 sizes** — `.options-lg` (48px), default `md` (40px), `.options-sm` (32px). Heights now use `box-sizing: border-box` + explicit `height` so they match Figma symbols exactly. Body 1 (16/24) typography for lg + md; sm drops to Body 3 (14/20). Leading + trailing icons scale with the row (24/24/16 px). (2) **Tag composition** — the trailing slot now demos the real `.tag.tag-grey.tag-outline` chip from the design system instead of the ad-hoc `.opt-tag` helper, which was deleted. Trailing slot's inner gap raised to 8px (spacing-xs) so chevron + tag sit side-by-side cleanly. (3) **Token fixes** — `--options-bg-hover` now `rgba(0,0,0,0.05)` (Figma "Product/Trans-Bg" overlay, composes with any surface) instead of the too-dark `#E7E7E7`; `--options-text-disabled` `#5D5D5D → #6D6D6D` per Figma; dark theme mirrors with `rgba(255,255,255,0.05)`. Also caught + fixed the same `var(--radius-xxs)` typo I had in Tag — it was hitting nothing → sharp corners. Full matrix replaced with the Figma reference: 3 sizes × 3 states = 9 cells, all showing the canonical `[+ icon] Options [⌄] [Label]` pattern. Search index updated with the new Sizes section.

## v2.11.5 — 29 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag — Black Filled visible in dark mode
**Description:** Dark theme didn't override `--tag-black-filled-bg`, so it inherited light's `#2D2D2D` — which is identical to `--color-bg-2` in dark mode. The chip collapsed into the surface and became invisible. Inverted to `#FFFFFF` bg + `#2D2D2D` text in dark theme, mirroring how "Black" is treated as the max-contrast neutral chip in both modes (dark-on-light in light, light-on-dark in dark). Outline + Semi variants were already correct (already used 10% white tint).

## v2.11.4 — 29 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag — fixed 5 broken token names that were silently breaking padding, font, weight, and radius
**Description:** Root cause of all the "size still wrong / padding still wrong" reports: my `.tag` CSS used `var(--space-xs)`, `var(--space-xxs)`, `var(--font-family)`, `var(--font-weight-semibold)`, and `var(--radius-xxs)` — none of which exist in tokens.css. CSS silently dropped each declaration. Actual tokens are `--spacing-xs` (8px), `--spacing-xxs` (4px), `--font-primary`, `--fw-semibold`, and `--radius-xs` (4px — equivalent to Figma's `radius-xxs`). With these fixed, the chip finally renders with the correct horizontal padding (8/4 px), 4px gap between icon and label, Inter at Semi Bold, and 4px rounded corners. The pixel-exact heights from v2.11.2 (32/28/24/20) now actually land — they were correct at the height-property level but bare boxes were collapsing on `padding: 0 0` so the content overflowed/clipped weirdly. Lesson: rerun the scaffold script's token-paste blocks before authoring a new component — would have caught these.

## v2.11.3 — 29 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag — matrix + demos now mirror the Figma reference (icon · label · icon)
**Description:** The Tag CSS supported leading/trailing icon slots from v2.11.0, but the Full matrix and the Variants/Sizes demos were rendering bare "Label" text — so visually they looked anemic next to the Figma source where every chip is `[icon] Label [icon]`. Added an `ico-tag-ph` placeholder square symbol (mirrors Figma's empty icon-swap slot) and wrapped every cell in the Full matrix (24 cells), Variants demo (3 chips), and Sizes demo (4 chips) with leading + trailing icon slots. The docs now read as a 1:1 reference to the Figma library. CSS unchanged — pure documentation fidelity fix.

## v2.11.2 — 29 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag — pixel-exact size heights + Filled border transparent
**Description:** Sizes were 2px tall on every variant because `padding + line-height + border` summed past Figma's symbol heights. Switched `.tag` to `box-sizing: border-box` with explicit `height` per size: lg=32, md=28, sm=24, xs=20 — now matches Figma symbol names 1:1 (`Size=Large (32px)` etc.). Also dropped the colored `border-color` on `.tag-{color}` Filled modifiers — Figma uses transparent border on Filled (`#ffffff00`), my modifiers were overriding the base `transparent` with the bg color. Functionally identical for solid colors but the cascade now reads clean for variant overrides.

## v2.11.1 — 29 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Tag — Figma fidelity fixes (Outline text colors, 4th size, yellow/grey/black corrections)
**Description:** First implementation drifted from Figma on several axes. Fixed: (1) Outline + Semi text color now uses the DARKER filled-bg shade (e.g. blue `#2843CD`) instead of the lighter border shade (`#3156DF`) — matches Figma 1:1 and improves contrast on the 10% tint. (2) Yellow outline border `#E9C200 → #DFCF13` and text `#2D2D2D → #E9C200`. (3) Grey outline bg `rgba(93,93,93,0.10) → rgba(0,0,0,0.10)` (Figma uses 10% black alpha across grey + black). (4) Black outline border `#2D2D2D → rgba(0,0,0,0.10)` (near-invisible border, matches Figma's "ghost outline" treatment). (5) Added missing `.tag-lg` — Figma has 4 sizes (lg/md/sm/xs) not 3; lg uses Body 3 typography with extra vertical padding, sm drops to Caption 1 (12/16), xs drops to Caption 2 (10/12). Icon sizes recalibrated to 16/14/12/10 px to match. Dark mode mirrors the corrected light-mode relationship (text + border both shift one shade lighter).

## v2.11.0 — 29 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Tag component — full documentation
**Description:** New `.tag` component implemented 1:1 from the Base-AI Figma library (node 5296-8782). Inline label chip for status, category, or metadata. Eight colors (blue, red, green, yellow, orange, purple, grey, black) × three variants (Filled, Outline, Semi) × three sizes (md, sm, xs). Filled is the default variant (solid color, white text; yellow is the contrast outlier with dark text); Outline adds a colored 1px border on a 10% tint; Semi keeps the tint and drops the border for softer presence. Optional leading/trailing icon slots (`.tag-leading`, `.tag-trailing`) — inline SVG inherits `currentColor` and scales with size (14/12/10 px). 40 `--tag-*` tokens in light + 24 dark overrides for outline/semi treatments (filled bgs stay vivid against dark surfaces; outline borders/text shift one shade lighter for AA contrast). Documented at `docs/components/tag.html` with 7 sections (Default / Variants / Colors / Sizes / With icons / Full matrix / API); matrix is 8 colors × 3 variants = 24 cells. Third real use of `new-component.js` scaffold. NAV entry promoted from `stub: true` to documented; SEARCH index extended with the page sections + 40 token entries.

## v2.10.0 — 27 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Options component — full documentation
**Description:** New `.options` component implemented 1:1 from the Base-AI Figma library (node 3420-2877). A single selectable row that lives inside an open dropdown / menu — three slots (leading · label · trailing) and three states (default · hover · disabled). Browser-native interactivity via `<button role="option">` / `<a role="option">`. Composes with: `.options-menu` wrapper panel (white surface, `--shadow-5`, `--radius-xs`), inline SVG in leading/trailing slots, `.opt-tag` for trailing labels, `.opt-dot` for "current selection" radio-style indicator. 14 new `--options-*` tokens (light + dark) following the existing per-state-bg/text pattern. Documented at `docs/components/options.html` with 5 sections (Default / Variants / States / Full matrix / API); matrix is 3 content variants × 3 states = 9 cells. Second real use of `new-component.js` scaffold — held up well. NAV entry promoted from `stub: true` to documented; SEARCH index extended with the page sections + 7 token entries.

---

## v2.9.6 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Sidebar auto-scrolls to the active link on every page load
**Description:** Before, the sidebar always opened at `scrollTop: 0`. On any page whose NAV entry is below the visible fold (e.g. Tabs, Link, Pagination, Breadcrumb — anything past ~12 entries on a typical viewport), the active link sat off-screen and users had to manually scroll the sidebar to find their place. Added `scrollSidebarToActive()` in ds.js — runs once in `init()` right after `buildSidebar()`, computes `offsetTop − (clientHeight / 2) + (linkHeight / 2)` so the active link lands roughly centred in the sidebar's scroll viewport, clamps to 0 for links near the top, and sets `sidebar.scrollTop` directly (never touches window/document, so hash-fragment deep links keep working). No-op when there's no `.sidebar` or no `.sb-link.active`.

---

## v2.9.5 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Homepage "Latest Changes" trimmed to the 3 most recent — codified the rule
**Description:** Stripped the oldest 5 cards (v2.6.0 down to v2.2.0) from the Latest Changes grid on `docs/index.html`. Only the 3 most recent releases (currently v2.9.0, v2.8.0, v2.7.0) appear on the homepage now; full history continues to live in `CHANGELOG.md` + `docs/other/changelog.html` reachable via the "View full changelog →" link below the grid. Updated CLAUDE.md versioning rule from "update the cards" to "exactly 3 cards always — add new at top, drop the oldest" so future MINOR/MAJOR releases follow this consistently.

---

## v2.9.4 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Remove orphan legacy Checkbox tokens from tokens.css
**Description:** Cleaned up the legacy `/* Checkbox */` block (light) and its dark-mode mirror that used an older "state-first" naming convention (`--checkbox-unchecked-border`, `--checkbox-checked-icon`, `--checkbox-disabled-bg`) plus a duplicate of `--checkbox-checked-bg`. Zero CSS / JS / HTML references — verified by repo-wide grep before deleting. The canonical Checkbox tokens (`--checkbox-bg`, `--checkbox-border`, `--checkbox-bg-hover`, `--checkbox-bg-disabled`, `--checkbox-checked-bg`, `--checkbox-checked-border`, `--checkbox-checked-glyph`, …) are unchanged and continue to drive `.checkbox` styles. Forward-looking placeholders for stub components (`--link-*`, `--avatar-*`, `--tooltip-*`, `--progress-*`, `--tab-*`) intentionally retained — they use unique names (not duplicates) and will be the canonical tokens when those components are documented. Tokens.json shrinks 335 → 327.

---

## v2.9.3 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Toggle dark-mode tokens corrected to match Figma source (node 3745-361)
**Description:** Five wrong values + one structural gap in the dark-mode toggle tokens. The thumb colour in dark mode is **state-dependent** (white when off/disabled, dark when on — to contrast against the white "on" track) which my single `--toggle-thumb` token couldn't express. Added `--toggle-thumb-on` (light: `#FFFFFF`, dark: `#2D2D2D`) and a new CSS rule that applies it on `:checked:not(:disabled)`. Fixed wrong dark values: `--toggle-bg-disabled` / `--toggle-border-disabled` `#454545` → `#6D6D6D`; `--toggle-checked-bg-hover` / `--toggle-checked-border-hover` `#E7E7E7` → `#FAFAFA`; `--toggle-thumb` `#2D2D2D` → `#FFFFFF` (was wrong because thumb is always white *unless* on). Switched `--toggle-thumb-shadow` in dark mode from `rgba(0,0,0,0.40)` (invisible on dark bg) to `rgba(255,255,255,0.10)` per Figma's white-alpha glow. Tokens.json regenerated; SEARCH_TOKENS now includes `--toggle-thumb-on`.

---

## v2.9.2 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Toggle thumb visually centred — shadow was creating perceived low offset
**Description:** v2.9.1 fixed the geometric centring (2px above + 2px below the thumb at md size) but the thumb still read as "sitting low" because `--toggle-thumb-shadow` was pulling `--shadow-5` — a card-level shadow with Y-offset 4px, 16px blur, 4px spread. On a 16-20px circle, that shadow extends ~22px below the thumb (way past the track's bottom edge) and only blurs slightly above it. The asymmetric vertical mass made the eye perceive the thumb as low, even though geometry was correct. Replaced with a tight component-appropriate shadow: `0 1px 3px rgba(0,0,0,0.15)` in light, `0 1px 3px rgba(0,0,0,0.40)` in dark. Thumb now reads centred at every size.

---

## v2.9.1 — 26 May 2026
### Type: PATCH
### Updated by: Adesh Singh
**What changed:** Fix Toggle thumb vertical misalignment
**Description:** The v2.9.0 toggle track had `border: 1px solid var(--toggle-border)` plus `box-sizing: border-box`. Absolute positioning measures `top` from the padding edge (inside the border), so `top: 2px` placed the thumb 3px below the outer top and only 1px above the outer bottom — visibly low by 2px. Every Figma state has the border either transparent or the same colour as the bg, so the border added zero visual value while breaking centering. Removed the border + box-sizing from `.toggle-track`, dropped `border-color` from all the state transitions, and adjusted the checked-state translateX to drop the `− 2px` it was using to compensate for the (now-gone) border. Thumb is now perfectly centered at every size.

---

## v2.9.0 — 26 May 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Toggle Switch component — full documentation, three sizes, scaffold-script dogfood
**Description:** New `.toggle` component implemented 1:1 from the Base-AI Figma library (node 105-1723). Label wrapper + visually-hidden native `<input type="checkbox">` + `.toggle-track` pill + `.toggle-thumb` knob that translates via CSS when `:checked`. Three sizes via CSS custom properties: `.toggle-sm` (28×16), default `.toggle` (36×20), `.toggle-lg` (44×24) — track height, thumb size, and slide distance all scale together; full pill radius on every size. **First real use of `docs/scripts/new-component.js`** (shipped v2.8.0) — generated the HTML skeleton and printed the paste-blocks for tokens / CSS / ds.js. Added 14 `--toggle-*` tokens (light + dark) reusing `--shadow-5` for the thumb drop-shadow. Documented at `docs/components/toggle.html` with 6 sections (Default / Variants / Sizes / States / Full matrix / API); matrix is 3 sizes × 3 states × 2 variants = 18 cells matching Figma exactly. SEARCH index extended (page promoted to documented + 14 token entries).

---

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

## v2.30.0 — 1 June 2026
### Type: MINOR
### Updated by: Adesh Singh
**What changed:** Slider fully documented — Single and Range variants, live interactive demo, 4 new tokens. Slider was the last Inputs stub; only Rating remains.
**Description:** 1:1 with Figma nodes 5877-41490 + 147-5057 (light) + 5967-1515 + 5967-1479 (dark). New `.slider-field` wrapper with `.slider` (native `<input type="range">`), `.slider-tip` (pill tooltip above), and `.slider-val` (label below). Track: 4 px, radius-full. Thumb: 16 px circle, `--slider-fill` bg, 2 px `--color-bg` halo border. Fill gradient uses a `--pct` CSS custom property set by JS. Range variant (`.slider-range`) stacks two overlapping inputs; `--pct-a` / `--pct-b` drive the between-thumbs fill on `.slider-a`. JS helper (`data-slider` / `data-slider-range` attributes auto-init on `DOMContentLoaded`): computes thumb centre as `pct * (offsetWidth - 16) + 8` px for pixel-accurate tooltip/label positioning; enforces min ≤ max constraint. 4 new tokens: `--slider-track-bg` (rgba 10% alpha), `--slider-fill` (#2D2D2D light / #FFFFFF dark), `--slider-tip-bg` (inverts like Tooltip), `--slider-tip-text` (#FFFFFF light / #1C1C1C dark). tokens.json regenerated. STATUS updated: "slider" removed from pending stubs; only "rating" remains.

