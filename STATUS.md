# DigiLawyer Design System — Status

## Current Version
v2.50.0

## Last Updated
14 June 2026

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

## What is Pending
- **0 component stubs** — all planned components are now fully documented. 🎉
- React/Figma Code Connect implementation (9 findings from react/README.md audit)

## Removed Components
- Notification → renamed to **Alert** (see docs/components/alert.html, v2.29.0)
- Accordion, List Group, Images — removed from project scope

## Known Issues
- None.

## Next Priority
- **System is complete** — all planned components are documented and DESIGN.md is written.
- Optional future work: React/Figma Code Connect implementation (see react/README.md for 9 findings), Storybook integration, per-page card CSS consolidation (see CLAUDE.md "Deferred cleanups").

## Versioning Reference
MAJOR: breaking token changes, full restructure
MINOR: new component fully documented, new token group, infrastructure
PATCH: bug fix, content update, token correction
Next PATCH → v2.31.8
Next MINOR → v2.32.0
