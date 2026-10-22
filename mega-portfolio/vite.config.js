import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// SINGLE=1 npm run build  -> one self-contained index.html (used for the published artifact)
// npm run build           -> normal multi-file build in dist/ (use this for GitHub Pages / Netlify)
const single = process.env.SINGLE === '1';

export default defineConfig({
  base: './',
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  build: {
    outDir: single ? 'dist-single' : 'dist',
    assetsInlineLimit: single ? 100_000_000 : 4096,
    chunkSizeWarningLimit: 2000,
  },
});
