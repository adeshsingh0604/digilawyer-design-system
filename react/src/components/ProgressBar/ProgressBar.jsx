import React from 'react';
import PropTypes from 'prop-types';

/**
 * Linear progress track — determinate or indeterminate.
 *
 * The fill width is driven by the `value` prop (0–100). When `indeterminate`
 * is true the fill animates in a looping sweep and `aria-valuenow` is omitted.
 *
 * **Sizing:** always full-width by default — constrain with a wrapper `width`.
 */
export const ProgressBar = React.forwardRef(function ProgressBar(
  {
    value = 0,
    min = 0,
    max = 100,
    color = 'brand',
    size = 'sm',
    indeterminate = false,
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const cls = [
    'progress',
    `progress-${color}`,
    size === 'md' && 'progress-md',
    indeterminate && 'progress-indeterminate',
    className,
  ].filter(Boolean).join(' ');

  const clampedValue = Math.max(min, Math.min(max, value));
  const pct = indeterminate ? undefined : `${clampedValue}%`;

  return (
    <div
      ref={ref}
      className={cls}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : clampedValue}
      aria-label={ariaLabel}
      {...rest}
    >
      <div className="progress-fill" style={pct ? { width: pct } : undefined} />
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = {
  /** Current progress value (0–100). */
  value:         PropTypes.number,
  /** Minimum value for aria. Default 0. */
  min:           PropTypes.number,
  /** Maximum value for aria. Default 100. */
  max:           PropTypes.number,
  /** Colour variant. */
  color:         PropTypes.oneOf(['brand', 'blue', 'green', 'purple', 'orange', 'yellow', 'red']),
  /** Track height — `sm` = 8px (default), `md` = 12px. */
  size:          PropTypes.oneOf(['sm', 'md']),
  /** Looping sweep animation when duration is unknown. Hides `aria-valuenow`. */
  indeterminate: PropTypes.bool,
  className:     PropTypes.string,
  'aria-label':  PropTypes.string,
};

export default ProgressBar;
