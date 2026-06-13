import React, { useId } from 'react';
import PropTypes from 'prop-types';

/**
 * Multi-line text input with label, optional trailing icon, and helper caption.
 * Shares the .input-field wrapper with Input. Three sizes (lg / md / sm).
 * Resizes vertically by default — pass style={{ resize: 'none' }} to lock height.
 *
 * The ref is forwarded to the native <textarea> element.
 *
 * All native textarea attributes (placeholder, value, defaultValue, onChange,
 * rows, maxLength, required, aria-*, data-*) pass through via ...rest.
 */
export const Textarea = React.forwardRef(function Textarea(
  {
    /** Visible label above the field. */
    label,
    /** Helper text or validation message below the field. Colour follows `status`. */
    caption,
    /** Validation state — changes caption colour only. */
    status = 'default',
    /** Shell size: 'sm' 80px / 'md' 120px (default) / 'lg' 160px. */
    size = 'md',
    /** SVG/icon element rendered in the top-right trailing slot. */
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
    'textarea',
    size === 'lg' && 'textarea-lg',
    size === 'sm' && 'textarea-sm',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={shellClasses}>
        <textarea ref={ref} id={id} disabled={disabled} {...rest} />
        {trailingIcon && (
          <span className="textarea-trailing">{trailingIcon}</span>
        )}
      </div>
      {caption && <p className="input-field-caption">{caption}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label:        PropTypes.node,
  caption:      PropTypes.node,
  status:       PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  size:         PropTypes.oneOf(['sm', 'md', 'lg']),
  trailingIcon: PropTypes.node,
  disabled:     PropTypes.bool,
  id:           PropTypes.string,
  className:    PropTypes.string,
};

export default Textarea;
