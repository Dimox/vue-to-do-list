import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { run } from 'vite-plugin-run'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    run([
      {
        name: 'svg sprite is changed',
        run: ['pnpm generate-icon-types'],
        pattern: ['src/assets/img/sprite.svg'],
        startup: false,
        build: false,
      },
    ]),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
})
