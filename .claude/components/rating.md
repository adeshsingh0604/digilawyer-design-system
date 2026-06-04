# Rating — Component Rules

**Page:** `docs/components/rating.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.31.0

## Token prefix
`--rating-brand` (inverts in dark), `--rating-empty`, `--rating-star`, `--rating-heart`

## CSS classes
- Wrapper: `.rating`
- Colour variants: `.rating-brand`, `.rating-yellow`, `.rating-red`
- Sizes: `.rating-lg` (24px), default (20px), `.rating-sm` (16px)
- Item: `.rating-item` — use `<button>` for interactive, `<span>` for read-only
- States: `.is-filled`, `.is-half`, `.is-preview`
- Interactive: `data-interactive` attribute + optional `data-half="true"` for half-step mode
- Shape: `data-shape="heart"` switches icon IDs to heart symbols

## Private cascade
`--_rt` — set by colour modifier (`.rating-yellow` → `--rating-star`), read by `.is-filled` and `.is-half`.
Empty icons always use `--rating-empty` regardless of colour modifier.

## SVG symbols (declared in page sprite pool)
`#ico-rt-star-fill`, `#ico-rt-star-stroke`, `#ico-rt-star-half`
`#ico-rt-heart-fill`, `#ico-rt-heart-stroke`, `#ico-rt-heart-half`

## Page sections (h2 IDs)
`default`, `shapes`, `colors`, `sizes`, `states`, `interactive`, `api`

## Rules
- Half-icon is rendered using an explicit left-half polygon path + full stroke overlay — no `clipPath`.
- Interactive JS: hover uses `getBoundingClientRect` for midpoint detection (not `offsetX`) — child SVG elements would skew `offsetX`.
- Two interactive modes: full integer only (no `data-half`) and half-step (`data-half="true"`). Both must work independently.
- `aria-readonly="true"` on `.rating` disables pointer events for display-only use.
- Page-local helpers scoped as `.demo-panel.rt-row`, `.demo-panel.rt-col`, `.demo-panel.rt-grid`.
