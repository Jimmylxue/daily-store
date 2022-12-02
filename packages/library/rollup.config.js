import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

const extensions = ['.ts', '.tsx']

const noDeclarationFiles = { compilerOptions: { declaration: false } }

function baseConfig(isProd, type) {
	return {
		input: 'index.ts',
		output: {
			file: 'dist/js/main.umd.js', // 输出的文件(如果没有这个参数,则直接输出到控制台)
			format: 'umd', // Rollup 输出的文件类型
			name: 'snow_animate',
		},
		// external,
		plugins: [
			nodeResolve({
				extensions,
			}),
			commonjs(),
			// 将ts声明文件单独提出一份
			typescript(
				isProd && type === 'cjs'
					? { useTsconfigDeclarationDir: true }
					: { tsconfigOverride: noDeclarationFiles }
			),
			babel({
				extensions,
				plugins: [['@babel/plugin-transform-runtime']],
				babelHelpers: 'runtime',
			}),
			postcss(),
			// eslint({
			// 	throwOnError: true,
			// 	throwOnWarning: true,
			// 	include: ['src/**'],
			// 	exclude: ['node_modules/**'],
			// }),
			isProd && terser(),
		],
	}
}

export default defineConfig([
	baseConfig(true, 'cjs'),
	// processConfig(true, 'cjs'),
])
