import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vue-localer.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', ...Object.keys(pkg.dependencies)],
    },
  },
  plugins: [
    vue(),
    dts({
      exclude: ['**/__tests__/**'],
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      exclude: ['examples'],
    },
  },
});
