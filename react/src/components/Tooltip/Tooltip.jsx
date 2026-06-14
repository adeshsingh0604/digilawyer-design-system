import React from 'react';
import PropTypes from 'prop-types';

/**
 * Contextual hint pill that inverts between light and dark mode.
 *
 * Three sizes × four arrow positions. Renders as a standalone visible pill.
 * Wrap trigger + Tooltip in `<TooltipHost>` for CSS-only hover/focus behaviour
 * without any JavaScript.
 *
 * **Usage rules:**
 * - Always set `id` and point the trigger's `aria-describedby` to it.
 * - Keep text to 1–8 words — tooltips are hints, not descriptions.
 * - Tooltip is hover/focus only — do not use as the sole source of critical info.
 */
export const Tooltip = React.forwardRef(function Tooltip(
  {
    /** lg = 40px (default) · md = 32px · sm = 24px. */
    size = 'lg',
    /** Which side the arrow appears on (matches the side the tooltip shows from). */
    position,
    /** Leading icon node — rendered in a `.tooltip-icon` slot. */
    icon,
    /** Trailing icon node — rendered in a `.tooltip-icon` slot after text. */
    trailing,
    /** Tooltip label text. */
    children,
    /** Additional class names. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'tooltip',
    size === 'md' && 'tooltip-md',
    size === 'sm' && 'tooltip-sm',
    position && `tooltip-${position}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} role="tooltip" className={classes} {...rest}>
      {icon != null && <span className="tooltip-icon tooltip-icon-leading">{icon}</span>}
      {children}
      {trailing != null && <span className="tooltip-icon tooltip-icon-trailing">{trailing}</span>}
    </span>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  size:      PropTypes.oneOf(['lg', 'md', 'sm']),
  position:  PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  icon:      PropTypes.node,
  trailing:  PropTypes.node,
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Wrapper that enables CSS-only hover + focus-within show/hide for a Tooltip.
 *
 * Place the trigger element and a `<Tooltip>` as direct children. The Tooltip
 * is hidden at rest (opacity: 0) and fades in on hover or focus-within — no
 * JavaScript required.
 *
 * ```jsx
 * <TooltipHost>
 *   <button aria-describedby="tt1">Hover me</button>
 *   <Tooltip id="tt1" position="top">Short hint</Tooltip>
 * </TooltipHost>
 * ```
 */
export const TooltipHost = React.forwardRef(function TooltipHost(
  { children, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={['tooltip-host', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
});

TooltipHost.displayName = 'TooltipHost';

TooltipHost.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Tooltip;
