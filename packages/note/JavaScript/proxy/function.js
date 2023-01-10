function requestUser(name) {
	console.log('demo~~~', name)
}

const proxyRequestUser = new Proxy(requestUser, {
	apply(target, context, args) {
		console.log('DDDDD')
		target(...args)
	},
})

proxyRequestUser('jimmy')
