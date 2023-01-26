import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import markdownPlugin from 'snow-react-markdown'
// import markdownPlugin from '@daily-store/snow-vite-plugin/packages/markdown'
// import markdownPlugin from './src/pages/vite/markdown/index.ts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// markdownPlugin(),
		react({
			babel: {
				babelrc: true, // 开启babelrc 配置
			},
		}),
	],
})
