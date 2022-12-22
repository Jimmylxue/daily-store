import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
	input: 'src/SConsole/index.ts', // 入口文件
	output: {
		file: 'dist/js/SConsole.cjs', // 输出的文件(如果没有这个参数,则直接输出到控制台)
		format: 'cjs', // Rollup 输出的文件类型
		name: 'SConsole',
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
	],
}
