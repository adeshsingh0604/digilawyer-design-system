import React from 'react';
import PropTypes from 'prop-types';

/**
 * Layout wrapper that visually groups related Button components.
 * Two grouping styles: attached (default) or separated.
 * Supports horizontal (default) or vertical orientation.
 *
 * Selected state is controlled externally: pass `aria-pressed="true"` or
 * `className="active"` to the active child Button. ButtonGroup renders
 * the container only — it does not manage selection state internally.
 *
 * All native div attributes (aria-label, data-testid, onKeyDown, etc.)
 * pass through via ...rest.
 */
export const ButtonGroup = React.forwardRef(function ButtonGroup(
  {
    /** Adds gap between buttons; each button keeps its own border radius. */
    separated = false,
    /** Stacks buttons in a column instead of a row. */
    vertical = false,
    /**
     * Selected button adopts the solid-border look (transparent fill, strong
     * outline) instead of the default primary-fill. Use on a Tertiary base.
     */
    activeBorder = false,
    /**
     * ARIA role for the group wrapper.
     * Use "toolbar" for independent actions (Bold/Italic/Copy).
     * Use "group" for mutually exclusive selections (Day/Week/Month).
     */
    role = 'group',
    /** Additional class names on the wrapper. */
    className,
    /** Button components (or any elements) to group. */
    children,
    ...rest
  },
  ref
) {
  const classes = [
    'btn-group',
    separated && 'btn-group-separated',
    vertical && 'btn-group-vertical',
    activeBorder && 'btn-group-active-border',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} role={role} {...rest}>
      {children}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.propTypes = {
  separated:    PropTypes.bool,
  vertical:     PropTypes.bool,
  activeBorder: PropTypes.bool,
  role:         PropTypes.oneOf(['group', 'toolbar']),
  className:    PropTypes.string,
  children:     PropTypes.node,
};

export default ButtonGroup;
