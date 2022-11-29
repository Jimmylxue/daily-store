import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
const __dirname = path.resolve()

/**
 * stream API is best way to realize copy file, because we can't promise fill size is alway smaller,
 *  so even involve file operation we use Stream API is best way
 *
 * Why Stream API is best way, can see readFile dir some file's notes
 */

const readable = createReadStream(__dirname + '/demo.txt')
const writeable = createWriteStream(__dirname + '/demoCopy.txt')
readable.pipe(writeable)
