import React from 'react';
import { Rail } from '../layout/Rail.jsx';

const frameworks = [
  {
    name: 'Vite + React',
    status: 'Full Support',
    tone: 'pill-patch',
    note: 'The reference setup — the design system, its Storybook and this site are all built on Vite.',
  },
  {
    name: 'Next.js',
    status: 'Full Support',
    tone: 'pill-patch',
    note: 'App Router and Pages Router both work. Components are client-side, so mark consuming files "use client".',
  },
  {
    name: 'Remix / React Router',
    status: 'Full Support',
    tone: 'pill-patch',
    note: 'Import the stylesheet through the root links export rather than a bare CSS import.',
  },
  {
    name: 'Create React App',
    status: 'Works, Unmaintained',
    tone: 'pill-minor',
    note: 'Nothing in the library breaks under CRA, but CRA itself is deprecated — new projects should start on Vite.',
  },
];

const requirements = [
  { label: 'REACT', value: '18 or 19', note: 'Hooks and forwardRef required' },
  { label: 'STYLING', value: 'Plain CSS', note: 'Tokens as custom properties — no Tailwind, no CSS-in-JS' },
  { label: 'BUNDLER', value: 'Any ESM', note: 'Ships ES modules only; no CommonJS build' },
  { label: 'REGISTRY', value: 'GitHub Packages', note: 'Scoped .npmrc entry required' },
];

const rail = [
  { id: 'frameworks', label: 'Supported Frameworks' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'ssr', label: 'Server Rendering' },
];

export default function FrameworkSupport() {
  return (
    <div className="page">
      <div>
        <div className="eyebrow">DOCS</div>
        <h1 className="page-title">Framework Support</h1>
        <p className="page-lede">
          The library is plain React plus plain CSS. Anything that renders React 18+ and can import a
          stylesheet will run it.
        </p>

        <section className="section" id="frameworks">
          <h2 className="section-title">Supported Frameworks</h2>
          <table className="spec">
            <thead>
              <tr>
                <th>Framework</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.name}>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{f.name}</td>
                  <td>
                    <span className={`pill ${f.tone}`}>{f.status}</span>
                  </td>
                  <td style={{ color: 'var(--color-subheading)', lineHeight: 1.6 }}>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section" id="requirements">
          <h2 className="section-title">Requirements</h2>
          <div className="card-grid">
            {requirements.map((r) => (
              <div className="card" key={r.label}>
                <div className="card-meta">{r.label}</div>
                <div className="card-name">{r.value}</div>
                <div className="card-desc">{r.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="ssr">
          <h2 className="section-title">Server Rendering</h2>
          <p className="section-lede">
            Every component is a client component — they hold local state, attach listeners, or read
            layout. Under the Next.js App Router, put <code>&quot;use client&quot;</code> at the top of
            the file that imports them. Components that measure or portal (DatePicker, Dropdown,
            Options, Tooltip, Snackbar) should not be rendered on the server at all; import them
            dynamically with <code>ssr: false</code> if a page needs them above the fold.
          </p>
        </section>
      </div>

      <Rail items={rail} />
    </div>
  );
}
