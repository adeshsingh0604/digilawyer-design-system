# DigiLawyer Design System — TODO

*Last reconciled against actual repo state: 16 July 2026 (v2.53.1).*

## 🔁 Recurring Process

- [ ] Bump version and update CHANGELOG.md after every significant update following semantic versioning rules (MAJOR.MINOR.PATCH — see CHANGELOG.md header for rules). Use `node docs/scripts/bump-version.js` — it handles CHANGELOG.md, changelog.html, STATUS.md's version header, and index.html's Latest Changes cards automatically.
- [ ] **Update STATUS.md's and CLAUDE.md's body prose by hand after any milestone.** The bump script only touches the version number and date — it does not rewrite "What is Built" / "Current State" text. Both drifted for ~40 versions before this was caught (16 July 2026 cleanup).

---

## ✅ Done (verified against code, not just claimed)

- Doc site: all 25 components + 6 foundation pages fully documented, 0 stubs.
- React library: all 25 components implemented, `react_status: "done"` in `components-manifest.json` for every entry.
- Storybook: live and deployed to GitHub Pages, not a placeholder.
- React/Figma Code Connect readiness blockers (the 9 findings in `DESIGN.md → React & Figma Code Connect Readiness`, audited at v2.31.7): all resolved. Entry point, token imports, and CSS token usage were fixed; the architecture now has React consume `docs/shared/{tokens,components}.css` directly via `react/src/styles.css` rather than duplicating hex values per component.
- Token gaps once listed here (tag, alert/snackbar, progress bar) are populated in `tokens.css`.

## 🟡 Genuinely open

### Figma Code Connect
- [ ] Actual Code Connect mapping files (`.figma.tsx`) between Figma components and the React library — the *readiness* blockers are fixed, but the mapping itself hasn't been built yet.

### Search
- [ ] Fuzzy search across token names and component names in sidebar (current search is substring-only)
- [ ] Search shortcut (Cmd+K / Ctrl+K) opens command palette — not implemented

### Print Styles
- [ ] No `@media print` rules exist anywhere in `docs/shared/` — sidebar/TOC would print as-is

### Keyboard & Accessibility
- [ ] No `aria-current="page"` on the active sidebar link
- [ ] Keyboard navigation through sidebar links (arrow keys) — not implemented
- [ ] Skip-to-content link — not implemented
- [ ] WCAG 2.1 AA contrast pass on interactive demo elements — not verified either way

### Developer Experience
- [ ] Per-page card CSS duplication across `radius.html`, `shadows.html`, `grid.html`, `index.html` (`.rad-card`, `.sh-card`, `.bp-card`, `.qlink-card` are structurally identical) — flagged in CLAUDE.md "Deferred cleanups", still unaddressed
- [ ] `docs/scripts/sync-changelog.js` — CHANGELOG.md and changelog.html are still hand-kept-in-sync per edit; a script to generate one from the other doesn't exist yet
