# Tabs — Component Rules

**Page:** `docs/components/tabs.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.18.0

## Token prefix
`--tab-*` — active bg, active border, active text, hover bg, inactive text.

## CSS classes
- Wrapper: `.tabs`
- Individual tab: `.tab`
- Active state: `.tab.active` (set by JS or static HTML)
- Icon: `.tab-icon` — scales with tab size
- Badge: use `.badge.badge-label.badge-brand` — NOT `.tab-badge` (removed v2.20.0)

## Page sections (h2 IDs)
`default`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Tab badges MUST use the `.badge` component — `.tab-badge` was removed in v2.20.0. If you see `.tab-badge` anywhere, replace it.
- Active indicator is `border-bottom` on the tab — not a separate element.
- Tabs use `role="tablist"` and `role="tab"` with `aria-selected` for accessibility.
- Do not implement tab panel switching with JS on the component page — the demo shows static active states only.
