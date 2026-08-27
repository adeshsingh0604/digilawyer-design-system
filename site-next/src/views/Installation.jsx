'use client';
// uses browser APIs / React state.

import React, { useState } from 'react';
import { Rail } from '../layout/Rail.jsx';
import { Tabs, CommandBlock, CodeBlock } from '../ui/Copyable.jsx';

const PKG = '@adeshsingh0604/digilawyer-ds';

const scaffold = {
  'Next.js': {
    npm: 'npx create-next-app@latest my-app',
    pnpm: 'pnpm create next-app my-app',
    yarn: 'yarn create next-app my-app',
    bun: 'bun create next-app my-app',
  },
  Vite: {
    npm: 'npm create vite@latest my-app -- --template react',
    pnpm: 'pnpm create vite my-app --template react',
    yarn: 'yarn create vite my-app --template react',
    bun: 'bun create vite my-app --template react',
  },
};

const install = {
  npm: `npm install ${PKG}`,
  pnpm: `pnpm add ${PKG}`,
  yarn: `yarn add ${PKG}`,
  bun: `bun add ${PKG}`,
};

const NPMRC = `@adeshsingh0604:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`;

const ENTRY = `// main.jsx — import the stylesheet once, at the root of your app
import React from 'react';
import ReactDOM from 'react-dom/client';
import '${PKG}/styles.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

const USAGE = `import { Button, Alert, Tag } from '${PKG}';

export default function App() {
  return (
    <div style={{ padding: 32, display: 'grid', gap: 16 }}>
      <Alert color="info" variant="semi" title="Notice scheduled">
        Your legal notice will be dispatched on 20 August 2026.
      </Alert>

      <div style={{ display: 'flex', gap: 8 }}>
        <Tag color="blue" variant="semi">Draft</Tag>
        <Tag color="green" variant="semi">Verified</Tag>
      </div>

      <Button variant="primary">Send Notice</Button>
    </div>
  );
}`;

const DARK = `<!-- Dark mode is a single attribute on the root element -->
<html data-theme="dark">`;

const rail = [
  { id: 'new-project', label: 'Start a New Project' },
  { id: 'existing-project', label: 'Add to Existing Project' },
  { id: 'dark-mode', label: 'Dark Mode' },
  { id: 'usage', label: 'Usage Example' },
];

export default function Installation() {
  const [framework, setFramework] = useState('Next.js');
  const [pm, setPm] = useState('npm');
  const [pm2, setPm2] = useState('npm');

  return (
    <div className="page">
      <div>
        <div className="eyebrow">DOCS</div>
        <h1 className="page-title">Installation</h1>
        <p className="page-lede">
          Build consistent legal-tech interfaces without rebuilding the basics. Follow these steps to
          start a new project, or to add the DigiLawyer Design System to one you already have.
        </p>

        <section className="section" id="new-project">
          <div className="eyebrow">GETTING STARTED</div>
          <h2 className="section-title">Start a New Project</h2>
          <p className="section-lede">
            Scaffold a React app, authenticate against GitHub Packages, then install the library.
          </p>

          <div className="step">
            <div className="step-tag">STEP 1</div>
            <h3 className="step-title">Scaffold your project</h3>
            <p className="step-note">Choose your framework and run the create command.</p>
            <Tabs options={Object.keys(scaffold)} value={framework} onChange={setFramework} />
            <CommandBlock command={(p) => scaffold[framework][p]} pm={pm} onPm={setPm} />
          </div>

          <div className="step">
            <div className="step-tag">STEP 2</div>
            <h3 className="step-title">Point the scope at GitHub Packages</h3>
            <p className="step-note">
              The library is published to GitHub Packages rather than the public npm registry, so the{' '}
              <code>@adeshsingh0604</code> scope needs its own registry line. Add an{' '}
              <code>.npmrc</code> at the project root, with a personal access token that carries the{' '}
              <code>read:packages</code> scope.
            </p>
            <CodeBlock code={NPMRC} filename=".npmrc" />
          </div>

          <div className="step">
            <div className="step-tag">STEP 3</div>
            <h3 className="step-title">Install the library</h3>
            <CommandBlock command={(p) => install[p]} pm={pm} onPm={setPm} />
          </div>

          <div className="step">
            <div className="step-tag">STEP 4</div>
            <h3 className="step-title">Import the stylesheet once</h3>
            <p className="step-note">
              One import at your app root brings in every design token and all component styles.
              Importing it per-component is unnecessary and will cost you duplicate CSS.
            </p>
            <CodeBlock code={ENTRY} filename="main.jsx" />
          </div>
        </section>

        <section className="section" id="existing-project">
          <div className="eyebrow">EXISTING CODEBASE</div>
          <h2 className="section-title">Add to Existing Project</h2>
          <p className="section-lede">
            Already running React 18 or 19? Two steps: authenticate, then install.
          </p>

          <div className="step">
            <div className="step-tag">STEP 1</div>
            <h3 className="step-title">Add the registry line</h3>
            <CodeBlock code={NPMRC} filename=".npmrc" />
          </div>

          <div className="step">
            <div className="step-tag">STEP 2</div>
            <h3 className="step-title">Install and import</h3>
            <CommandBlock command={(p) => install[p]} pm={pm2} onPm={setPm2} />
            <CodeBlock code={`import '${PKG}/styles.css';`} filename="main.jsx" />
          </div>
        </section>

        <section className="section" id="dark-mode">
          <div className="eyebrow">THEMING</div>
          <h2 className="section-title">Dark Mode</h2>
          <p className="section-lede">
            Every colour in the system resolves from a CSS custom property. Dark mode swaps the token
            values on the root element — no component takes a theme prop, and nothing needs to
            re-render.
          </p>
          <CodeBlock code={DARK} filename="index.html" />
        </section>

        <section className="section" id="usage">
          <div className="eyebrow">USAGE</div>
          <h2 className="section-title">Usage Example</h2>
          <p className="section-lede">
            Components are named exports from the package root. Import what you need.
          </p>
          <CodeBlock code={USAGE} filename="App.jsx" />
        </section>
      </div>

      <Rail items={rail} />
    </div>
  );
}
