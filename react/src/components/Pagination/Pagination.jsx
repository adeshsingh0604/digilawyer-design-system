import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Navigation wrapper for a pagination row.
 *
 * Renders a `<nav role="navigation">`. Three densities: lg = 40px,
 * md = 36px (default), sm = 32px — the size cascade is owned by this
 * wrapper and flows down to all child buttons automatically.
 *
 * **Usage rules:**
 * - Always pass `aria-label` (e.g. "Pagination") to name the landmark.
 * - Do NOT pass size modifiers on inner buttons — the wrapper drives them.
 * - Use `PaginationPrev` / `PaginationNext` at the edges, `PaginationItem`
 *   for page numbers, and `PaginationEllipsis` to truncate long ranges.
 */
export const Pagination = React.forwardRef(function Pagination(
  {
    /** lg = 40px · md = 36px (default) · sm = 32px. */
    size = 'md',
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'pagination',
    size === 'lg' && 'pagination-lg',
    size === 'sm' && 'pagination-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav ref={ref} role="navigation" className={classes} {...rest}>
      {children}
    </nav>
  );
});

Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  size:      PropTypes.oneOf(['lg', 'md', 'sm']),
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Individual page-number button.
 *
 * Renders as `.btn.btn-ghost.btn-square` by default; switches to
 * `.btn.btn-primary.btn-square` when `current` is true. `aria-current="page"`
 * is set automatically on the active page.
 */
export const PaginationItem = React.forwardRef(function PaginationItem(
  {
    /** Marks this as the current (active) page — primary style + aria-current. */
    current = false,
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'btn',
    current ? 'btn-primary' : 'btn-ghost',
    'btn-square',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {children}
    </button>
  );
});

PaginationItem.displayName = 'PaginationItem';
PaginationItem.propTypes = {
  current:   PropTypes.bool,
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Previous-page button with a leading left-chevron icon.
 *
 * Disable when on the first page: `disabled` (native disabled is correct
 * here — Previous/Next are navigation triggers, not selection items).
 */
export const PaginationPrev = React.forwardRef(function PaginationPrev(
  { children = 'Previous', className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['btn', 'btn-ghost', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="icon"><ChevronLeft /></span>
      {children}
    </button>
  );
});

PaginationPrev.displayName = 'PaginationPrev';
PaginationPrev.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Next-page button with a trailing right-chevron icon.
 *
 * Disable when on the last page: `disabled`.
 */
export const PaginationNext = React.forwardRef(function PaginationNext(
  { children = 'Next', className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['btn', 'btn-ghost', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      <span className="icon"><ChevronRight /></span>
    </button>
  );
});

PaginationNext.displayName = 'PaginationNext';
PaginationNext.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Non-interactive ellipsis separator for truncated page ranges.
 *
 * Automatically marked `aria-hidden` — it carries no information for
 * screen readers beyond what the surrounding page numbers already convey.
 */
export const PaginationEllipsis = React.forwardRef(function PaginationEllipsis(
  { className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={['pagination-ellipsis', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...rest}
    >
      …
    </span>
  );
});

PaginationEllipsis.displayName = 'PaginationEllipsis';
PaginationEllipsis.propTypes = {
  className: PropTypes.string,
};

export default Pagination;
