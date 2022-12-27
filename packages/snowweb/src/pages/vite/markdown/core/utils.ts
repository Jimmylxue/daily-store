export function getFilePath(md: string) {
	const filePathRE = /(?<=source=("|')).*(?=('|"))/
	const fileRelativePaths = md.match(filePathRE)
	if (fileRelativePaths?.length) {
		return fileRelativePaths![0]
	}
}

export function parseCode(code: string) {
	console.log('comming', code)
	let pattern = /<code *?>([^<]*)<\/code>/
	let match = code.match(pattern)
	let exchangeCode = code
	if (match) {
		console.log('match~')
		console.log(match[1]) // 输出 "hello world"
		// code.replace(match[1], `{${'`' + match[1] + '`'}}`)
		exchangeCode = code.replace(match[1], `{${'`' + match[1] + '`'}}`)
		console.log('ccc', exchangeCode)
	}
	return exchangeCode
	// const str = code.replace(pattern, '111')
	// console.log({ code, str })
	// const match = code.match(/<code>(.+)<\/code>/g)
	// console.log({ match })
	// if (match !== null) {
	// 	let content = match[1]
	// 	console.log('content', content)
	// }
}
