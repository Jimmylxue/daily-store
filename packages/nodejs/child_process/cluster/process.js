// 基于事件
process.on('message', message => {
	console.log('got message from parent', message)
	// process.send({ name: 'xuexue!' })
})
process.send({ name: 'xuexue' })
