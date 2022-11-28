import http from 'http'
import { createReadStream } from 'fs'
import path from 'path'
const __dirname = path.resolve()

/**
 * stream API is power by Event! so we can use EventListener to catch error
 *
 *  stream.on('error',(error)=>{})
 */

http
	.createServer((req, res) => {
		const stream = createReadStream(__dirname + '/demo.html')

		stream.on('error', err => {
			console.trace()
			console.error('Stack', err.stack)
			console.error('the error raised was:', err)
		})
	})
	.listen(8080, () => {
		console.log('server is running on port 8080')
	})
