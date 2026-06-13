import React from 'react';
import PropTypes from 'prop-types';

/**
 * The primary action element in the DigiLawyer Design System.
 *
 * Five variants, four sizes, five states. All colours come from CSS custom
 * properties in `docs/shared/tokens.css`.
 *
 * **Usage rules:**
 * - Use **Primary** for the single most important action in a view.
 * - Pair **Primary + Tertiary** for confirm/cancel flows — never two Primaries.
 * - Use **Danger** for destructive actions (delete, remove, reset).
 * - For icon-only buttons, set `square` and pass `aria-label`.
 *
 * Any native `<button>` attribute (`data-testid`, `aria-label`, `tabIndex`,
 * `onFocus`, `form`, etc.) can be passed directly and will reach the DOM.
 */
export const Button = React.forwardRef(function Button(
  {
    /** Visual style and emphasis level. */
    variant = 'primary',
    /** Height: xs = 24px · sm = 32px · md = 40px · lg = 48px. */
    size = 'md',
    /** Token-based disabled colours — not opacity. Removes from tab order. */
    disabled = false,
    /** CSS spinner via `::after`, sets `aria-busy`. Label stays in DOM but becomes transparent. */
    loading = false,
    /** Equal padding on all sides for icon-only buttons. Pass `aria-label` for accessibility. */
    square = false,
    /** Tertiary solid-border active state — use in segmented controls and button groups. */
    activeBorder = false,
    /** React node rendered left of the label. */
    iconLeft,
    /** React node rendered right of the label. Use for directional cues (arrows, chevrons). */
    iconRight,
    /** Button label. Required unless `square` is true and `aria-label` is set. */
    children,
    /** HTML button type. Default `"button"` prevents accidental form submission. */
    type = 'button',
    /** Additional class names merged onto the root `<button>`. */
    className,
    /** All other native button props (`aria-label`, `data-testid`, `tabIndex`, `onFocus`, etc.) pass through. */
    ...rest
  },
  ref
) {
  const classes = [
    'btn',
    activeBorder ? 'btn-active-border' : `btn-${variant}`,
    `btn-${size}`,
    square && 'btn-square',
    loading && 'btn-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {iconLeft && <span className="icon">{iconLeft}</span>}
      {children && <span className="btn-label">{children}</span>}
      {iconRight && <span className="icon">{iconRight}</span>}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  variant:      PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost', 'danger']),
  size:         PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  disabled:     PropTypes.bool,
  loading:      PropTypes.bool,
  square:       PropTypes.bool,
  activeBorder: PropTypes.bool,
  iconLeft:     PropTypes.node,
  iconRight:    PropTypes.node,
  children:     PropTypes.node,
  type:         PropTypes.oneOf(['button', 'submit', 'reset']),
  className:    PropTypes.string,
};

Button.defaultProps = {
  variant:      'primary',
  size:         'md',
  disabled:     false,
  loading:      false,
  square:       false,
  activeBorder: false,
  type:         'button',
};

export default Button;
