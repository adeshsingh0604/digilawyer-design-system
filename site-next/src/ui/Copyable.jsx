'use client';
// uses browser APIs / React state.

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './icons.jsx';

/** Copy button that reverts to its idle icon after a beat. */
export function CopyButton({ value, label = 'Copy' }) {
  const [done, setDone] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className="dlui-iconbtn"
      data-done={done}
      aria-label={done ? 'Copied' : label}
      title={done ? 'Copied' : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          // Clipboard can be blocked (insecure origin, denied permission).
          // Fall back to a selection the user can copy by hand.
          const ta = document.createElement('textarea');
          ta.value = value;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <Icon.check /> : <Icon.copy />}
    </button>
  );
}

/** Segmented pill control. */
export function Tabs({ options, value, onChange, ghost = false }) {
  return (
    <div className={ghost ? 'dlui-tabs dlui-tabs-ghost' : 'dlui-tabs'} role="tablist">
      {options.map((o) => {
        const key = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={value === key}
            data-on={value === key}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** Terminal-style single command with package-manager tabs above it. */
export function CommandBlock({ command, pm, onPm, pms = ['npm', 'pnpm', 'yarn', 'bun'] }) {
  const text = typeof command === 'function' ? command(pm) : command;
  return (
    <div className="cmd">
      <div className="cmd-head">
        <Tabs options={pms} value={pm} onChange={onPm} ghost />
        <CopyButton value={text} label="Copy command" />
      </div>
      <div className="cmd-body">
        <span className="cmd-prompt">$</span>
        <span className="cmd-text">{text}</span>
      </div>
    </div>
  );
}

/** Line-numbered source block. */
export function CodeBlock({ code, filename }) {
  const lines = code.replace(/\n$/, '').split('\n');
  return (
    <div className="code">
      {filename && (
        <div className="code-head">
          <Icon.code />
          <span>{filename}</span>
          <CopyButton value={code} label="Copy code" />
        </div>
      )}
      <div className="code-body">
        {lines.map((line, i) => (
          <div className="code-line" key={i}>
            <span className="code-num">{i + 1}</span>
            <span>{line || ' '}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
