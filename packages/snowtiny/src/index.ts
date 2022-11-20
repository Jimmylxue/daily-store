// const inquirer = require('inquirer')
import chalk from 'chalk'
import fs from 'fs'
import { resolve } from 'path'
import { TDetail, TFileItem, TFileObject } from './types'
import { byteSize, isDir, isImage, isInvalidFile } from './utils'
import Os from 'os'
import Slogbar from 'slog-progress'
import Ora from 'ora'
const cluster = require('cluster')
const cpuNums = Os.cpus().length
const CG = require('console-grid')
let spinner: Ora.Ora // ora载体
// const chalk = require('chalk')
const progress = new Slogbar(
	'progress :percent  :token :bar  :current/:total \n',
	50
)

let inputSize = 0 // 输入总体积
let outputSize = 0 // 输出总体积
let ratio = 0 // 压缩比

const uploadList: TFileItem[] = []

function scanFire(input: string, output: string): TFileObject {
	// console.log('~~~~~')
	spinner = Ora()

	// spinner.start()
	const objStruct: TFileObject = {}
	const path = resolve(process.cwd(), `${input}`)
	diffFile(path, objStruct, input)
	spinner.stop()
	outputFile(objStruct, resolve(process.cwd(), `${output}`))
	assignTask(uploadList)
	return objStruct
}

function diffFile(path: string, obj: TFileObject, entry: string) {
	spinner.info(`正在搜索 「${chalk.blueBright(entry)}」 ......`)
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
			spinner.succeed(`非图片资源-写入完成：${chalk.blueBright(fileName)}`)
			fs.writeFileSync(`${output}/${fileName}`, file)
		}
	})

	fileStruct.dirChildren?.map(dirItemInfo => {
		outputFile(dirItemInfo, output + '/' + dirItemInfo.dirname)
	})
}

function assignTask(taskList: TFileItem[]) {
	//  开始时间
	// const dateStart = +new Date()

	cluster.setupPrimary({
		exec: resolve(__dirname, 'core/process.js'),
	})

	const works: any[] = []
	if (taskList.length <= cpuNums) {
		works.push({ work: cluster.fork(), tasks: taskList })
	} else {
		for (let i = 0; i < cpuNums; i++) {
			const work = cluster.fork()
			works.push({ work, tasks: [] })
		}
	}

	// 平均分配任务
	let workNum = 0
	taskList.forEach(task => {
		if (works.length === 1) {
			return
		} else if (workNum >= works.length) {
			works[0].tasks.push(task)
			workNum = 1
		} else {
			works[workNum].tasks.push(task)
			workNum += 1
		}
	})

	// 用于记录进程完成数

	let pageNum = works.length
	let succeedNum = 0 // 成功资源数
	let failNum = 0 // 失败资源数
	const failMsg: Array<string> = [] // 失败列表
	let outputTabel: TDetail[] = []

	progress.render({
		current: 0,
		total: taskList.length,
		token: `${chalk.green(0)} 个成功  ${chalk.red(0)} 个失败`,
	})

	works.forEach(({ work, tasks }) => {
		work.send(tasks)
		// // 接收到进程的成功消息

		work.on('message', (details: TDetail[]) => {
			outputTabel = outputTabel.concat(details)

			details.forEach((item: TDetail) => {
				if (item.output) {
					inputSize += item.input
					outputSize += item.output
					ratio += item.ratio
					succeedNum++
				} else {
					failNum++
					if (item.msg) failMsg.push(item.msg)
				}
				// 更新进度条
				progress.render({
					current: succeedNum + failNum,
					total: taskList.length,
					token: `${chalk.green(succeedNum)} 个成功  ${chalk.red(
						failNum
					)} 个失败`,
				})
			})
			pageNum--

			// task complete
			if (pageNum === 0) {
				if (failMsg.length) {
					failMsg.forEach(msg => {
						console.log('error：', msg)
						// spinner.fail(msg)
					})
				}

				// 打印表格
				CG({
					options: {
						headerVisible: true,
					},
					columns: ['名称', '原体积', '现体积', '压缩率', '耗时', '状态'],
					rows: [
						...outputTabel.map(item => [
							chalk.blue(item.fileName),
							chalk.red(byteSize(item.input)),
							chalk.yellow(byteSize(item.output)),
							!item.ratio
								? chalk.red('0 %')
								: chalk.green((item.ratio * 100).toFixed(4) + ' %'),
							chalk.cyan(item.time + ' ms'),
							item.output ? chalk.green('success') : chalk.red('fail'),
						]),
					],
				})

				const totalRatio = ratio / succeedNum

				spinner.succeed(
					`压缩完成：\n 输入图片总大小：${chalk.red(
						byteSize(inputSize)
					)} \n 输入图片总大小：${chalk.green(
						byteSize(outputSize)
					)} \n 综合压缩率：${chalk.green(
						(totalRatio * 100).toFixed(4) + ' %'
					)}`
				)

				cluster.disconnect()
			}
		})
	})
}

export default () => {
	const snowtiny = require(resolve(process.cwd(), 'snowtiny.json'))
	scanFire(snowtiny.entry, snowtiny.output)
}
