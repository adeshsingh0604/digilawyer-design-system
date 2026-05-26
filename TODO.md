# DigiLawyer Design System — TODO

## 🔁 Recurring Process

- [ ] Bump version and update CHANGELOG.md after every significant update following semantic versioning rules (MAJOR.MINOR.PATCH — see CHANGELOG.md header for rules)
- [ ] Keep `docs/other/changelog.html` and `CHANGELOG.md` in sync after every version bump — add the same entry to both files
- [ ] Update the "Latest Changes" cards on `index.html` after every MINOR or MAJOR version bump (replace oldest placeholder card with the new entry)

---

## 🔴 High Priority

### Component Documentation
- [ ] Input — document default, hover, focus, filled, error, disabled states; validation captions
- [ ] Text Area — document resize behavior, character count, all states
- [ ] Checkbox — document unchecked, checked, indeterminate, disabled; group layout
- [ ] Radio Button — document single and group behavior, all states
- [ ] Toggle Switch — document on/off/disabled states with live demo
- [ ] Dropdown — document single-select, multi-select, search variant, all states
- [ ] Tabs — document horizontal tabs, active/hover/disabled states, sizes
- [ ] Tag — document filled and outlined variants, all color options, sizes
- [ ] Badge — document numerical and dot variants, positioning on avatars
- [ ] Avatar — document image, initials, and fallback variants; all sizes
- [ ] Tooltip — document all four positions (top, right, bottom, left), delay behavior
- [ ] Progress Bar — document determinate and indeterminate states, color variants
- [ ] Notification — document info/success/warning/danger types, with/without action
- [ ] Snackbar — document transient behavior, position, with/without action button
- [ ] Accordion — document single-open and multi-open modes, animation
- [ ] Table — document basic, sortable, selectable rows, with row actions
- [ ] Pagination — document page number, prev/next, truncation, sizes
- [ ] Breadcrumb — document default and truncated variants
- [ ] Link — document default/blue/brand variants and all states

### Foundation Gaps
- [x] Radius — visual showcase with all 7 tokens, component usage examples, and token reference table
- [x] Shadows — live shadow demos for both light and dark mode, elevation guide, token reference

### Token Gaps
- [ ] Add tag component tokens (`--tag-*`) to `docs/shared/tokens.css` with dark mode values
- [ ] Add notification/snackbar tokens once component design is finalized
- [ ] Add progress bar size tokens (height per size variant)

---

## 🟡 Medium Priority

### Add Real Demos
- [ ] Checkbox — interactive checked/unchecked state toggling in demo panel
- [ ] Toggle Switch — clickable toggle with live state change in demo
- [ ] Tabs — functional tab switching in demo panel
- [ ] Accordion — expand/collapse animation in demo panel
- [ ] Dropdown — functional open/close in demo panel (no external deps)
- [ ] Notification — dismissable demo with close button
- [ ] Snackbar — timed auto-dismiss demo

### Responsive Behavior
- [ ] Sidebar collapses to hamburger menu below 1024px
- [ ] TOC hides below 1200px; main content takes full width
- [ ] Foundation pages (colors, typography) reflow for mobile viewports
- [ ] Button matrix scrolls horizontally on narrow screens (already partially done)

---

### Fixed (2026-05-17)
- [x] Sidebar restructured into 5 categories (Foundation, Inputs, Data Display, Feedback, Navigation) matching MUI's sidebar style — all 35 pages updated automatically
- [x] `.sb-link-stub` style added to `layout.css` — 7 missing components shown muted and non-clickable
- [x] 8 new stub pages created: Button Group, Upload Media, Slider, Rating, Date Picker, Options, List Group, Images
- [ ] Create full documentation for all sb-link-stub components (Upload Media, Slider, Rating, Date Picker, Options, List Group, Images)
- [x] radius.html — rebuilt as full page with visual showcase and component usage examples
- [x] shadows.html — rebuilt as full page with light/dark side-by-side demos
- [x] colors.html — Status table now shows bg and text swatches for both light and dark
- [x] colors.html — Button Tokens table expanded to all 5 variants with all token rows
- [x] typography.html — Font Sizes section added with live text preview at each size
- [x] spacing.html — "Use case" column header updated to "Use case (optional)"
- [x] components.css — `.btn-tertiary:hover` now includes `border-color` to stay visible
- [x] components.css — Demo panel background changed from `color-bg-2` to `color-bg` so tertiary/ghost hover states are visible

---

## 🟢 Low Priority

### Search
- [ ] Add fuzzy search across token names and component names in sidebar
- [ ] Search shortcut (Cmd+K / Ctrl+K) opens command palette

### Print Styles
- [ ] Hide sidebar and TOC in print; show only main content
- [ ] Ensure code blocks wrap correctly in print layout
- [ ] Add page breaks between major sections

### Keyboard & Accessibility
- [ ] Keyboard navigation through sidebar links (arrow keys)
- [ ] Skip-to-content link at top of each page
- [ ] Ensure all demo interactive elements pass WCAG 2.1 AA contrast
- [ ] Add `aria-current="page"` to active sidebar link

### Developer Experience
- [ ] Add a `shared/main.js` to consolidate common JS (theme toggle, copy, TOC) — currently inline per page
- [ ] Generate a `tokens.json` export from `tokens.css` for design tool sync
- [ ] Add changelog page tracking token and component updates

---

*Generated: 2026-05-16 | DigiLawyer DS v2.0*
