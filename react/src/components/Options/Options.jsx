import React from 'react';
import PropTypes from 'prop-types';

/**
 * Single selectable row used inside a Dropdown or as a select-style trigger.
 *
 * Three content slots (leading · label · trailing), three sizes (lg/md/sm),
 * three states (default · hover · disabled).
 *
 * **Usage rules:**
 * - Always wrap a list of Options rows in `<OptionsMenu>` for correct ARIA.
 * - Use `role="option"` + `aria-selected` inside a `role="listbox"` context.
 * - Use `role="menuitem"` inside a `role="menu"` for action menus.
 * - Keep all items in a list the same size.
 * - For disabled rows, prefer `aria-disabled` (keeps focus) over native `disabled`.
 */
export const Option = React.forwardRef(function Option(
  {
    /** `"lg"` = 48px · `"md"` = 40px (default) · `"sm"` = 32px. */
    size = 'md',
    /** Content for the leading slot (icon, radio dot, avatar, …). */
    leading,
    /** Content for the trailing slot (chevron, checkmark, Tag chip, …). */
    trailing,
    /** Marks this row as the current selection — sets `aria-selected`. */
    selected,
    /** Disables the row. Applies native `disabled` on `<button>`. */
    disabled = false,
    /** Forces the hover visual at rest — documentation helper. */
    hover = false,
    /** Override the root element. Use `"a"` for navigation rows. */
    as: Tag = 'button',
    /** The label text shown in the row. */
    children,
    className,
    ...rest
  },
  ref
) {
  const cls = [
    'options',
    size === 'lg' && 'options-lg',
    size === 'sm' && 'options-sm',
    hover && 'is-hover',
    disabled && Tag !== 'button' && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? 'button' : undefined}
      className={cls}
      disabled={Tag === 'button' ? disabled || undefined : undefined}
      aria-selected={selected !== undefined ? selected : undefined}
      {...rest}
    >
      {leading != null && <span className="options-leading">{leading}</span>}
      <span className="options-label">{children}</span>
      {trailing != null && <span className="options-trailing">{trailing}</span>}
    </Tag>
  );
});

Option.displayName = 'Option';
Option.propTypes = {
  size:      PropTypes.oneOf(['lg', 'md', 'sm']),
  leading:   PropTypes.node,
  trailing:  PropTypes.node,
  selected:  PropTypes.bool,
  disabled:  PropTypes.bool,
  hover:     PropTypes.bool,
  as:        PropTypes.elementType,
  children:  PropTypes.node,
  className: PropTypes.string,
};

// ── OptionsMenu ───────────────────────────────────────────────────────────────

/**
 * Wrapper panel for a list of `<Option>` rows.
 *
 * Applies white surface + border + `--shadow-5` drop + `--radius-xs` corners.
 * Defaults to `role="listbox"` — pass `role="menu"` for action menus.
 */
export const OptionsMenu = React.forwardRef(function OptionsMenu(
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={['options-menu', className].filter(Boolean).join(' ')}
      role="listbox"
      {...rest}
    >
      {children}
    </div>
  );
});

OptionsMenu.displayName = 'OptionsMenu';
OptionsMenu.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Option;
