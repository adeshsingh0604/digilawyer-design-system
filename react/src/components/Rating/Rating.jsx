import React, { useState } from 'react';
import PropTypes from 'prop-types';

// ── Inline SVG icons (sprite-free, self-contained) ───────────────────────────

const StarFill = () => (
  <path
    d="M12 2L15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"
  />
);

const StarStroke = () => (
  <path
    d="M12 2L15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
  />
);

const StarHalf = () => (
  <>
    <path d="M12 2L8.91 8.26 2 9.27 7 14.14 5.82 21.02 12 17.77Z" fill="currentColor" />
    <path
      d="M12 2L15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
    />
  </>
);

const HeartFill = () => (
  <path
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
    fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"
  />
);

const HeartStroke = () => (
  <path
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
  />
);

const HeartHalf = () => (
  <>
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08Z"
      fill="currentColor"
    />
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
    />
  </>
);

const ICONS = {
  star:  { fill: StarFill,  half: StarHalf,  stroke: StarStroke  },
  heart: { fill: HeartFill, half: HeartHalf, stroke: HeartStroke },
};

function RatingIcon({ shape, state }) {
  const set = ICONS[shape];
  const Inner = state === 'filled' ? set.fill : state === 'half' ? set.half : set.stroke;
  return (
    <svg className="rating-icon" viewBox="0 0 24 24" aria-hidden="true">
      <Inner />
    </svg>
  );
}

/**
 * Star or heart rating — display or interactive.
 *
 * Two shapes: `star` (default) · `heart`.
 * Three colour variants: `yellow` (default) · `red` · `brand`.
 * Three sizes: `lg` = 24px · `md` = 20px (default) · `sm` = 16px.
 *
 * **Usage rules:**
 * - Set `readOnly` when displaying an average score (no interaction).
 * - Set `half` to allow half-step selection or display (e.g. 3.5 stars).
 * - Use Yellow stars for product ratings, Red hearts for likes / favourites.
 * - Pass `aria-label` to override the auto-generated label.
 * - Always wrap in a `<label>` or labelled form group when collecting input.
 */
export const Rating = React.forwardRef(function Rating(
  {
    /** Number of rating items. */
    count = 5,
    /** Controlled value (supports half-steps). */
    value: valueProp,
    /** Uncontrolled starting value. */
    defaultValue = 0,
    /** Called with the new numeric value on click. */
    onChange,
    /** Icon shape. */
    shape = 'star',
    /** Colour variant. */
    color = 'yellow',
    /** Icon size. */
    size = 'md',
    /** Allow half-step selection/display (hover left half = n-0.5). */
    half = false,
    /** Display-only mode — no hover or click interaction. */
    readOnly = false,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState(null);

  const committed = isControlled ? valueProp : internal;
  const display   = hovered !== null ? hovered : committed;

  const interactive = !readOnly && !disabled;

  function getState(index) {
    if (display >= index)         return 'filled';
    if (half && display >= index - 0.5) return 'half';
    return 'empty';
  }

  function handleMouseMove(e, index) {
    if (!interactive) return;
    if (!half) { setHovered(index); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered(e.clientX - rect.left < rect.width / 2 ? index - 0.5 : index);
  }

  function handleClick(e, index) {
    if (!interactive) return;
    let v = index;
    if (half) {
      const rect = e.currentTarget.getBoundingClientRect();
      v = e.clientX - rect.left < e.currentTarget.offsetWidth / 2 ? index - 0.5 : index;
    }
    if (!isControlled) setInternal(v);
    onChange?.(v);
  }

  const wrapperClass = [
    'rating',
    `rating-${color}`,
    size === 'lg' && 'rating-lg',
    size === 'sm' && 'rating-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const shapeLabel = shape === 'heart' ? 'hearts' : 'stars';
  const autoLabel  = `${committed} out of ${count} ${shapeLabel}`;

  return (
    <div
      ref={ref}
      className={wrapperClass}
      aria-label={rest['aria-label'] ?? autoLabel}
      aria-readonly={readOnly || undefined}
      onMouseLeave={interactive ? () => setHovered(null) : undefined}
      {...rest}
    >
      {Array.from({ length: count }, (_, i) => {
        const index = i + 1;
        const state = getState(index);
        const itemClass = [
          'rating-item',
          state === 'filled' && 'is-filled',
          state === 'half'   && 'is-half',
        ]
          .filter(Boolean)
          .join(' ');

        const Tag = interactive ? 'button' : 'span';

        return (
          <Tag
            key={index}
            type={interactive ? 'button' : undefined}
            className={itemClass}
            onMouseMove={interactive ? (e) => handleMouseMove(e, index) : undefined}
            onClick={interactive ? (e) => handleClick(e, index) : undefined}
            aria-label={`${index} ${shapeLabel}`}
            aria-pressed={interactive ? committed >= index : undefined}
          >
            <RatingIcon shape={shape} state={state} />
          </Tag>
        );
      })}
    </div>
  );
});

Rating.displayName = 'Rating';
Rating.propTypes = {
  count:        PropTypes.number,
  value:        PropTypes.number,
  defaultValue: PropTypes.number,
  onChange:     PropTypes.func,
  shape:        PropTypes.oneOf(['star', 'heart']),
  color:        PropTypes.oneOf(['yellow', 'red', 'brand']),
  size:         PropTypes.oneOf(['lg', 'md', 'sm']),
  half:         PropTypes.bool,
  readOnly:     PropTypes.bool,
  disabled:     PropTypes.bool,
  className:    PropTypes.string,
};

export default Rating;
