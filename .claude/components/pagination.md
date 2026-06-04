# Pagination — Component Rules

**Page:** `docs/components/pagination.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.25.0

## Token prefix
No new tokens — composes entirely with `.btn` and `--btn-*` tokens.

## CSS classes
- Wrapper: `.pagination`
- Pages use: `.btn.btn-square` (equal width/height button variant)
- Active page: `.btn.btn-primary` (or equivalent active state)
- Ellipsis: `.pagination-ellipsis`
- Prev/Next: standard `.btn` with arrow icons

## Page sections (h2 IDs)
`default`, `sizes`, `states`, `api`

## Rules
- Zero new tokens — if you're about to add `--pagination-*` tokens, stop and use `--btn-*` instead.
- `.btn-square` is defined in the Button component — do not redefine it in Pagination.
- Ellipsis (`.pagination-ellipsis`) is a non-interactive text element — never make it a button.
- Three sizes inherit from Button sizes (`btn-lg`, `btn-md`, `btn-sm`).
- Prev/Next buttons use arrow icons from the ds.js SVG sprite — do not inline SVGs directly.
