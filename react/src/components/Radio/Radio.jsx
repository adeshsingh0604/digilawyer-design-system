import React from 'react';
import PropTypes from 'prop-types';

/**
 * Single-selection control from a mutually exclusive set.
 * Built on a native <input type="radio"> — the browser enforces one-of-N
 * semantics via the shared `name` attribute; no JS needed for state.
 *
 * DigiLawyer rule: always group radios with a shared `name` attribute and
 * wrap them in a <fieldset> + <legend> for an accessible group label.
 * Use for 2–6 mutually exclusive options; use Dropdown for 7+.
 *
 * All native input attributes (name, value, checked, defaultChecked,
 * onChange, aria-*, data-*) pass through via ...rest.
 */
export const Radio = React.forwardRef(function Radio(
  {
    /** Label text rendered to the right of the circle. */
    children,
    /** Disables interaction and applies disabled token colours. */
    disabled = false,
    /** Additional class names on the wrapper label. */
    className,
    ...rest
  },
  ref
) {
  return (
    <label className={['radio', className].filter(Boolean).join(' ')}>
      <input
        ref={ref}
        type="radio"
        className="radio-input"
        disabled={disabled}
        {...rest}
      />
      <span className="radio-box">
        <span className="radio-dot" />
      </span>
      {children && <span className="radio-label">{children}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  children:  PropTypes.node,
  disabled:  PropTypes.bool,
  className: PropTypes.string,
};

export default Radio;
