import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

function baseConfig(isProd, type) {
	return {
		input: 'src/index.ts', // 入口文件
		output: {
			file: isProd ? 'dist/markdown.min.js' : 'dist/markdown.js', // 输出的文件(如果没有这个参数,则直接输出到控制台)
			format: type, // Rollup 输出的文件类型
			name: 'markdown',
		},
		plugins: [
			typescript({
				tsconfigOverride: {
					compilerOptions: {
						module: 'ESNext',
					},
				},
				useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
			}),
			postcss({
				plugins: [autoprefixer(), cssnano()],
				extract: 'css/juejin.css',
				extensions: ['.css'],
			}),
			isProd && terser(),
		],
	}
}

export default defineConfig([baseConfig(true, 'esm'), baseConfig(false, 'esm')])
