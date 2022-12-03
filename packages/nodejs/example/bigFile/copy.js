import path from 'path'
import { copyFile } from 'fs'
const __dirname = path.resolve()

console.time('copyApi')
copyFile(__dirname + '/bigfile.txt', __dirname + '/copyApi.txt', () => {
	console.timeEnd('copyApi')
})
