# DigiLawyer Design System — Status

## Current Version
v2.8.0

## Last Updated
22 May 2026

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
- docs/other/changelog.html — full with filter bar (v2.3 shell, auto-TOC)
- CHANGELOG.md — version history through v2.3.0
- README.md — project overview, setup, contribution guide
- TODO.md — prioritised task list
- CLAUDE.md — updated for v2.3 lean workflow

## What is Pending
- 24 component stubs — all on the v2.3 lean shell, need real documentation:
  toggle, dropdown, input, textarea,
  upload-media, slider, rating, date-picker, options,
  avatar, badge, tag, table, accordion, list-group,
  images, notification, snackbar, tooltip, progress-bar,
  tabs, link, pagination, breadcrumb
- DESIGN.md — not yet created

## Known Issues
- None currently

## Next Priority
1. Document Toggle Switch next (sibling input control — same a11y pattern, fast follow). Then move to text-entry controls: Text Input → Text Area → Dropdown.
2. Or: GitHub setup so the team can pull the system (still pending from day one).
3. Optional cleanups (see CLAUDE.md "Deferred cleanups"): consolidate per-page card CSS; auto-sync changelog files.

## Versioning Reference
MAJOR: breaking token changes, full restructure
MINOR: new component fully documented, new token group, infrastructure
PATCH: bug fix, content update, token correction
Next PATCH → v2.8.1
Next MINOR → v2.9.0
