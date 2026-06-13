import React, { useId } from 'react';
import PropTypes from 'prop-types';

/**
 * Single-line text input with label, optional icon slots, and helper caption.
 * Three sizes (lg 48 / md 40 / sm 32) and four status states.
 *
 * The ref is forwarded to the native <input> element so consumers can call
 * .focus(), read .value, etc. directly.
 *
 * All native input attributes (type, placeholder, value, onChange, onBlur,
 * required, maxLength, autoComplete, aria-*, data-*) pass through via ...rest.
 */
export const Input = React.forwardRef(function Input(
  {
    /** Visible label above the field. Associates with the input via auto-generated id. */
    label,
    /** Helper text or validation message below the field. Colour follows `status`. */
    caption,
    /**
     * Validation state — changes caption colour only; the field chrome stays neutral.
     * 'default' | 'success' | 'warning' | 'error'
     */
    status = 'default',
    /** Field height: 'sm' 32px / 'md' 40px (default) / 'lg' 48px. */
    size = 'md',
    /** SVG/icon element rendered in the leading slot. */
    leadingIcon,
    /** SVG/icon element rendered in the trailing slot. */
    trailingIcon,
    /** Disables interaction and applies disabled token colours. */
    disabled = false,
    /** Explicit id — auto-generated if omitted, for label association. */
    id: idProp,
    /** Additional class names on the outer .input-field wrapper. */
    className,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const wrapperClasses = [
    'input-field',
    status === 'success' && 'input-field-success',
    status === 'warning' && 'input-field-warning',
    status === 'error'   && 'input-field-error',
    className,
  ].filter(Boolean).join(' ');

  const shellClasses = [
    'input',
    size === 'lg' && 'input-lg',
    size === 'sm' && 'input-sm',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={shellClasses}>
        {leadingIcon && <span className="input-leading">{leadingIcon}</span>}
        <input ref={ref} id={id} disabled={disabled} {...rest} />
        {trailingIcon && <span className="input-trailing">{trailingIcon}</span>}
      </div>
      {caption && <p className="input-field-caption">{caption}</p>}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label:       PropTypes.node,
  caption:     PropTypes.node,
  status:      PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  size:        PropTypes.oneOf(['sm', 'md', 'lg']),
  leadingIcon: PropTypes.node,
  trailingIcon:PropTypes.node,
  disabled:    PropTypes.bool,
  id:          PropTypes.string,
  className:   PropTypes.string,
};

export default Input;
