# Breadcrumb — Component Rules

**Page:** `docs/components/breadcrumb.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.26.0

## Token prefix
No new tokens — uses `--color-subheading` (inactive items) and `--color-heading` (active/current item).

## CSS classes
- Wrapper: `.breadcrumb`
- Item: `.breadcrumb-item`
- Active (current page): `.breadcrumb-item.active`
- Separator variants: `.breadcrumb-slash` (/), `.breadcrumb-arrow` (›), `.breadcrumb-dot` (·)
- Sizes: `.breadcrumb-lg`, `.breadcrumb-md` (default), `.breadcrumb-sm`

## Page sections (h2 IDs)
`default`, `separators`, `sizes`, `api`

## Rules
- Zero new tokens — if you're about to add `--breadcrumb-*` tokens, stop and use the semantic colour tokens.
- Three separator variants: slash, arrow, dot. Separator is added via CSS `::before` on `.breadcrumb-item` — not an HTML element.
- Current/active item is NOT a link — it is `<span>` or `aria-current="page"`.
- Breadcrumb is always horizontal — never add vertical layout.
- Two sizes only: lg and sm, plus default md. Do not add xs or xl.
