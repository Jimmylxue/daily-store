import { lock, unlock } from './locker.js'
import { exec } from 'child_process'

lock(err => {
	if (err) {
		throw err
	}
	setTimeout(() => {
		unlock(() => {})
	}, 5000)
})

/**
 * start a child_process to execute node remove.js, which will to handle remove.js
 */
setTimeout(() => {
	exec('node remove.js', (error, stdout, stderr) => {
		if (error) {
			console.error(`error: ${error.message}`)
			return
		}

		if (stderr) {
			console.error(`stderr: ${stderr}`)
			return
		}

		console.log(`stdout:\n${stdout}`)
	})
}, 3000)
