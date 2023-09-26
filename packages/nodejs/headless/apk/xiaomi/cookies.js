import { writeFileContent, getFileContent } from '../core/file.js'
// import data from '../cookies/xiaomi.js'

// console.log('data~', data)

const data = await getFileContent('xiaomi')
console.log('data~', JSON.parse(data))
// const arr = [{ hello: 'world' }, { name: 'jimmy' }]

// writeFileContent('xiaomi', JSON.stringify(arr))
