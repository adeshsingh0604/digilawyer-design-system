import React from 'react';
import PropTypes from 'prop-types';

const InfoCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
    <path d="M12 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/**
 * Dismiss × button. Renders the inline close icon automatically.
 * Always provide `aria-label="Close"` (or a row-contextual label).
 */
export const SnackbarClose = React.forwardRef(function SnackbarClose(
  { className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['snackbar-close', className].filter(Boolean).join(' ')}
      aria-label="Close"
      {...rest}
    >
      {children ?? <CloseIcon />}
    </button>
  );
});

SnackbarClose.displayName = 'SnackbarClose';
SnackbarClose.propTypes = {
  className: PropTypes.string,
  children:  PropTypes.node,
};

/**
 * Inline notification toast.
 *
 * Seven colour variants × three visual states. Auto-sets `role="alert"` for
 * Danger, `role="status"` for all others.
 *
 * **Slots:**
 * - `icon` — ReactNode. Defaults to the filled info-circle SVG.
 * - `children` — the message label.
 * - `action` — optional ReactNode (e.g. `<button className="btn btn-primary btn-sm">`).
 * - `onClose` — when provided, renders a × dismiss button.
 */
export const Snackbar = React.forwardRef(function Snackbar(
  {
    variant = 'brand',
    state = 'semi',
    icon,
    action,
    onClose,
    children,
    className,
    ...rest
  },
  ref
) {
  const stateClass = state === 'filled' ? 'snackbar-filled'
                   : state === 'border' ? 'snackbar-border'
                   : null;

  const cls = [
    'snackbar',
    `snackbar-${variant}`,
    stateClass,
    className,
  ].filter(Boolean).join(' ');

  const role = variant === 'danger' ? 'alert' : 'status';

  return (
    <div ref={ref} className={cls} role={role} {...rest}>
      <span className="snackbar-icon">
        {icon ?? <InfoCircleIcon />}
      </span>
      <span className="snackbar-label">{children}</span>
      {(action || onClose) && (
        <div className="snackbar-actions">
          {action}
          {onClose && <SnackbarClose onClick={onClose} />}
        </div>
      )}
    </div>
  );
});

Snackbar.displayName = 'Snackbar';
Snackbar.propTypes = {
  /** Colour intent. */
  variant:   PropTypes.oneOf(['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert']),
  /** Visual treatment. */
  state:     PropTypes.oneOf(['semi', 'filled', 'border']),
  /** Leading icon. Defaults to InfoCircleIcon. */
  icon:      PropTypes.node,
  /** Optional action button node (e.g. a .btn.btn-primary.btn-sm). */
  action:    PropTypes.node,
  /** If provided, a × dismiss button is rendered and onClick fires this. */
  onClose:   PropTypes.func,
  /** Message text. */
  children:  PropTypes.node,
  className: PropTypes.string,
};

export { InfoCircleIcon, CloseIcon };
export default Snackbar;
