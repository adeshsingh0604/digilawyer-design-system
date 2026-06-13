import React, { useRef, useEffect, useId } from 'react';
import PropTypes from 'prop-types';

/**
 * A binary selection control for DigiLawyer forms and lists.
 *
 * Three visual states: unchecked / checked / indeterminate.
 * Built on a native `<input type="checkbox">` — no ARIA overrides needed.
 *
 * The `ref` is forwarded to the underlying `<input>` element so consumers
 * can call `.focus()`, read `.checked`, or integrate with form libraries.
 *
 * **DigiLawyer patterns:**
 * - Checkbox always appears left of the label — never reversed.
 * - Use for multi-select; Radio for single-select; Toggle for immediate effect.
 * - Always provide a visible `children` label.
 * - Group related checkboxes in a `<fieldset>` + `<legend>`.
 *
 * Any native `<input>` attribute (`required`, `aria-describedby`, `onBlur`,
 * `data-testid`, etc.) can be passed directly and will reach the DOM.
 */
export const Checkbox = React.forwardRef(function Checkbox(
  {
    /** Controlled checked state. Pair with `onChange`. */
    checked,
    /** Uncontrolled initial state. */
    defaultChecked,
    /** Sets the indeterminate visual — used for "select all" with mixed children. Requires JS; no HTML attribute exists for this. */
    indeterminate = false,
    /** Disables interaction and applies disabled styling. */
    disabled = false,
    /** Change handler. Required when using controlled `checked`. */
    onChange,
    /** Label text rendered to the right of the box. */
    children,
    /** `id` for the input. Auto-generated if omitted — always matches the wrapping `<label>`. */
    id,
    /** Additional class names on the root `<label>`. */
    className,
    /** All other native input props (`name`, `value`, `required`, `aria-describedby`, `onBlur`, etc.) pass through. */
    ...rest
  },
  forwardedRef
) {
  const internalRef = useRef(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  // Merge the forwarded ref with our internal ref (needed to write indeterminate).
  const setRef = (el) => {
    internalRef.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isControlled = checked !== undefined;
  const inputProps = isControlled
    ? { checked, onChange }      // Let React warn if onChange is missing — that warning is correct
    : { defaultChecked, onChange };

  return (
    <label
      className={['checkbox', className].filter(Boolean).join(' ')}
      htmlFor={inputId}
    >
      <input
        ref={setRef}
        id={inputId}
        type="checkbox"
        className="checkbox-input"
        disabled={disabled}
        {...inputProps}
        {...rest}
      />
      <span className="checkbox-box">
        <svg className="checkbox-check" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="checkbox-dash" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      {children && <span className="checkbox-label">{children}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  checked:        PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate:  PropTypes.bool,
  disabled:       PropTypes.bool,
  onChange:       PropTypes.func,
  children:       PropTypes.node,
  id:             PropTypes.string,
  className:      PropTypes.string,
};

Checkbox.defaultProps = {
  indeterminate: false,
  disabled:      false,
};

export default Checkbox;
