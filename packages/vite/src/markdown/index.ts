import { Plugin } from 'vite'
import { getMdList, isUnTransform, parseMarkDown } from './core/match'

export default function markdownPlugin(): Plugin {
	const mdRelationMap = new Map<string, string>()

	return {
		name: 'snow-vite:markdown',
		// 预处理，会先执行 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
		enforce: 'pre',

		// 代码转译 类似于 webpack 中的 loader 也有点像babel插件的配置
		transform(code, id, opt) {
			if (isUnTransform(code, id)) {
				return code
			}

			const mdList = getMdList(code)

			return parseMarkDown(mdList, code, id, mdRelationMap)
		},
	}
}
