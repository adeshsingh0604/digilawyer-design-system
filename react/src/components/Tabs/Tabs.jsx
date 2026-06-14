import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tab list wrapper — flex row with a shared bottom hairline.
 *
 * Always pass `aria-label` to name the group for screen readers.
 * Each direct child should be a `<Tab>`.
 */
export const Tabs = React.forwardRef(function Tabs(
  { children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={['tabs', className].filter(Boolean).join(' ')} {...rest} role="tablist">
      {children}
    </div>
  );
});

Tabs.displayName = 'Tabs';
Tabs.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Individual tab button inside a `<Tabs>` row.
 *
 * Three sizes × four states. Supports horizontal (default) and vertical
 * (icon stacked above label) alignment. Composes with `<Badge>` via the
 * `badge` prop — auto-scales to the correct height per size.
 *
 * **Usage rules:**
 * - Always set `aria-selected` and `aria-controls` on each Tab.
 * - Mark the active tab with `selected` — drives the bottom-border accent.
 * - Use `vertical` only when all tabs in the row are vertical.
 * - Pass `id` so the paired TabPanel can reference it via `aria-labelledby`.
 */
export const Tab = React.forwardRef(function Tab(
  {
    /** lg = 48px · md = 40px (default) · sm = 32px. */
    size = 'md',
    /** Marks this tab as active — sets aria-selected="true" and solid bottom border. */
    selected = false,
    /** Visually disables the tab. Uses aria-disabled + .is-disabled (not native disabled) to keep it keyboard-reachable. */
    disabled = false,
    /** Stacks icon above label instead of beside it. Wrap label + badge in tab-label-row automatically. */
    vertical = false,
    /** Leading icon node — rendered in a .tab-icon slot. */
    icon,
    /** Badge node — use `<Badge variant="label" color="info">` for counts. */
    badge,
    /** Tab label text. */
    children,
    /** Additional class names. */
    className,
    onClick,
    ...rest
  },
  ref
) {
  const classes = [
    'tab',
    size === 'lg' && 'tab-lg',
    size === 'sm' && 'tab-sm',
    vertical && 'tab-vertical',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      className={classes}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {icon != null && <span className="tab-icon">{icon}</span>}
      {vertical ? (
        <span className="tab-label-row">
          {children}
          {badge != null && badge}
        </span>
      ) : (
        <>
          {children}
          {badge != null && badge}
        </>
      )}
    </button>
  );
});

Tab.displayName = 'Tab';
Tab.propTypes = {
  size:      PropTypes.oneOf(['lg', 'md', 'sm']),
  selected:  PropTypes.bool,
  disabled:  PropTypes.bool,
  vertical:  PropTypes.bool,
  icon:      PropTypes.node,
  badge:     PropTypes.node,
  children:  PropTypes.node,
  className: PropTypes.string,
  onClick:   PropTypes.func,
};

/**
 * Content panel controlled by a Tab.
 *
 * Set `role="tabpanel"`, `id` (referenced by Tab's `aria-controls`),
 * and `aria-labelledby` (Tab's id). Pass `hidden` to hide inactive panels.
 */
export const TabPanel = React.forwardRef(function TabPanel(
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={className}
      tabIndex={0}
      {...rest}
      role="tabpanel"
    >
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';
TabPanel.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
};

export default Tabs;
