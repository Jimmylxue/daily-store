import { spawn, exec, execFile, fork } from 'child_process'

/**
 * spawn 和 execFile 配置都相当之复杂，建议使用
 *  建议使用 fork 对前端来说是最简单明了的
 */

spawn('zsh', ['-c', 'node worker.js'], {
	stdio: 'inherit',
	// shell: true,
})

exec('node worker.js', (err, stdout, stderr) => {
	console.log('log by exec:', stdout)
})

execFile(
	'node worker.js',
	{
		shell: 'zsh',
	},
	(err, stdout, stderr) => {
		console.log('log by execFile:', stdout)
	}
)

fork('./worker.js')

console.log('主线程')
