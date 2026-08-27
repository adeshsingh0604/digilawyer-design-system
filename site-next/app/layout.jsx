// The design system's own tokens and component styles, straight from source.
// This file @imports ../../docs/shared/tokens.css + components.css, so the
// whole token chain resolves from here.
import '@ds/styles.css';
// Docs-site chrome, layered on top — same order as the Vite site's main.jsx.
import '@/styles/site.css';

export const metadata = {
  title: 'DigiLawyer UI — React Components, Blocks & Templates',
  description:
    'The DigiLawyer Design System: 25 production React components, plus blocks, dashboards and templates.',
};

/**
 * Theme restore, pre-paint.
 *
 * Must stay inline and ahead of everything else so `data-theme` is set before
 * the first paint — React mounting later is far too late and the page flashes
 * the wrong theme on every load. Key is `ds-theme`, the same one
 * docs/shared/ds.js uses, so a theme chosen on the static docs site carries
 * over on a shared origin.
 */
const themeScript = `(function(){try{var s=localStorage.getItem('ds-theme');document.documentElement.setAttribute('data-theme',s==='light'||s==='dark'?s:'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
