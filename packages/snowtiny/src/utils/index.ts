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

enum Esize {
	B,
	KB,
	MB,
	GB,
	TB,
	PB,
	EB,
	ZB,
	YB,
}
export function byteSize(byte = 0) {
	if (byte === 0) return '0 B'
	const unit = 1024
	const i = Math.floor(Math.log(byte) / Math.log(unit))
	return (byte / Math.pow(unit, i)).toPrecision(3) + ' ' + Esize[i]
}
