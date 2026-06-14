import React from 'react';
import PropTypes from 'prop-types';

/**
 * Inline text hyperlink. Three colour variants × four sizes.
 *
 * Use `as="a"` (default) for navigation. Use `as="button"` for in-page
 * actions styled as links — the `disabled` attribute works natively on button.
 *
 * For disabled `<a>` elements, set `disabled` — the component automatically
 * applies `aria-disabled="true"` and `tabIndex={-1}`.
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

  const anchorProps = Tag === 'a' && disabled
    ? { 'aria-disabled': true, tabIndex: -1 }
    : {};

  const buttonProps = Tag === 'button'
    ? { type: 'button', disabled: disabled || undefined }
    : {};

  return (
    <Tag ref={ref} className={cls} {...anchorProps} {...buttonProps} {...rest}>
      {leading  != null && <span className="link-icon">{leading}</span>}
      {children}
      {trailing != null && <span className="link-icon">{trailing}</span>}
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
