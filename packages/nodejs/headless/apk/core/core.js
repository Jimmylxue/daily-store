// const { resolve } = require('path')
import { resolve } from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 *
 * @param {'xiaomi'|'huawei'} platform
 */
export function getCookiePath(platform) {
	switch (platform) {
		case 'xiaomi':
			return resolve(__dirname, '../cookies/xiaomi.js')
		case 'huawei':
			return resolve(__dirname, '../cookies/huawei.js')
		default:
			return resolve(__dirname, '../cookies/xiaomi.js')
	}
}

// module.exports = {
// 	getCookiePath,
// }
