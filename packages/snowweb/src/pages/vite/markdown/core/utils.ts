export function getFilePath(md: string) {
	const filePathRE = /(?<=source=("|')).*(?=('|"))/
	const fileRelativePaths = md.match(filePathRE)
	if (fileRelativePaths?.length) {
		return fileRelativePaths![0]
	}
}
