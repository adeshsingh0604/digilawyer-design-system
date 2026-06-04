# Avatar — Component Rules

**Page:** `docs/components/avatar.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.27.0

## Token prefix
`--avatar-bg`, `--avatar-text`, `--avatar-border`, `--avatar-status-online`, `--avatar-status-offline` — 5 tokens.

## CSS classes
- Base: `.avatar`
- Types: `.avatar-icon`, `.avatar-initials`, `.avatar-image`
- Sizes: `.avatar-xl` (56px), `.avatar-lg` (48px), `.avatar-md` (40px, default), `.avatar-sm` (32px)
- Stack: `.avatar-stack` (overlapping group)
- Badge pin: `.avatar-pin-tr` (top-right), `.avatar-pin-br` (bottom-right), `.avatar-pin-tl`, `.avatar-pin-bl`
- Status: `.avatar-status` — online/offline indicator dot

## Page sections (h2 IDs)
`default`, `types`, `sizes`, `composition`, `api`

## Rules
- Three types: Icon (SVG), Initials (1-2 chars), Image (`<img>`). All three use the same base `.avatar` class.
- Status dot (`.avatar-status`) uses `--avatar-status-online` (#32CD6D) and `--avatar-status-offline` (#B0B0B0).
- Badge composition uses `.badge` from the Badge component — do not create custom badge styles for Avatar.
- `.avatar-stack` uses negative `margin-left` to create the overlapping group effect — do not change to `gap`.
- Avatar images always use `object-fit: cover` and `border-radius: 50%`.
