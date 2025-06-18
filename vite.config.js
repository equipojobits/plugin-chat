import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/chat/index.ts'),
      name: 'pluginChat',
      fileName: () => 'main.umd.js',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
    minify: true,
  },
});
