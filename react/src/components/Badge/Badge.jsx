import React from 'react';
import PropTypes from 'prop-types';

const VerifyIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 12 12" aria-hidden="true">
    <g style={{ fill: 'var(--vs, currentColor)' }}>
      <circle cx="6"     cy="6"     r="5" />
      <circle cx="11"    cy="6"     r="1" />
      <circle cx="10.33" cy="8.5"   r="1" />
      <circle cx="8.5"   cy="10.33" r="1" />
      <circle cx="6"     cy="11"    r="1" />
      <circle cx="3.5"   cy="10.33" r="1" />
      <circle cx="1.67"  cy="8.5"   r="1" />
      <circle cx="1"     cy="6"     r="1" />
      <circle cx="1.67"  cy="3.5"   r="1" />
      <circle cx="3.5"   cy="1.67"  r="1" />
      <circle cx="6"     cy="1"     r="1" />
      <circle cx="8.5"   cy="1.67"  r="1" />
      <circle cx="10.33" cy="3.5"   r="1" />
    </g>
    <path
      d="M3.6 6.2l1.7 1.7 3.4-3.4"
      style={{ stroke: 'var(--vc, #FFFFFF)', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }}
    />
  </svg>
);

/**
 * Tiny status / count indicator. Three variants: Dot (status disc),
 * Label (count pill, 1–4 digits), Verify (checkmark for trusted status).
 * Seven semantic colours. Three sizes.
 *
 * **Usage rules:**
 * - Dot and Verify have no visible text — always pass `aria-label`.
 * - Truncate large counts to "99+" before passing as children.
 * - Wrap host + Badge in `<BadgePin>` to anchor at top-right of any element.
 * - Never use Label badge without a numeric count context — use Tag for text labels.
 */
export const Badge = React.forwardRef(function Badge(
  {
    /** Dot = solid disc · Label = count pill · Verify = checkmark icon. */
    variant = 'dot',
    /** Seven semantic colours. Brand inverts in dark mode. */
    color = 'brand',
    /** sm = 4px · md = 8px (default) · lg = 12px for Dot/Verify.
     *  Label: sm = 12px tall · md = 16px tall · lg = 20px tall. */
    size = 'md',
    /** Count text for the Label variant — keep to 1–4 characters. */
    children,
    /** Additional class names merged onto the root element. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${color}`,
    size !== 'md' && `badge-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {variant === 'verify' && <VerifyIcon />}
      {variant === 'label' && children}
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  variant:   PropTypes.oneOf(['dot', 'label', 'verify']),
  color:     PropTypes.oneOf(['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert']),
  size:      PropTypes.oneOf(['sm', 'md', 'lg']),
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Wrapper that pins a child Badge to the top-right corner of its sibling host element.
 * Drop the host + Badge as direct children; the Badge anchors at top: -4px, right: -4px.
 */
export const BadgePin = React.forwardRef(function BadgePin(
  { children, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={['badge-pin', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
});

BadgePin.displayName = 'BadgePin';

BadgePin.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
