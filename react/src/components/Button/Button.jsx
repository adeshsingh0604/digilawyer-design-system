import React from 'react';
import './Button.css';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  onClick,
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading ? 'btn--loading' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
      aria-busy={loading || undefined}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && iconLeft && (
        <span className="btn__icon btn__icon--left">{iconLeft}</span>
      )}
      {children && <span className="btn__label">{children}</span>}
      {!loading && iconRight && (
        <span className="btn__icon btn__icon--right">{iconRight}</span>
      )}
    </button>
  );
}

export default Button;
