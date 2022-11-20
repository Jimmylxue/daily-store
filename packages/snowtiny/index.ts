import fs from 'fs'
import { resolve } from 'path'
import { assignTask } from './core/tasks'
import { TFileItem, TFileObject } from './types'
import { isDir, isImage, isInvalidFile } from './utils'

const uploadList: TFileItem[] = []

function scanFire(input: string, output: string): TFileObject {
	const objStruct: TFileObject = {}
	const path = resolve(__dirname, `${input}`)
	diffFile(path, objStruct, input)
	outputFile(objStruct, resolve(__dirname, `${output}`))
	assignTask(uploadList)
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
					const isImageFile = isImage(item)
					obj.fileChildren?.push({
						isDir: false,
						isImage: isImageFile,
						fileName: item,
						fullRoute: path + '/' + item,
						outputRoute: '',
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
		if (fileItemInfo.isImage) {
			uploadList.push({
				...fileItemInfo,
				outputRoute: `${output}/${fileName}`,
			})
		} else {
			fileItemInfo.outputRoute = `${output}/${fileName}`
			const file = fs.readFileSync(fullRoute)
			console.log('非图片资源-写入完成：', fileName)
			fs.writeFileSync(`${output}/${fileName}`, file)
		}
	})

	fileStruct.dirChildren?.map(dirItemInfo => {
		outputFile(dirItemInfo, output + '/' + dirItemInfo.dirname)
	})
}

scanFire('./images', './temp')
