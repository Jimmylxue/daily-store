import fs from 'fs'
import { resolve as fileResolve } from 'path'
import { TDetail, TFileItem } from '../types'
import { tagBuf } from '../utils/upload'
import { download, upload } from './upload'
import { snowTinyConfig } from '../core/context'

// 接受进程任务
process.on('message', (tasks: TFileItem[]) => {
	;(async () => {
		const data = tasks.map(task => compressImage(task))

		const details = await Promise.all([...data.map(fn => fn())])

		await Promise.all(
			details.map(({ path, file, fileName }) => {
				new Promise((resolve, reject) => {
					if (!snowTinyConfig?.tile) {
						fs.writeFile(path, Buffer.concat([file, tagBuf]), err => {
							if (err) reject(err)
							resolve(true)
						})
					} else {
						fs.writeFile(
							fileResolve(process.cwd(), snowTinyConfig.output, fileName),
							Buffer.concat([file, tagBuf]),
							err => {
								if (err) reject(err)
								resolve(true)
							}
						)
					}
				})
			})
		)

		// process?.send(details)
		if (process.send) {
			process.send(details)
		}
	})()
})

function compressImage({
	fullRoute,
	outputRoute,
	fileName,
}: TFileItem): () => Promise<TDetail> {
	return async () => {
		const result: TDetail = {
			input: 0,
			output: 0,
			ratio: 0,
			msg: '',
			time: 0,
			file: fs.readFileSync(fullRoute),
			path: outputRoute,
			fileName,
		}
		try {
			const start = +new Date()

			// 上传
			const dataUpload = await upload(result.file)

			// 下载
			const dataDownload = await download(dataUpload.output.url)

			result.input = dataUpload.input.size
			result.output = dataUpload.output.size
			result.ratio = 1 - dataUpload.output.ratio

			result.file = Buffer.alloc(dataDownload.length, dataDownload, 'binary')

			result.time = +new Date() - start
		} catch (error) {
			result.msg = `错误：${JSON.stringify(error || {})}`
		}

		return result
	}
}
