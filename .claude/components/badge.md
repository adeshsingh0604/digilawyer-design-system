# Badge — Component Rules

**Page:** `docs/components/badge.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.20.0

## Token prefix
`--badge-*` — 7 colours × 3 fields (bg, text, border) = 21 tokens per mode = 42 total.

## CSS classes
- Base: `.badge`
- Types: `.badge-label` (pill with text), `.badge-dot` (small dot), `.badge-verify` (checkmark icon)
- Colours: `.badge-brand`, `.badge-info`, `.badge-success`, `.badge-warning`, `.badge-danger`, `.badge-notice`, `.badge-neutral`
- Sizes: `.badge-lg`, `.badge-md` (default), `.badge-sm`

## Page sections (h2 IDs)
`default`, `types`, `colors`, `sizes`, `composition`, `api`

## Rules
- Badge was introduced in v2.20.0 and replaced the inline `.tab-badge` pattern in Tabs. If you see `.tab-badge` anywhere, replace it with `.badge.badge-label.badge-brand`.
- `.badge-dot` has no text — it is a pure visual indicator. Do not put text inside it.
- Badge composes with Avatar (via `.avatar-pin-*`), Button, and Tabs — any size changes must be checked against all three.
- Seven colours match the Alert and Snackbar colour systems — keep them consistent.
