import { mkdir, writeFile, unlink, rmdir, unlinkSync, rmdirSync } from 'fs'
let hasLocke = false
const lockDir = 'config.lock'

/**
 *
 * @param {Function} callback
 */
export function lock(callback) {
	if (hasLocke) {
		return callback()
	}
	mkdir(lockDir, err => {
		if (err) {
			return callback(err)
		}

		writeFile(lockDir + '/' + process.pid, 'utf-8', err => {
			if (err) {
				console.error(err)
			}
			hasLocke = true
			return callback()
		})
	})
}

/**
 *
 * @param {Function} callback
 */
export function unlock(callback) {
	if (!hasLocke) {
		return callback()
	}
	console.log('bbb')
	unlink(lockDir + '/' + process.pid, err => {
		if (err) {
			return callback(err)
		}
		rmdir(lockDir, err => {
			if (err) {
				return callback(err)
			}
			hasLocke = false
			callback()
		})
	})
}

process.on('exit', () => {
	if (hasLocke) {
		unlinkSync(lockDir + '/' + process.pid)
		rmdirSync(lockDir)
		console.log('removed lock')
	}
})
