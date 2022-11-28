import http from 'http'
import { createReadStream } from 'fs'
import path from 'path'
import zlib from 'zlib'
const __dirname = path.resolve()

/**
 * those code do two things:
 *  - set response header to let browser know that is open gzip compress
 *  - use two pipe! respectively（分别） with compress file and send to browser by Stream!
 */

http
	.createServer((req, res) => {
		res.writeHead(200, { 'content-encoding': 'gzip' })
		createReadStream(__dirname + '/demo.html')
			.pipe(zlib.createGzip())
			.pipe(res)
	})
	.listen(8082, () => {
		console.log('server is running on port 8082')
	})
