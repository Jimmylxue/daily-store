import http from 'http'
import { readFile } from 'fs'
import path from 'path'
const __dirname = path.resolve()

/**
 * those demo code is power by fs.readFile, which is still can be optimization.
 *  because fs.readFile will put file data into memory at one time!!!,
 *  if file are smaller,we can accept it,
 *  but if file bigger, it will cause used so many memory, which is can't accepted!
 *
 * in order to improve performance, we can use fs.createReadStream!
 */

http
	.createServer(function (req, res) {
		readFile(__dirname + '/demo.html', function (err, data) {
			if (err) {
				console.log('err', err)
				res.statusCode = 500
				res.end(String(err))
			} else {
				res.end(data)
			}
		})
	})
	.listen(8080, () => {
		console.log('server is running on port 8080')
	})
