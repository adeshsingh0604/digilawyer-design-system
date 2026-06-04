# Link — Component Rules

**Page:** `docs/components/link.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.24.0

## Token prefix
`--link-default-text`, `--link-default-hover`, `--link-blue-text`, `--link-blue-hover`, `--link-brand-text`, `--link-brand-hover`, `--link-disabled-text` — 7 tokens.

## CSS classes
- Base: `.link`
- Variants: `.link-default`, `.link-blue`, `.link-brand`
- Sizes: `.link-xl`, `.link-lg`, `.link-md` (default), `.link-sm`
- Icon: `.link-icon` — scales with size
- Underline modifier: `.link-underline` — always shows underline

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `api`

## Rules
- Three variants: default (inherits text colour), blue (brand blue), brand (gold accent). Do not add more.
- Underline is shown on hover by default — `.link-underline` forces it always visible.
- Disabled state uses `pointer-events: none` + `--link-disabled-text` — never use the HTML `disabled` attribute on `<a>`.
- Link is inline — it flows with text. Do not add `display: block` to the base `.link` class.
- Icon scales with size modifier using `font-size`-relative sizing — do not use fixed pixel widths.
