import React from 'react';
import PropTypes from 'prop-types';

// Inline separator icons — replace HTML sprite #ico-chev-right-thin / -thick
export const ChevronThinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronThickIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Nav wrapper. Always provide `aria-label` (e.g. `"Breadcrumb"`).
 * Add `.breadcrumb-sm` via `size="sm"` for 14/20 density.
 */
export const Breadcrumb = React.forwardRef(function Breadcrumb(
  { size, children, className, ...rest },
  ref
) {
  const cls = [
    'breadcrumb',
    size === 'sm' && 'breadcrumb-sm',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav ref={ref} className={cls} aria-label="Breadcrumb" {...rest}>
      {children}
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  /** `"sm"` drops to Body 2 (14/20). Default is Body 1 (16/24). */
  size:         PropTypes.oneOf(['sm']),
  /** Required — describe the nav landmark, e.g. `"Breadcrumb"` or `"Folder path"`. */
  'aria-label': PropTypes.string.isRequired,
  children:     PropTypes.node,
  className:    PropTypes.string,
};

/**
 * Ancestor link — renders an `<a>` by default.
 * Hover lifts colour to `--color-heading` and shows underline (CSS).
 * Use `hover` to force that visual at rest for static demos.
 */
export const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(
  { hover = false, children, className, ...rest },
  ref
) {
  const cls = [
    'breadcrumb-item',
    hover && 'is-hover',
    className,
  ].filter(Boolean).join(' ');

  return (
    <a ref={ref} className={cls} {...rest}>
      {children}
    </a>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = {
  /** Forces hover visual at rest — documentation helper. */
  hover:     PropTypes.bool,
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Separator between crumbs. Always `aria-hidden="true"`.
 * Pass any node: `<ChevronThinIcon />`, `<ChevronThickIcon />`, or `"/"`.
 * Defaults to `<ChevronThinIcon />` when no children are provided.
 */
export const BreadcrumbSeparator = React.forwardRef(function BreadcrumbSeparator(
  { children, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={['breadcrumb-separator', className].filter(Boolean).join(' ')}
      {...rest}
      aria-hidden="true"
    >
      {children ?? <ChevronThinIcon />}
    </span>
  );
});

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
BreadcrumbSeparator.propTypes = {
  /** Separator content. Defaults to ChevronThinIcon. */
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Current-page crumb. Non-interactive — renders a `<span>` with
 * `aria-current="page"`. Semi Bold in `--color-heading`.
 */
export const BreadcrumbCurrent = React.forwardRef(function BreadcrumbCurrent(
  { children, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={['breadcrumb-current', className].filter(Boolean).join(' ')}
      {...rest}
      aria-current="page"
    >
      {children}
    </span>
  );
});

BreadcrumbCurrent.displayName = 'BreadcrumbCurrent';
BreadcrumbCurrent.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Breadcrumb;
