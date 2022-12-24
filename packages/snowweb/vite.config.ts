import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdownPlugin from '@daily-store/snow-vite-plugin/packages/markdown/index.js'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		markdownPlugin(),
		react({
			babel: {
				babelrc: true, // 开启babelrc 配置
			},
		}),
	],
})
