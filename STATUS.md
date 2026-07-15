# DigiLawyer Design System — Status

## Current Version
v2.53.1

## Last Updated
19 June 2026

## What is Built
- docs/shared/tokens.css — full token architecture
- docs/shared/layout.css — page layout, sidebar structure
- docs/shared/components.css — all shared component styles
- docs/shared/ds.js — sidebar + auto-TOC + theme persistence + scroll-spy + diagnostics
- docs/scripts/migrate-stubs.js — idempotent stub migration helper
- docs/starters/component.html — minimal stub template
- docs/starters/foundation.html — minimal documented-page template
- docs/index.html — overview (v2.3 shell, explicit toc for h1 anchor)
- docs/foundation/colors.html — full documentation (v2.3 shell, explicit toc for h3 anchors)
- docs/foundation/typography.html — full documentation (v2.3 shell, auto-TOC)
- docs/foundation/spacing.html — full documentation (v2.3 shell, auto-TOC)
- docs/foundation/radius.html — full documentation (v2.3 shell, auto-TOC)
- docs/foundation/shadows.html — full documentation (v2.3 shell, auto-TOC)
- docs/foundation/grid.html — full documentation (v2.3 shell, auto-TOC)
- docs/components/button.html — full documentation (v2.3 shell, auto-TOC)
- docs/components/button-group.html — full documentation (v2.4 component)
- docs/components/checkbox.html — full documentation (v2.5 component)
- docs/components/radio.html — full documentation (v2.7 component)
- docs/components/toggle.html — full documentation (v2.9 component)
- docs/components/options.html — full documentation (v2.10 component, v2.12 sizes + Tag composition)
- docs/components/tag.html — full documentation (v2.11 component, v2.11.1+2 Figma-fidelity fixes)
- docs/components/dropdown.html — full documentation (v2.13 component, aliases .options-menu)
- docs/components/input.html — full documentation (v2.14 component, 3 sizes × 8 states × 3 variants)
- docs/components/textarea.html — full documentation (v2.15 component, reuses .input-field wrapper + tokens)
- docs/components/upload-media.html — full documentation (v2.16 component, reuses .input-field + composes .btn)
- docs/components/tabs.html — full documentation (v2.18 component, both light + dark Figma-verified, live interactive demo)
- docs/components/snackbar.html — full documentation (v2.19 component, 7 variants × 3 states, MUI-style interactive demo + 6 positions)
- docs/components/badge.html — full documentation (v2.20 component, 3 variants × 3 sizes × 7 colours, light + dark Figma-verified)
- docs/components/date-picker.html — full documentation (v2.21 component, 4 variants + 5 states, live demo wires Text Input → calendar)
- docs/components/progress-bar.html — full documentation (v2.22 component, 7 colours × 2 sizes + indeterminate, light + dark Figma-verified, live ramp/colour/size demo)
- docs/components/table.html — full documentation (v2.23 component, .table + .table-wrap + .table-cell + .table-cell-action; utility classes .table-cell-end / .td-num; light + dark Figma-verified)
- docs/components/link.html — full documentation (v2.24 component, 3 variants × 4 sizes × 3 states + .link-icon + .link-underline; 7 --link-* tokens × 2 modes; light + dark Figma-verified)
- docs/components/pagination.html — full documentation (v2.25 component, 3 sizes + .btn-square + .pagination-ellipsis; zero new tokens — composes entirely with Button; light + dark Figma-verified)
- docs/components/breadcrumb.html — full documentation (v2.26 component, 3 separator variants × 2 sizes; zero new tokens — composes with --color-subheading + --color-heading; light + dark Figma-verified)
- docs/components/avatar.html — full documentation (v2.27 component, Icon/Initials/Image × 4 sizes + Badge composition via .avatar-stack/.avatar-pin-*/.avatar-status; 5 --avatar-* tokens; light + dark Figma-verified)
- docs/components/tooltip.html — full documentation (v2.28 component, 3 sizes × 4 positions; inverts in dark mode; 3 --tooltip-* tokens; light + dark Figma-verified)
- docs/components/slider.html — full documentation (v2.30 component, single + range variants; live JS demo; 4 --slider-* tokens; light + dark Figma-verified)
- docs/components/alert.html — full documentation (v2.29 component, replaces "Notification"; 7 colours × 3 variants (semi/filled/border); 70 --alert-* tokens; light + dark Figma-verified)
- docs/components/rating.html — full documentation (v2.31 component, Star + Heart shapes; 3 fill states × 3 sizes × 3 colours; data-interactive hover-preview + click-to-rate; 4 --rating-* tokens; light + dark Figma-verified)
- docs/other/changelog.html — full with filter bar (v2.3 shell, auto-TOC)
- CHANGELOG.md — version history through v2.3.0
- README.md — project overview, setup, contribution guide
- TODO.md — prioritised task list
- CLAUDE.md — updated for v2.3 lean workflow
- DESIGN.md — full architecture guide for new developers
- react/README.md — React/Figma Code Connect readiness audit (9 actionable findings)

## What is Built (as of v2.53.1 — updated 16 July 2026)

Everything above (through Rating, v2.31) plus:
- **React component library — all 25 components implemented** (`react/src/components/`), `react_status: "done"` for every entry in `components-manifest.json`. Consumes tokens via `react/src/tokens/index.js` and styles via `react/src/styles.css`, which imports `docs/shared/{tokens,components}.css` directly.
- **Storybook** — configured at `react/.storybook/`, deployed to GitHub Pages at the URL in `components-manifest.json`'s `storybook_base` field. The old `react/README.md` audit (9 readiness findings) is fully resolved; see `DESIGN.md → React & Figma Code Connect Readiness` for the historical record.
- **Responsive design** — 3 phases (v2.51–v2.53): CSS utilities (`components.css`), Storybook viewport presets (390/744/1440) + Responsive stories for 5 components, and `.rsp-phone` demo frames in 5 HTML docs pages.
- **Canary protocol** (v2.53.1) — `CLAUDE.md` requires stating the canary value from `components-manifest.json` at the start of any AI session touching this repo.

## What is Pending
- Actual Figma Code Connect mapping files (`.figma.tsx`) between Figma components and the React library — the *readiness* blockers are fixed, the mapping itself isn't built yet.
- See `TODO.md` for the full reconciled open-items list (search, print styles, keyboard/a11y, per-page card CSS consolidation).

## Removed Components
- Notification → renamed to **Alert** (see docs/components/alert.html, v2.29.0)
- Accordion, List Group, Images — removed from project scope

## Known Issues
- None.

## Next Priority
- Portfolio case study — the design system is complete and is the flagship piece.
- Optional: Figma Code Connect mapping implementation, per-page card CSS consolidation (see CLAUDE.md "Deferred cleanups"), TODO.md's low-priority a11y/search/print items.

## Versioning Reference
MAJOR: breaking token changes, full restructure
MINOR: new component fully documented, new token group, infrastructure
PATCH: bug fix, content update, token correction

## Maintenance note
`node docs/scripts/bump-version.js` only updates the version number and date at the top of this file — it does **not** rewrite the "What is Built" / "What is Pending" sections. Those are hand-maintained and drifted for ~40 versions (frozen at v2.31 language while the header ticked up to v2.53.1) before this was caught and corrected 16 July 2026. Update this section by hand at real milestones — don't trust it just because the version number above looks current.
