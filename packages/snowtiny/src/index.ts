import chalk from 'chalk'
import { resolve } from 'path'
import { TDetail, TFileItem, TFileObject, TSnowConfig } from './types'
import { byteSize } from './utils'
import Os from 'os'
import Slogbar from 'slog-progress'
import Ora from 'ora'
import { diffFile, outputFile } from './core/file'
import { setState } from './core/context'
const cluster = require('cluster')
const cpuNums = Os.cpus().length
const CG = require('console-grid')
let spinner: Ora.Ora // ora载体
const progress = new Slogbar(
	'progress :percent  :token :bar  :current/:total \n',
	50
)

let inputSize = 0 // 输入总体积
let outputSize = 0 // 输出总体积
let ratio = 0 // 压缩比

let snowTinyConfig: TSnowConfig | null // snow-tiny 配置文件

const uploadList: TFileItem[] = [] // 需要上传的文件集合

function main(input: string, output: string): TFileObject {
	spinner = Ora()
	const objStruct: TFileObject = {}
	const path = resolve(process.cwd(), `${input}`)
	// 维护目录结构映射关系
	diffFile(path, objStruct, input, snowTinyConfig!)
	spinner.stop()

	// 维护输出文件映射关系 & 并输出非输出图片资源
	outputFile(
		objStruct,
		resolve(process.cwd(), `${output}`),
		uploadList,
		snowTinyConfig!
	)
	// 分配任务压缩&下载图片
	assignTask(uploadList)
	return objStruct
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
					`压缩完成：\n 输出图片总大小：${chalk.red(
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
	// resolve(process.cwd() 获取执行命令时的路径
	setState(require(resolve(process.cwd(), 'snowtiny.json')))
	// snowTinyConfig = require(resolve(process.cwd(), 'snowtiny.json'))
	main(snowTinyConfig!.entry, snowTinyConfig!.output)
}
