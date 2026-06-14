import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Inline feedback panel for contextual status messages.
 *
 * 7 semantic colours × 3 visual variants (Semi-filled · Filled · Border).
 * Carries a header row (icon + title + dismiss), a description body,
 * and up to two action buttons.
 *
 * **Usage rules:**
 * - Use for persistent inline feedback — not for transient toasts (use Snackbar).
 * - Danger → `role="alert"` (interrupts immediately). Others → `role="status"` (polite).
 * - Keep body to 1–2 sentences.
 * - Action button labels should be descriptive ("Retry", not "OK").
 * - The icon is decorative — do not give it an accessible name.
 */
export const Alert = React.forwardRef(function Alert(
  {
    /** Semantic colour. */
    color = 'brand',
    /** Semi-filled = tinted bg · Filled = solid accent bg · Border = hairline on page bg. */
    variant = 'semi',
    /** Header title text. */
    title,
    /** 20px icon in the leading slot — should be `aria-hidden`. */
    icon,
    /** Callback for the dismiss × button. Omit to hide the button. */
    onDismiss,
    /** Action buttons — use `<AlertBtnPrimary>` and `<AlertBtnSecondary>`. */
    actions,
    /** Body description text. */
    children,
    /** Additional class names. */
    className,
    /** ARIA live-region role. Defaults to "alert" for Danger, "status" for all others. */
    role,
    ...rest
  },
  ref
) {
  const autoRole = color === 'danger' ? 'alert' : 'status';

  const classes = [
    'alert',
    `alert-${color}`,
    variant === 'filled' && 'alert-filled',
    variant === 'border' && 'alert-border',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} role={role ?? autoRole} {...rest}>
      {(icon != null || title != null || onDismiss) && (
        <div className="alert-header">
          {icon != null && <span className="alert-icon">{icon}</span>}
          {title != null && <span className="alert-title">{title}</span>}
          {onDismiss && (
            <button
              type="button"
              className="alert-close"
              onClick={onDismiss}
              aria-label="Dismiss alert"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}
      {children != null && children !== '' && <p className="alert-body">{children}</p>}
      {actions != null && <div className="alert-actions">{actions}</div>}
    </div>
  );
});

Alert.displayName = 'Alert';

Alert.propTypes = {
  color:     PropTypes.oneOf(['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert']),
  variant:   PropTypes.oneOf(['semi', 'filled', 'border']),
  title:     PropTypes.node,
  icon:      PropTypes.node,
  onDismiss: PropTypes.func,
  actions:   PropTypes.node,
  children:  PropTypes.node,
  className: PropTypes.string,
  role:      PropTypes.string,
};

/**
 * Primary action button inside an Alert. In Semi/Border variant: accent bg + white text.
 * In Filled variant: white bg + accent text.
 */
export const AlertBtnPrimary = React.forwardRef(function AlertBtnPrimary(
  { children, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['alert-btn-primary', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
});

AlertBtnPrimary.displayName = 'AlertBtnPrimary';
AlertBtnPrimary.propTypes = { children: PropTypes.node, className: PropTypes.string };

/**
 * Secondary action button inside an Alert. Transparent bg with an accent-coloured border.
 * In Filled variant: white border + white text.
 */
export const AlertBtnSecondary = React.forwardRef(function AlertBtnSecondary(
  { children, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['alert-btn-secondary', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
});

AlertBtnSecondary.displayName = 'AlertBtnSecondary';
AlertBtnSecondary.propTypes = { children: PropTypes.node, className: PropTypes.string };

export default Alert;
