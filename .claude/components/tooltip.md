# Tooltip — Component Rules

**Page:** `docs/components/tooltip.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.28.0

## Token prefix
`--tooltip-bg`, `--tooltip-text`, `--tooltip-border` — 3 tokens.

## CSS classes
- Base: `.tooltip`
- Positions: `.tooltip-top`, `.tooltip-bottom`, `.tooltip-right`, `.tooltip-left`
- Sizes: `.tooltip-lg` (40px, default), `.tooltip-md` (32px), `.tooltip-sm` (24px)
- Icon slot: `.tooltip-icon`
- Host wrapper (interactive): `.tooltip-host`

## Figma nodes
Light: 140-7707 | Dark: 2289-4036

## Rules
- Tooltip INVERTS between modes: dark pill on light page, light pill on dark page. This is intentional — do not "fix" it.
- Arrow caret uses `::before` (border triangle, 1px larger) + `::after` (fill triangle) — the border follows the caret tip.
- `.tooltip-host` wrapper enables hover-show without JavaScript: `opacity: 0` at rest, `opacity: 1` on `:hover`/`:focus-within`.
- Three sizes — never deviate from Figma heights: lg=40px, md=32px, sm=24px.
- Tooltip is for supplementary info only — never put critical information in a tooltip (it's invisible by default).
