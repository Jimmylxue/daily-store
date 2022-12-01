import { lock, unlock } from './locker.js'
// const { lock, unlock } = require('./locker')

lock(err => {
	if (err) {
		throw err
	}

	unlock(() => {})
})
