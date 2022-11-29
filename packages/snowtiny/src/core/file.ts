import Ora from 'ora'
import chalk from 'chalk'
import { readdirSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { TFileItem, TFileObject, TSnowConfig } from 'src/types'
import { isAcceptFile, isDir, isImage, isInvalidFile } from 'src/utils'
let spinner: Ora.Ora // ora载体

export function diffFile(
	path: string,
	obj: TFileObject,
	entry: string,
	snowConfig: TSnowConfig
) {
	const { diffCompress, include: includeFiles } = snowConfig
	spinner = Ora()
	spinner.info(`正在搜索 「${chalk.blueBright(entry)}」 ......`)
	obj.dirRoute = path
	obj.dirname = entry
	let res = readdirSync(path)
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
				if (!diffCompress) {
					return
				}
				diffFile(
					path + '/' + item,
					obj.dirChildren?.find(dir => dir.dirRoute === item)!,
					item,
					snowConfig
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
						isAcceptImage: isAcceptFile(item, includeFiles),
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

export function outputFile(
	fileStruct: TFileObject,
	output: string,
	uploadList: TFileItem[],
	snowTinyConfig: TSnowConfig
) {
	const { saveOther } = snowTinyConfig
	mkdirSync(output)
	fileStruct.fileChildren?.map(fileItemInfo => {
		const { fileName, fullRoute, isAcceptImage } = fileItemInfo
		if (fileItemInfo.isImage) {
			if (isAcceptImage) {
				uploadList.push({
					...fileItemInfo,
					outputRoute: `${output}/${fileName}`,
				})
			} else {
				// 是否存入非图片资源
				fileItemInfo.outputRoute = `${output}/${fileName}`
				const file = readFileSync(fullRoute)
				spinner.succeed(
					`非接受的压缩的图片-写入完成：${chalk.blueBright(fileName)}`
				)
				writeFileSync(`${output}/${fileName}`, file)
			}
		} else {
			if (saveOther) {
				// 是否存入非图片资源
				fileItemInfo.outputRoute = `${output}/${fileName}`
				const file = readFileSync(fullRoute)
				spinner.succeed(`非图片资源-写入完成：${chalk.blueBright(fileName)}`)
				writeFileSync(`${output}/${fileName}`, file)
			}
		}
	})

	if (!snowTinyConfig?.diffCompress!) {
		return
	}
	fileStruct.dirChildren?.map(dirItemInfo => {
		outputFile(
			dirItemInfo,
			output + '/' + dirItemInfo.dirname,
			uploadList,
			snowTinyConfig
		)
	})
}
