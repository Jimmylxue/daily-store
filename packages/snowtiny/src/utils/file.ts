import {
	createReadStream,
	createWriteStream,
	lstatSync,
	mkdir,
	readdir,
} from 'fs'
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
	const stat = lstatSync(pathName)
	return stat.isDirectory()
}

export function isInvalidFile(fileName: string): boolean {
	return !!fileName.startsWith('.')
}

export function isAcceptFile(
	fileName: string,
	acceptList: string[] = ['png', 'jpg', 'jpeg']
) {
	const regexp = new RegExp(`.(${acceptList.join('|')})$`)
	return regexp.test(fileName)
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

export function copyFile(
	entry: string,
	output: string,
	callback: () => void = () => {}
) {
	const readable = createReadStream(entry)
	const writeable = createWriteStream(output)
	readable.pipe(writeable)

	writeable.on('close', callback)
}

export function readDir(path: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		readdir(path, (err, files) => {
			if (err) {
				reject(err.message)
			}
			resolve(files)
		})
	})
}

export function mkDir(path: string) {
	return new Promise((resolve, reject) => {
		mkdir(path, {}, (err: any, res: any) => {
			if (err) {
				reject(JSON.stringify(err))
			}
			resolve(res)
		})
	})
}
