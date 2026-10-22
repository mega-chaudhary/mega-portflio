import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// npm run build:onefile -> one readable index.html (nothing minified) in dist-onefile/
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-onefile', minify: false, assetsInlineLimit: 100000000, chunkSizeWarningLimit: 100000 },
});
