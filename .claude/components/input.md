# Text Input — Component Rules

**Page:** `docs/components/input.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.14.0

## Token prefix
`--input-*` — covers default, hover, focus, error, disabled, filled states × bg, border, label, placeholder, text.

## CSS classes
- Outer wrapper: `.input-field` — shared with Textarea and Upload Media
- Input element: `.input`
- Variants: `.input-default`, `.input-outlined`, `.input-filled`
- Sizes: `.input-lg`, `.input-md` (default), `.input-sm`
- States: `.input-error`, `.input-disabled` — applied to `.input-field`
- Label: `.input-label`
- Helper/error text: `.input-helper`
- Icon slots: `.input-icon-left`, `.input-icon-right`

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `with-icons`, `api`

## Rules
- The `.input-field` wrapper is shared with Textarea and Upload Media — never change `.input-field` CSS without checking those two pages.
- Three variants: default (bg fill), outlined (border), filled (darker bg). All use the same token names with different values — do not create separate token groups per variant.
- Error state is on the wrapper (`.input-field.input-error`), not the `<input>` element — this keeps the label, border, and helper text all in sync.
- Font weight for typed text is 400 (regular) — never 500. This was corrected in v2.15.1.
