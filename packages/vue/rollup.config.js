import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const extensions = ['.ts', '.tsx']

const noDeclarationFiles = { compilerOptions: { declaration: false } }

function baseConfig(isProd, type) {
	return {
		input: 'index.ts',
		output: {
			file: `dist/js/main.${type}.js`, // 输出的文件(如果没有这个参数,则直接输出到控制台)
			format: type, // Rollup 输出的文件类型
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
			isProd && terser(),
		],
	}
}

export default defineConfig([baseConfig(true, 'cjs'), baseConfig(true, 'esm')])
