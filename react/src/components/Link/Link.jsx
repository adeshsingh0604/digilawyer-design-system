import React from 'react';
import PropTypes from 'prop-types';

/**
 * Inline text hyperlink. Three colour variants × four sizes.
 *
 * Use `as="a"` (default) for navigation. Use `as="button"` for in-page
 * actions styled as links.
 *
 * The `disabled` prop always adds `aria-disabled="true"`. On `<a>` and custom
 * elements it also sets `tabIndex={-1}`; on `<button>` it sets native `disabled`.
 */
export const Link = React.forwardRef(function Link(
  {
    color = 'default',
    size,
    underline = false,
    disabled = false,
    hover = false,
    leading,
    trailing,
    as: Tag = 'a',
    children,
    className,
    ...rest
  },
  ref
) {
  const cls = [
    'link',
    color === 'brand' && 'link-brand',
    color === 'blue'  && 'link-blue',
    size === 'sm'  && 'link-sm',
    size === 'xs'  && 'link-xs',
    size === 'xxs' && 'link-xxs',
    underline && 'link-underline',
    hover    && 'is-hover',
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  // type="button" can be overridden by the caller via rest
  const defaultProps = Tag === 'button' ? { type: 'button' } : {};

  // Applied after rest so the caller cannot accidentally cancel the disabled state
  const stateProps = disabled
    ? {
        'aria-disabled': 'true',
        ...(Tag !== 'button' && { tabIndex: -1 }),
      }
    : {};

  return (
    <Tag
      ref={ref}
      className={cls}
      {...defaultProps}
      {...rest}
      {...stateProps}
      disabled={Tag === 'button' ? (disabled || undefined) : undefined}
    >
      {leading  != null && leading  !== false && <span className="link-icon">{leading}</span>}
      {children}
      {trailing != null && trailing !== false && <span className="link-icon">{trailing}</span>}
    </Tag>
  );
});

Link.displayName = 'Link';
Link.propTypes = {
  /** Colour variant. */
  color:     PropTypes.oneOf(['default', 'brand', 'blue']),
  /** Typography size. Omit for default Body 1 (16/24). */
  size:      PropTypes.oneOf(['sm', 'xs', 'xxs']),
  /** Pin the underline at rest. */
  underline: PropTypes.bool,
  /** Disabled state — blocks pointer events, adds aria-disabled on `<a>`. */
  disabled:  PropTypes.bool,
  /** Forces hover visual at rest — documentation helper. */
  hover:     PropTypes.bool,
  /** Leading icon node, wrapped in `.link-icon`. */
  leading:   PropTypes.node,
  /** Trailing icon node, wrapped in `.link-icon`. */
  trailing:  PropTypes.node,
  /** Root element. Use `"button"` for in-page actions. */
  as:        PropTypes.elementType,
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Link;
