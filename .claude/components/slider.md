# Slider — Component Rules

**Page:** `docs/components/slider.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.30.0

## Token prefix
`--slider-track-bg`, `--slider-fill`, `--slider-tip-bg`, `--slider-tip-text`, `--slider-ring-hover`, `--slider-ring-active`

## CSS classes
- Field wrapper: `.slider-field`
- Input: `.slider` (native `<input type="range">`)
- Sizes: `.slider-md` (8px track), `.slider-lg` (12px track). Default = 4px.
- Tooltip: `.slider-tip` — hidden by default, shown on hover/drag
- Value label: `.slider-val` — permanent bottom label
- Modifier: `.has-tip` (tooltip mode), `.has-val` (bottom label mode)
- Drag state: `.is-dragging` — added/removed by JS mousedown/mouseup

## Page sections (h2 IDs)
`default`, `tooltip-count`, `bottom-count`, `range`, `sizes`, `states`, `interactive`

## Rules
- Input `height` must equal the thumb diameter (16px) — never match the track height. This centres the thumb correctly. This is a critical fix from v2.30.1.
- Thumb centering: `margin-top: calc((var(--track-h, 4px) - 16px) / 2)` on webkit slider thumb. Do not remove this calculation.
- Hover ring: `box-shadow: 0 0 0 8px var(--slider-ring-hover)` on thumb hover.
- Active/drag ring: `box-shadow: 0 0 0 14px var(--slider-ring-active)` on thumb active.
- `.slider-tip` must be `opacity: 0` by default — only shown via `.has-tip:hover` or `.has-tip.is-dragging`.
- Range variant uses `--pct-a` and `--pct-b` CSS custom properties set by JS to drive the fill gradient.
- JS auto-init: `data-slider` and `data-slider-range` attributes trigger automatic initialisation.
