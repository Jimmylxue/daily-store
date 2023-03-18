import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path'
import { ROOT_DIR, PAGES } from './config'


// https://vitejs.dev/config/
export default defineConfig({
  // 开发相关
  envPrefix: 'APP_',
  // root:'',
  // root: resolve(__dirname,'./dist'),
  resolve: {
    alias: PAGES.reduce(
      (map, o) => {
        map[`@p-${o.name}`] = path.resolve(ROOT_DIR, `src/pages/${o.name}`)
        return map
      },
      {
        '@': path.resolve(ROOT_DIR, 'src'),
      }
    ),
  },
  server: {
    // @ts-ignore
    port: +process.env.PORT || 3000,
    // open: true,
    proxy: {
      '/api/': {
        target: 'http://sss-test.sh-internal.com',
        changeOrigin: true,
        // ws: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      // 多页支持
      input: PAGES.reduce((map, { name }) => {
        map[name] = path.resolve(ROOT_DIR, `${name}.html`)
        return map
      }, {}),
    },
  },
})
