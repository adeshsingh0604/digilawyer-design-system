'use client';
// uses browser APIs / React state.

import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { CommandBlock, CodeBlock } from './Copyable.jsx';
import { Icon } from './icons.jsx';

const PKG = '@adeshsingh0604/digilawyer-ds';

const installCommand = (pm) =>
  ({
    npm: `npm install ${PKG}`,
    pnpm: `pnpm add ${PKG}`,
    yarn: `yarn add ${PKG}`,
    bun: `bun add ${PKG}`,
  })[pm];

/**
 * One preview tile: the live component on a stage, with a code affordance that
 * opens the install command and the exact source for that variant.
 */
export function VariantCard({ variant }) {
  const [open, setOpen] = useState(false);
  const [pm, setPm] = useState('npm');

  return (
    <>
      <div className="variant-card" data-wide={variant.wide || undefined}>
        <div className="variant-head">
          <span className="variant-name">{variant.name}</span>
          <button
            type="button"
            className="dlui-iconbtn"
            style={{ marginLeft: 'auto' }}
            onClick={() => setOpen(true)}
            aria-label={`View code for ${variant.name}`}
            title="View code"
          >
            <Icon.code />
          </button>
        </div>
        <div className="variant-stage">{variant.render()}</div>
      </div>

      {open && (
        <Modal title="Install & code" onClose={() => setOpen(false)}>
          <div className="modal-body">
            <div className="modal-label">INSTALL THE LIBRARY</div>
            <CommandBlock command={installCommand} pm={pm} onPm={setPm} />
            <p
              style={{
                margin: '10px 2px 0',
                color: 'var(--color-subheading)',
                fontSize: 12.5,
                lineHeight: 1.6,
              }}
            >
              The package is published to GitHub Packages. Point the{' '}
              <code style={{ fontFamily: 'var(--site-mono)' }}>@adeshsingh0604</code> scope at{' '}
              <code style={{ fontFamily: 'var(--site-mono)' }}>npm.pkg.github.com</code> in your{' '}
              <code style={{ fontFamily: 'var(--site-mono)' }}>.npmrc</code> first — see{' '}
              Installation.
            </p>

            <div className="modal-label">SOURCE</div>
            <CodeBlock code={variant.code} filename={variant.file} />
          </div>
        </Modal>
      )}
    </>
  );
}

export { installCommand };
