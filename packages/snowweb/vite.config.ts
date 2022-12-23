import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdownPlugin from './src/pages/vite/plugin-dev/markdown'

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
