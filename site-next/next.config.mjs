import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * The design system's real source, not a copy.
 *
 * Carried over from the Vite site's `@ds` alias: every preview tile mounts
 * `../react/src` directly, so a preview cannot silently drift from what the
 * package ships. It also means Next has to compile JSX that lives *outside*
 * this project folder, which is why `turbopack.root` is lifted to the repo
 * root below — without it the loader refuses files above the app directory.
 */
const dsSource = path.resolve(here, '../react/src');
// Copy-paste block sources, aliased the same way site/vite.config.js does them.
const blocksSource = path.resolve(here, '../blocks');
const appSource = path.resolve(here, 'src');
const repoRoot = path.resolve(here, '..');

// GitHub Pages serves this repo from adeshsingh0604.github.io/digilawyer-design-system/,
// so a static export needs every asset and route prefixed with that path.
// Empty in local dev (npm run dev / plain `next build`), set by the deploy workflow.
const basePath = process.env.NEXT_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  // Static export writes each route as its own directory + index.html — required
  // for GitHub Pages to resolve /components/button/ without a rewrite rule.
  trailingSlash: true,

  // Widen the compilation root to the repo so ../react/src and the
  // ../docs/shared token CSS it @imports are both in scope.
  // Both the bare and wildcard forms are listed deliberately. Webpack treats
  // an alias as a prefix and covers `@ds` + `@ds/styles.css` with one entry;
  // Turbopack matches literally, so the subpath form has to be spelled out.
  turbopack: {
    root: repoRoot,
    resolveAlias: {
      '@ds': '../react/src',
      '@ds/*': '../react/src/*',
      // Block sources import the design system by its published name, so the code
      // shown on the site is exactly what gets pasted into a prototype.
      '@adeshsingh0604/digilawyer-ds': '../react/src',
      '@blocks': '../blocks',
      '@blocks/*': '../blocks/*',
      '@': './src',
      '@/*': './src/*',
    },
  },

  // Webpack fallback — only used if the build is run with --webpack.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ds': dsSource,
      '@adeshsingh0604/digilawyer-ds': dsSource,
      '@blocks': blocksSource,
      '@': appSource,
    };
    return config;
  },

  // The dev overlay badge renders inside every block preview iframe, which
  // makes the showroom unreadable while working. Dev-only setting; production
  // builds never had it.
  devIndicators: false,

  outputFileTracingRoot: repoRoot,
};

export default nextConfig;
