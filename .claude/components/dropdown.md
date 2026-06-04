# Dropdown — Component Rules

**Page:** `docs/components/dropdown.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.13.0

## Token prefix
No new tokens — inherits `--options-*` tokens entirely. `.dropdown` is an alias for `.options-menu`.

## CSS classes
- `.dropdown` — alias for `.options-menu`. Both class names work identically.
- `.options-menu` — the underlying implementation
- Items: `.options-item`, `.options-item-active`, `.options-item-disabled`

## Page sections (h2 IDs)
`default`, `sizes`, `composition`, `api`

## Rules
- Dropdown is a pure alias — `.dropdown` = `.options-menu`. Never add separate CSS rules for `.dropdown`; always add to `.options-menu` and the alias inherits.
- Dropdown has no Variants or States sections — only Default, Sizes, Composition, API.
- The Dropdown panel uses `--shadow-3` for elevation — do not change to a hardcoded box-shadow.
- Dropdown items compose with `.tag` for trailing chips — see the Composition section.
- Do not use Dropdown for navigation — use it for selection within a form or menu context.
