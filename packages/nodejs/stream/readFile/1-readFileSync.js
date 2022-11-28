import http from 'http'
import { readFileSync } from 'fs'
import path from 'path'
const __dirname = path.resolve()

/**
 * readFileSync is synchronization function, which will cause program block if has one of file bigger or network fluctuation（波动）
 *
 * so this API has poor performance, we should use less as more as possible!
 */

http
	.createServer(function (req, res) {
		const data = readFileSync(__dirname + '/demo.html')
		res.end(data)
	})
	.listen(7999, () => {
		console.log('server is running on port 7999')
	})
