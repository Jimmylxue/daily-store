import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'
import MarkdownIt from 'markdown-it'

console.log('mm', MarkdownIt)

export function isUnTransform(code: string, id: string) {
	const tsx = /\.tsx$/
	// const markdownRE = /\<g-markdown.*\/\>/g
	// console.log('>>', tsx.test(id), id)
	// console.log(id, tsx.test(id))
	return tsx.test(id)
}

export function getMdList(code: string) {
	console.log(code)
	const markdownRE = /\<g-markdown.*\/\>/g
	console.log(code.match(markdownRE))

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
		console.log({ mdText })
		// 将 g-markdown 标签替换成转换后的 html 文本
		transformCode = transformCode.replace(md, transformMarkdown(mdText))
		// 记录引入当前 md 文件的 vue 文件 id
		mdRelationMap.set(mdFilePath, id)

		transformCode = `
			import '../../juejin.css'
        ${transformCode}
      `

		// console.log('transformCode', transformCode)
	})
	// 将转换后的代码返回
	return transformCode
}

const md = new MarkdownIt()
export function transformMarkdown(mdText: string): string {
	// 加上一个 class 名为 article-content 的 wrapper，方便我们等下添加样式
	return `
    <section className='article-content'>
		${md.render(mdText)}
    </section>
  `
}
