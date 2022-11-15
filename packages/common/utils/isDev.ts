/**
 * tsconfig.json的compilerOptions.types节点添加node
 *  才能识别 process 变量
 */

const isDev =
	process?.env?.NODE_ENV === 'development' || process?.env?.NODE_ENV === 'test'

export default isDev
