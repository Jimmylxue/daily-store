import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
const __dirname = path.resolve()

/**
 * we can realize copy file by readFileSync and writeFileSync, but it's not best performance way
 * because that is an synchronization function, which will cause program block if has one of file bigger or network fluctuation（波动）
 */

const file = readFileSync(__dirname + '/demo.txt')
writeFileSync(__dirname + '/demoWriteFileSync.txt', file)
