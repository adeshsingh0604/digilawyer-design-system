import React from 'react';
import PropTypes from 'prop-types';

// Inline kebab icon — 3 dots vertically, matches HTML docs sprite #ico-kebab
const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="3"  r="1.4" fill="currentColor"/>
    <circle cx="8" cy="8"  r="1.4" fill="currentColor"/>
    <circle cx="8" cy="13" r="1.4" fill="currentColor"/>
  </svg>
);

/**
 * Outer scroll wrapper. Required — applies 8px border-radius and overflow:hidden
 * because border-radius can't apply to <table> under border-collapse:collapse.
 */
export const TableWrap = React.forwardRef(function TableWrap(
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={['table-wrap', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
});

TableWrap.displayName = 'TableWrap';
TableWrap.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * The data grid. Always nest inside `<TableWrap>` for rounded corners.
 * Renders a native `<table>` with `.table` class.
 */
export const Table = React.forwardRef(function Table(
  { children, className, ...rest },
  ref
) {
  return (
    <table
      ref={ref}
      className={['table', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </table>
  );
});

Table.displayName = 'Table';
Table.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Flex wrapper used inside a `<td>` to align label + trailing action.
 * Use `end` to right-align (action-only columns with no leading label).
 */
export const TableCell = React.forwardRef(function TableCell(
  { children, end = false, className, ...rest },
  ref
) {
  const cls = [
    'table-cell',
    end && 'table-cell-end',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cls} {...rest}>
      {children}
    </div>
  );
});

TableCell.displayName = 'TableCell';
TableCell.propTypes = {
  children:  PropTypes.node,
  /** Flips justify-content to flex-end — use for action-only columns. */
  end:       PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Per-cell kebab (⋮) action button. Renders the inline KebabIcon automatically.
 * Pass `aria-label` that names the row the button acts on.
 * Use `hover` to force the hover visual at rest (documentation helper).
 */
export const TableCellAction = React.forwardRef(function TableCellAction(
  { hover = false, className, children, ...rest },
  ref
) {
  const cls = [
    'table-cell-action',
    hover && 'is-hover',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} type="button" className={cls} {...rest}>
      {children ?? <KebabIcon />}
    </button>
  );
});

TableCellAction.displayName = 'TableCellAction';
TableCellAction.propTypes = {
  /** Forces hover visual at rest — documentation helper. */
  hover:     PropTypes.bool,
  className: PropTypes.string,
  /** Defaults to the inline kebab icon when omitted. */
  children:  PropTypes.node,
};

export { KebabIcon };
export default Table;
