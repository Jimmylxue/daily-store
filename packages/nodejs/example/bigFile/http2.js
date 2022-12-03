import http from 'http'
import path from 'path'
import { readFile, readFileSync, writeFile, writeFileSync } from 'fs'
const __dirname = path.resolve()

console.time('Sync')
const file = readFileSync(__dirname + '/bigfile.txt')
writeFileSync(__dirname + '/copyBigFile.txt', file)
console.timeEnd('Sync')
