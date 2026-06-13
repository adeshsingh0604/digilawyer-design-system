import React from 'react';
import PropTypes from 'prop-types';

/**
 * Floating panel that wraps one or more DropdownItem rows.
 *
 * The Dropdown is display-only — open/close state lives in the trigger.
 * Panel chrome matches Figma node 144-1623: 8px corners, 1px border,
 * Shadow-3, 4px inner padding, 8px gap between rows.
 *
 * **Usage rules:**
 * - Use `role="listbox"` for selection menus; `role="menu"` for action menus.
 * - Always set `aria-label` describing what the menu controls.
 * - Set `aria-expanded` and `aria-haspopup` on the trigger element, not here.
 * - Never nest Dropdowns — one level of depth maximum.
 *
 * Any native `<div>` attribute passes through to the root element.
 */
export const Dropdown = React.forwardRef(function Dropdown(
  {
    /** ARIA role for the panel. Use listbox for selection, menu for actions. */
    role = 'listbox',
    /** Accessible label describing what this menu controls. */
    'aria-label': ariaLabel,
    /** DropdownItem children. */
    children,
    /** Additional class names merged onto the root element. */
    className,
    ...rest
  },
  ref
) {
  const classes = ['dropdown', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} role={role} aria-label={ariaLabel} {...rest}>
      {children}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  role:        PropTypes.oneOf(['listbox', 'menu']),
  'aria-label': PropTypes.string,
  children:    PropTypes.node,
  className:   PropTypes.string,
};

Dropdown.defaultProps = {
  role: 'listbox',
};

/**
 * A single row inside a Dropdown.
 *
 * Three slots: `icon` (leading), label (`children`), `trailing`.
 * Matches the `.options` pattern from the HTML docs exactly —
 * class names in JSX mirror the HTML so styles need zero changes.
 */
export const DropdownItem = React.forwardRef(function DropdownItem(
  {
    /** ARIA role for the row. Use option inside listbox, menuitem inside menu. */
    role = 'option',
    /** Compact row height (32px). Default is md (40px). */
    size = 'md',
    /** Highlight this row as active (hover/keyboard-focused state). */
    active = false,
    /** Mark this row as the selected value in a listbox. */
    selected = false,
    /** Removes from tab order and applies disabled styles. */
    disabled = false,
    /** React node rendered in the leading icon slot. */
    icon,
    /** React node rendered in the trailing slot (icon, Tag chip, etc.). */
    trailing,
    /** The row label text. */
    children,
    /** Additional class names merged onto the root element. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'options',
    size === 'sm' && 'options-sm',
    active && 'options-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      role={role}
      aria-selected={role === 'option' ? selected : undefined}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="options-leading">{icon}</span>}
      <span className="options-label">{children}</span>
      {trailing && <span className="options-trailing">{trailing}</span>}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  role:      PropTypes.oneOf(['option', 'menuitem']),
  size:      PropTypes.oneOf(['md', 'sm']),
  active:    PropTypes.bool,
  selected:  PropTypes.bool,
  disabled:  PropTypes.bool,
  icon:      PropTypes.node,
  trailing:  PropTypes.node,
  children:  PropTypes.node,
  className: PropTypes.string,
};

DropdownItem.defaultProps = {
  role:     'option',
  size:     'md',
  active:   false,
  selected: false,
  disabled: false,
};

export default Dropdown;
