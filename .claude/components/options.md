# Options — Component Rules

**Page:** `docs/components/options.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.10.0

## Token prefix
`--options-*` — bg, hover, text, disabled, icon colours. Also aliased by Dropdown.

## CSS classes
- Item: `.options` (base), use `<button role="option">`
- Sizes: `.options-lg` (48px), `.options-md` (40px, default), `.options-sm` (32px)
- Slots: `.options-leading` (icon), `.options-label` (text), `.options-trailing` (icon/tag)
- Menu wrapper: `.options-menu` — aliased as `.dropdown`

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Options is a single selectable row — not a full dropdown panel. The panel wrapper is `.options-menu` / `.dropdown`.
- Three sizes — Figma-exact: lg 48px (padding 16px, icon 24px, Body 1), md 40px (padding 12px, icon 16px, Body 2), sm 32px (padding 12px, icon 16px, Caption 1).
- Dark mode tokens verified against Figma node 5837-3332.
- Trailing slot composes with `.tag` component for chips — do not hardcode tag styles inside options.
- `.options-menu` and `.dropdown` are identical — changes to one must be reflected in the other (they share the same CSS rule).
