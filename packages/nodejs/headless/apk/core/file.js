// const { writeFile } = require('fs')
// const { getCookiePath } = require('./core')
import { writeFile, readFile } from 'fs'
import { getCookiePath } from './core.js'

/**
 *
 * @returns {Promise<boolean>}
 */
export function clearFileContent() {
	const path = ''
	return new Promise((resolve, reject) => {
		writeFile(path, '', err => {
			if (err) {
				reject('clear file content error')
			} else {
				resolve('clear file content success')
			}
		})
	})
}

/**
 *
 * @param {'xiaomi'|'huawei'} type
 * @param {string} content
 * @returns {Promise<boolean>}
 */
export function writeFileContent(type, content) {
	const path = getCookiePath(type)
	return new Promise((resolve, reject) => {
		writeFile(path, content, err => {
			if (err) {
				reject('clear file content error')
			} else {
				resolve('clear file content success')
			}
		})
	})
}

/**
 *
 * @param {'xiaomi'|'huawei'} type
 * @returns {Promise<string>}
 */
export function getFileContent(type) {
	const path = getCookiePath(type)
	return new Promise((resolve, reject) => {
		readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject('clear file content error')
			} else {
				resolve(data)
			}
		})
	})
}

// module.exports = {
// 	clearFileContent,
// 	writeFileContent,
// }
