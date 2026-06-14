import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Compute the pixel offset of the thumb centre from the left edge of
 * the input element — mirrors the HTML docs' thumbPx() formula exactly.
 *   offset = pct * (inputWidth - thumbDiameter) + thumbRadius
 */
function thumbPx(input, value) {
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  return ((value - min) / (max - min)) * (input.offsetWidth - 16) + 8;
}

/**
 * Hook that tracks the pixel left-offset of a single thumb and re-measures
 * on value change and window resize.
 */
function useThumbLeft(inputRef, value) {
  const [left, setLeft] = useState('0px');
  const measure = useCallback(() => {
    const el = inputRef.current;
    if (!el || !el.offsetWidth) return;
    setLeft(`${thumbPx(el, value)}px`);
  }, [inputRef, value]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return left;
}

/**
 * Single-thumb range slider.
 *
 * Three track heights: default = 4px · `size="md"` = 8px · `size="lg"` = 12px.
 * Thumb stays 16px at all sizes. Value display: `showTip` shows an ephemeral
 * tooltip on hover/drag · `showVal` shows a permanent label below the track.
 * Use exactly one — never both.
 *
 * **Usage rules:**
 * - Always pass `aria-label` — the track has no visible label.
 * - Use `showTip` when space is tight; `showVal` when value must always be visible.
 * - For two-thumb range selection use `<SliderRange>` instead.
 */
export const Slider = React.forwardRef(function Slider(
  {
    /** Minimum value. */
    min = 0,
    /** Maximum value. */
    max = 100,
    /** Step increment. */
    step = 1,
    /** Uncontrolled starting value. */
    defaultValue,
    /** Controlled value. */
    value: valueProp,
    /** Called with (numericValue, event) on every change. */
    onChange,
    /** Track height — default = 4px · md = 8px · lg = 12px. */
    size = 'sm',
    /** Show ephemeral tooltip above thumb on hover / drag. */
    showTip = false,
    /** Show permanent value label below track. */
    showVal = false,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(
    defaultValue !== undefined ? defaultValue : min
  );
  const value = isControlled ? valueProp : internal;

  const inputRef = useRef(null);
  const setInputRef = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const pct = ((value - min) / (max - min)) * 100;
  const tipLeft = useThumbLeft(inputRef, value);

  function handleChange(e) {
    const v = Number(e.target.value);
    if (!isControlled) setInternal(v);
    onChange?.(v, e);
  }

  const fieldClasses = [
    'slider-field',
    size === 'md' && 'slider-md',
    size === 'lg' && 'slider-lg',
    showTip && 'has-tip',
    showVal && 'has-val',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fieldClasses} style={{ '--pct': `${pct}%` }}>
      {showTip && (
        <span className="slider-tip" style={{ left: tipLeft }}>
          {Math.round(value)}
        </span>
      )}
      <input
        ref={setInputRef}
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        {...rest}
      />
      {showVal && (
        <span className="slider-val" style={{ left: tipLeft }}>
          {Math.round(value)}
        </span>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';
Slider.propTypes = {
  min:          PropTypes.number,
  max:          PropTypes.number,
  step:         PropTypes.number,
  defaultValue: PropTypes.number,
  value:        PropTypes.number,
  onChange:     PropTypes.func,
  size:         PropTypes.oneOf(['sm', 'md', 'lg']),
  showTip:      PropTypes.bool,
  showVal:      PropTypes.bool,
  disabled:     PropTypes.bool,
  className:    PropTypes.string,
};

/**
 * Two-thumb range slider — selects a low and high bound on the same track.
 *
 * Renders two overlapping `<input type="range">` elements inside
 * `.slider-range-track`. The fill between thumbs is driven by `--pct-a`
 * and `--pct-b` CSS custom properties. JS constrains the thumbs so they
 * cannot cross each other.
 *
 * **Usage rules:**
 * - Pass `aria-label` (or `aria-labelledby`) on both `inputAProps` / `inputBProps`.
 * - `value` is a two-element array `[lo, hi]`; same shape for `onChange`.
 * - Use `showTip` or `showVal` (not both) for count display.
 */
export const SliderRange = React.forwardRef(function SliderRange(
  {
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    value: valueProp,
    onChange,
    size = 'sm',
    showTip = false,
    showVal = false,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(
    defaultValue !== undefined ? defaultValue : [min, max]
  );
  const [lo, hi] = isControlled ? valueProp : internal;

  const inputARef = useRef(null);
  const inputBRef = useRef(null);

  const pctA = ((lo - min) / (max - min)) * 100;
  const pctB = ((hi - min) / (max - min)) * 100;
  const tipALeft = useThumbLeft(inputARef, lo);
  const tipBLeft = useThumbLeft(inputBRef, hi);

  function handleA(e) {
    const v = Math.min(Number(e.target.value), hi - step);
    const next = [v, hi];
    if (!isControlled) setInternal(next);
    onChange?.(next, e);
  }

  function handleB(e) {
    const v = Math.max(Number(e.target.value), lo + step);
    const next = [lo, v];
    if (!isControlled) setInternal(next);
    onChange?.(next, e);
  }

  const fieldClasses = [
    'slider-field',
    'slider-range',
    size === 'md' && 'slider-md',
    size === 'lg' && 'slider-lg',
    showTip && 'has-tip',
    showVal && 'has-val',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={fieldClasses}>
      {showTip && (
        <>
          <span className="slider-tip slider-tip-a" style={{ left: tipALeft }}>
            {Math.round(lo)}
          </span>
          <span className="slider-tip slider-tip-b" style={{ left: tipBLeft }}>
            {Math.round(hi)}
          </span>
        </>
      )}
      <div className="slider-range-track">
        <input
          ref={inputARef}
          type="range"
          className="slider slider-a"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={handleA}
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={hi}
          aria-valuenow={lo}
          style={{ '--pct-a': `${pctA}%`, '--pct-b': `${pctB}%` }}
          {...rest}
        />
        <input
          ref={inputBRef}
          type="range"
          className="slider slider-b"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleB}
          disabled={disabled}
          aria-valuemin={lo}
          aria-valuemax={max}
          aria-valuenow={hi}
        />
      </div>
      {showVal && (
        <>
          <span className="slider-val slider-val-a" style={{ left: tipALeft }}>
            {Math.round(lo)}
          </span>
          <span className="slider-val slider-val-b" style={{ left: tipBLeft }}>
            {Math.round(hi)}
          </span>
        </>
      )}
    </div>
  );
});

SliderRange.displayName = 'SliderRange';
SliderRange.propTypes = {
  min:          PropTypes.number,
  max:          PropTypes.number,
  step:         PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  value:        PropTypes.arrayOf(PropTypes.number),
  onChange:     PropTypes.func,
  size:         PropTypes.oneOf(['sm', 'md', 'lg']),
  showTip:      PropTypes.bool,
  showVal:      PropTypes.bool,
  disabled:     PropTypes.bool,
  className:    PropTypes.string,
};

export default Slider;
