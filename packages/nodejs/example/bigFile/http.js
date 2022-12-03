import http from 'http'
import path from 'path'
import { createReadStream } from 'fs'
const __dirname = path.resolve()

http
	.createServer((req, res) => {
		createReadStream(__dirname + '/bigfile.txt').pipe(res)
	})
	.listen(8081, () => {
		console.log('server is running on port 8081')
	})
