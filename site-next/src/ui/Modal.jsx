'use client';
// uses browser APIs / React state.

import React, { useEffect, useRef } from 'react';
import { Icon } from './icons.jsx';

/** Overlay dialog with escape-to-close, click-outside and focus capture. */
export function Modal({ title, onClose, children, labelledBy = 'modal-title' }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelledBy : undefined}
        tabIndex={-1}
        ref={ref}
      >
        {title && (
          <div className="modal-head">
            <span className="modal-title" id={labelledBy}>
              {title}
            </span>
            <button
              type="button"
              className="dlui-iconbtn"
              style={{ marginLeft: 'auto' }}
              onClick={onClose}
              aria-label="Close"
            >
              <Icon.close />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
