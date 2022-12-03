import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
const __dirname = path.resolve()

console.time('stream')
const readable = createReadStream(__dirname + '/bigfile.txt')
const writeable = createWriteStream(__dirname + '/copyStream.txt')
readable.pipe(writeable)

writeable.on('close', () => {
	console.timeEnd('stream')
	console.log('写入完成')
})
