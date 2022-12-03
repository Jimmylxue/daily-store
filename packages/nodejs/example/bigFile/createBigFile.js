import { createWriteStream } from 'fs'
import path from 'path'
const __dirname = path.resolve()

const writeable = createWriteStream(__dirname + '/bigfile.txt')
for (let i = 0; i < 25000000; i++) {
	writeable.write('jimmy~ world my name is jimmy')
}
