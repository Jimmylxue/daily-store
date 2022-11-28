import http from 'http'
import { createReadStream } from 'fs'
import path from 'path'
const __dirname = path.resolve()

/**
 * those code can solve 'readFile.js' provider promise!,
 * because it power by stream API, which can imagine like water in brook（小溪）,
 * it doesn't cause use so many memory!
 *
 * if involve(涉及) big file, we should know to use stream API at the first time
 */

http
	.createServer((req, res) => {
		createReadStream(__dirname + '/demo.html').pipe(res)
	})
	.listen(8081, () => {
		console.log('server is running on port 8081')
	})

/**
 * code less and more performance than 'readFile.js'
 */
