import { Plugin } from 'vite'
import { getMdList, isUnTransform, parseMarkDown } from './core/match'
import { extname } from 'path'

export default function markdownPlugin(): Plugin {
	const mdRelationMap = new Map<string, string>()

	return {
		name: 'snow-vite:markdown',
		// 预处理，会先执行 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
		enforce: 'pre',

		handleHotUpdate(ctx) {
			const { file, server, modules } = ctx
			// 过滤非 md 文件
			if (extname(file) !== '.md') return

			const relationId = mdRelationMap.get(file) as string

			const relationModule = [
				...server.moduleGraph.getModulesByFile(relationId)!,
			][0]

			server.ws.send({
				type: 'update',
				updates: [
					{
						type: 'js-update',
						path: relationModule.file!,
						acceptedPath: relationModule.file!,
						timestamp: new Date().getTime(),
					},
				],
			})
			// 指定需要重新编译的模块
			return [...modules, relationModule]
		},
		// 代码转译 类似于 webpack 中的 loader 也有点像babel插件的配置
		transform(code, id) {
			if (!isUnTransform(code, id)) {
				return code
			}
			const mdList = getMdList(code)
			// console.log({ mdList })
			return parseMarkDown(mdList, code, id, mdRelationMap)
		},
	}
}
