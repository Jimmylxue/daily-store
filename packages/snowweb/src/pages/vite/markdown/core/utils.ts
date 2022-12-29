export function getFilePath(md: string) {
	const filePathRE = /(?<=source=("|')).*(?=('|"))/
	const fileRelativePaths = md.match(filePathRE)
	if (fileRelativePaths?.length) {
		return fileRelativePaths![0]
	}
}

export function parseCode(code: string) {
	let pattern = /<code *?>([^<]*)<\/code>/
	let match = code.match(pattern)
	let exchangeCode = code
	if (match) {
		exchangeCode = code.replace(match[1], `{${'`' + match[1] + '`'}}`)
	}
	return exchangeCode
}
