import cluster from 'cluster'
import { cpus } from 'os'
import { resolve } from 'path'

const __dirname = resolve()

cluster.setupPrimary({
	exec: resolve(__dirname, './process.js'),
})

console.log(cpus().length)

const cpuNum = cpus()
const works = []
for (let i = 0; i < cpuNum.length; i++) {
	// cpu 是几核心的 就会创建几个子进程
	works.push({ work: cluster.fork() })
}

works.forEach(({ work }) => {
	work.send(111)
	work.on('message', data => {
		console.log('接受数据了', data, work.process.pid)
	})
})
// console.log(setupMaster)
