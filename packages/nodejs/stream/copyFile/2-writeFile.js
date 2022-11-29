import path from 'path'
import { readFile, writeFile } from 'fs'
const __dirname = path.resolve()

/**
 * readFile and writeFile is better way to realize copy file than readFileSync and writeFileSync,
 * because it's an async function.
 * if file are not so bigger, we can use it, but if file bigger, we should use Stream API as well as,
 * which is createReadStream and createWriteStream
 */

readFile(__dirname + '/demo.txt', (err, data) => {
	writeFile(__dirname + '/demoWriteFile.txt', data, 'utf-8', (err1, data1) => {
		console.log('文件写入完成')
	})
})
