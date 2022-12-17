import { fork, spawn } from 'child_process'
import { resolve } from 'path'

/**
 * 父子进程会创建 IPC 通道， 基于这个可以实现 父子进程之间的通信
 */

const __dirname = resolve()

const process = fork(resolve(__dirname, './sub.js'))

process.on('message', message => {
	console.log('got message from child_process', message)
})

process.send({ name: 'jimmy' })
