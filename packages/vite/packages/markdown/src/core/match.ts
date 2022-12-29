import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'
import MarkdownIt from 'markdown-it'
import { getFilePath, parseCode } from './utils'

export function isUnTransform(code: string, id: string) {
	const tsx = /\.tsx$/
	const markdownRE = /\<snow-markdown.*\/\>/g
	return tsx.test(id) && markdownRE.test(code)
}

export function getMdList(code: string) {
	const markdownRE = /\<snow-markdown.*\/\>/g
	return code.match(markdownRE)
}

export function parseMarkDown(
	mdList: RegExpMatchArray | null,
	code: string,
	nowFilePath: string,
	mdRelationMap: Map<string, string>
) {
	let transformCode = code
	mdList?.forEach(md => {
		// // 匹配 markdown 文件目录
		const fileRelativePath = getFilePath(md)
		if (!fileRelativePath) {
			return
		}
		// 找到当前的目录
		const fileDir = dirname(nowFilePath)
		// 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
		const mdFilePath = resolve(fileDir, fileRelativePath)
		// 读取 markdown 文件的内容
		const mdText = readFileSync(mdFilePath, 'utf-8')
		// 将 g-markdown 标签替换成转换后的 html 文本
		transformCode = transformCode.replace(md, transformMarkdown(mdText))
		mdRelationMap.set(mdFilePath, nowFilePath)
		transformCode = `
		    ${transformCode}
		  `
	})
	// 将转换后的代码返回
	return transformCode
}

const md = new MarkdownIt({
	xhtmlOut: true,
})
export function transformMarkdown(mdText: string): string {
	// 加上一个 class 名为 article-content 的 wrapper，方便我们等下添加样式
	const transformBase = md.render(mdText)
	const parse = parseCode(transformBase as string)
	return `
	  <section className='article-content'>
		${parse}
	  </section>
	`
}
