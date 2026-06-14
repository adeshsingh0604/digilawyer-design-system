import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function getTextContent(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (node && node.props && node.props.children) return getTextContent(node.props.children);
  return '';
}

/**
 * Inline label chip for status, category, or metadata.
 *
 * 8 colors × 3 variants × 4 sizes. Renders as `<span>` by default (display-only).
 * Pass `as="button"` for clickable filter chips, or `onRemove` to get a trailing
 * remove × button automatically.
 *
 * **Usage rules:**
 * - Keep label to 1–2 words — Tags are at-a-glance indicators.
 * - Use consistent colour semantics: Red = error, Green = success, Yellow = warning.
 * - Never mix Filled and Outline variants in the same list.
 * - Never use colour as the only status signal — always include visible text.
 */
export const Tag = React.forwardRef(function Tag(
  {
    /** Semantic colour. */
    color = 'blue',
    /** Visual treatment. Filled = solid bg. Outline = tinted bg + border. Semi = tinted bg only. */
    variant = 'filled',
    /** lg = 6px padding · md = 4px (default) · sm = compact · xs = caption-sized. */
    size = 'md',
    /** Root element. Use "button" for interactive/clickable filter chips. */
    as: Tag = 'span',
    /** React node in the leading icon slot — inherits currentColor. */
    icon,
    /** React node in the trailing slot. Use for custom content; see also `onRemove`. */
    trailing,
    /**
     * If provided, renders a trailing × button with `aria-label="Remove {children}"`.
     * Mutually exclusive with `trailing` — `onRemove` takes precedence.
     */
    onRemove,
    /** The visible label text. Required. */
    children,
    /** Additional class names merged onto the root element. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'tag',
    `tag-${color}`,
    variant !== 'filled' && `tag-${variant}`,
    size !== 'md' && `tag-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (process.env.NODE_ENV !== 'production' && as === 'button' && onRemove) {
    console.warn('[Tag] as="button" + onRemove nests a <button> inside a <button> — invalid HTML. Use the default as="span" when onRemove is provided.');
  }

  const trailingContent = onRemove ? (
    <button
      type="button"
      className="tag-trailing"
      onClick={onRemove}
      aria-label={`Remove ${getTextContent(children) || 'item'}`}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', color: 'inherit' }}
    >
      <CloseIcon />
    </button>
  ) : trailing != null ? (
    <span className="tag-trailing">{trailing}</span>
  ) : null;

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {icon != null && <span className="tag-leading">{icon}</span>}
      {children}
      {trailingContent}
    </Tag>
  );
});

Tag.displayName = 'Tag';

Tag.propTypes = {
  color:     PropTypes.oneOf(['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'grey', 'black']),
  variant:   PropTypes.oneOf(['filled', 'outline', 'semi']),
  size:      PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  as:        PropTypes.oneOf(['span', 'button']),
  icon:      PropTypes.node,
  trailing:  PropTypes.node,
  onRemove:  PropTypes.func,
  children:  PropTypes.node,
  className: PropTypes.string,
};

Tag.defaultProps = {
  color:   'blue',
  variant: 'filled',
  size:    'md',
  as:      'span',
};

export default Tag;
