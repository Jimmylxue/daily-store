import fs from 'fs'
import { resolve } from 'path'
import { TFileObject } from './types'
import { isDir, isImage, isInvalidFile } from './utils'

function scanFire(input: string, output: string): TFileObject {
	const objStruct: TFileObject = {}
	const path = resolve(__dirname, `${input}`)
	diffFile(path, objStruct, input)
	outputFile(objStruct, resolve(__dirname, `${output}`))
	return objStruct
}

function diffFile(path: string, obj: TFileObject, entry: string) {
	obj.dirRoute = path
	obj.dirname = entry
	let res = fs.readdirSync(path)
	if (res) {
		res.map(item => {
			if (isDir(path + '/' + item)) {
				// isDirectory
				if (!obj.dirChildren) {
					obj.dirChildren = []
				}
				if (!obj.dirChildren.find(dir => dir.dirRoute === item)) {
					obj.dirChildren.push({
						dirRoute: item,
					})
				}
				diffFile(
					path + '/' + item,
					obj.dirChildren?.find(dir => dir.dirRoute === item)!,
					item
				)
			} else {
				// is file
				if (!obj.fileChildren) {
					obj.fileChildren = []
				}
				if (!isInvalidFile(item)) {
					obj.fileChildren?.push({
						isDir: false,
						isImage: isImage(item),
						fileName: item,
						fullRoute: path + '/' + item,
					})
				}
			}
		})
	} else {
		console.warn('空目录')
	}
}

function outputFile(fileStruct: TFileObject, output: string) {
	fs.mkdirSync(output)
	fileStruct.fileChildren?.map(fileItemInfo => {
		const { fileName, fullRoute } = fileItemInfo
		const file = fs.readFileSync(fullRoute)
		console.log('写入完成：', fileName)
		fs.writeFileSync(`${output}/${fileName}`, file)
	})

	fileStruct.dirChildren?.map(dirItemInfo => {
		outputFile(dirItemInfo, output + '/' + dirItemInfo.dirname)
	})
}

scanFire('./images', './temp')
