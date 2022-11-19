import fs from 'fs'

export function filterFile(fileList: string[], path: string) {
	return fileList.filter(fileName => {
		if (isDir(path + '/' + fileName)) {
			// console.log('yes')
		} else {
		}
		return (
			(!fileName.startsWith('.') && fileName.endsWith('png')) ||
			fileName.endsWith('jpeg') ||
			fileName.endsWith('jpg')
		)
	})
}

export function isImage(fileName: string): boolean {
	return (
		fileName.endsWith('png') ||
		fileName.endsWith('jpeg') ||
		fileName.endsWith('jpg')
	)
}

export function isDir(pathName: string): boolean {
	const stat = fs.lstatSync(pathName)
	return stat.isDirectory()
}

export function isInvalidFile(fileName: string): boolean {
	return !!fileName.startsWith('.')
}
