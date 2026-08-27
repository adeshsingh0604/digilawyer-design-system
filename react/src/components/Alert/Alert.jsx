import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/*
 * Bundlers (Vite, webpack, Next, Rollup) statically replace the whole
 * `process.env.NODE_ENV` expression with a string literal, then dead-code
 * eliminate the dev branch from production builds. This is the form React
 * itself uses. Do NOT guard it with `typeof process !== 'undefined'` — no
 * `process` object exists in the browser, so that check is always false and
 * silently disables every warning below.
 */
const IS_DEV = process.env.NODE_ENV !== 'production';

/** One warning per distinct message — a re-rendering Alert must not spam the console. */
const warnedMessages = new Set();
function warnOnce(message) {
  if (warnedMessages.has(message)) return;
  warnedMessages.add(message);
  // eslint-disable-next-line no-console
  console.warn(message);
}

/**
 * Development-only check that the copy actually fits.
 *
 * Measures the rendered box rather than counting characters: a character budget
 * false-positives in a wide container and false-negatives in a narrow one,
 * whereas scrollWidth/scrollHeight report whether *this* Alert, at *this* width,
 * is genuinely hiding text from the user.
 *
 * Exists because copy is usually pasted in — often AI-generated — and CSS
 * truncation alone fails silently for whoever wrote it.
 */
function useCopyFitsWarning(titleRef, bodyRef, title, children) {
  useEffect(() => {
    if (!IS_DEV) return;

    // An element that is hidden or not yet laid out reports clientWidth 0, where
    // every string "overflows". Bail rather than warn about a box nobody can see —
    // this is the Alert-in-a-collapsed-accordion / inactive-tab case.
    const titleEl = titleRef.current;
    const bodyEl = bodyRef.current;
    const laidOut = (titleEl || bodyEl)?.clientWidth > 0;
    if (!laidOut) return;

    if (titleEl && titleEl.scrollWidth > titleEl.clientWidth) {
      warnOnce(
        `[DigiLawyer DS] Alert title is truncated: "${String(title).slice(0, 60)}…"\n` +
          'Titles must fit one line. Shorten it — the remainder is hidden from users.'
      );
    }

    if (bodyEl && bodyEl.scrollHeight > bodyEl.clientHeight) {
      warnOnce(
        `[DigiLawyer DS] Alert body is clamped at 3 lines: "${String(children).slice(0, 60)}…"\n` +
          'Keep the body to 1–2 sentences. The overflow is hidden from users.'
      );
    }
  }, [titleRef, bodyRef, title, children]);
}

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

  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  useCopyFitsWarning(titleRef, bodyRef, title, children);

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
          {title != null && (
            <span className="alert-title" ref={titleRef}>
              {title}
            </span>
          )}
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
      {children != null && children !== '' && (
        <p className="alert-body" ref={bodyRef}>
          {children}
        </p>
      )}
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
