import React from 'react';
import PropTypes from 'prop-types';

/**
 * Boolean on/off control — like a checkbox, but the "on" state takes effect
 * immediately (no separate submit action). Built on a native
 * <input type="checkbox"> for keyboard support and form integration;
 * the thumb slide is pure CSS.
 *
 * DigiLawyer rule: use Toggle (not Checkbox) when toggling a setting that
 * takes immediate effect. Use Checkbox for form fields that require a submit.
 *
 * All native input attributes (checked, defaultChecked, onChange, name,
 * aria-*, data-*) pass through via ...rest.
 */
export const Toggle = React.forwardRef(function Toggle(
  {
    /** Track + thumb size. Default is medium. */
    size = 'md',
    /** Disables interaction and applies disabled token colours. */
    disabled = false,
    /** Label text rendered to the right of the track. */
    children,
    /** Additional class names on the wrapper label. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'toggle',
    size === 'sm' && 'toggle-sm',
    size === 'lg' && 'toggle-lg',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        ref={ref}
        type="checkbox"
        className="toggle-input"
        disabled={disabled}
        {...rest}
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      {children && <span className="toggle-label">{children}</span>}
    </label>
  );
});

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  size:      PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled:  PropTypes.bool,
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Toggle;
