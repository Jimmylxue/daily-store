const user = require('./data').user
const changeData = require('./data').changeData

console.log('before: ', user)
changeData()
console.log('change after: ', user)
