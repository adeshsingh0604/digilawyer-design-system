import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Library build for publishing to GitHub Packages. Not used by Storybook —
// that has its own Vite instance via .storybook/main.js.
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // Never bundle these — they're peer/real dependencies the consumer's
      // own node_modules must supply, not copies baked into this package.
      external: ['react', 'react-dom', 'react/jsx-runtime', 'prop-types'],
    },
  },
});
