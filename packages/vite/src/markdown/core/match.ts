import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'
const MarkdownIt = require('markdown-it')

export function isUnTransform(code: string, id: string) {
	const vueRE = /\.vue$/
	const markdownRE = /\<g-markdown.*\/\>/g
	return !vueRE.test(id) || !markdownRE.test(code)
}

export function getMdList(code: string) {
	const markdownRE = /\<g-markdown.*\/\>/g
	return code.match(markdownRE)
}

export function parseMarkDown(
	mdList: RegExpMatchArray | null,
	code: string,
	id: string,
	mdRelationMap: Map<string, string>
) {
	const markdownRE = /\<g-markdown.*\/\>/g
	const filePathRE = /(?<=file=("|')).*(?=('|"))/
	let transformCode = code
	mdList?.forEach(md => {
		// 匹配 markdown 文件目录
		const fileRelativePaths = md.match(filePathRE)
		if (!fileRelativePaths?.length) return

		// markdown 文件的相对路径
		const fileRelativePath = fileRelativePaths![0]
		// 找到当前 vue 的目录
		const fileDir = dirname(id)
		// 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
		const mdFilePath = resolve(fileDir, fileRelativePath)
		// 读取 markdown 文件的内容
		const mdText = readFileSync(mdFilePath, 'utf-8')
		// 将 g-markdown 标签替换成转换后的 html 文本
		transformCode = transformCode.replace(md, transformMarkdown(mdText))
		// 记录引入当前 md 文件的 vue 文件 id
		mdRelationMap.set(mdFilePath, id)

		transformCode = `
        ${transformCode}
        <style scoped>
        </style>
      `

		// 将转换后的代码返回
		return transformCode
	})
}

const md = new MarkdownIt()
export function transformMarkdown(mdText: string): string {
	// 加上一个 class 名为 article-content 的 wrapper，方便我们等下添加样式
	return `
    <section class='article-content'>
      ${md.render(mdText)}
    </section>
  `
}
