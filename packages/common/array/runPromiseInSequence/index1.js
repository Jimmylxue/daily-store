function runPromiseInSequence(array, value) {
	return array.reduce(
		(promiseChain, currentFunction) => promiseChain.then(currentFunction),
		Promise.resolve(value)
	)
}

const f1 = () =>
	new Promise((resolve, _) => {
		setTimeout(() => {
			console.log('promise1 running')
			resolve('hello')
		}, 1000)
	})

const f2 = () =>
	new Promise((resolve, _) => {
		setTimeout(() => {
			console.log('promise2 running')
			resolve('world')
		}, 1000)
	})

runPromiseInSequence([f1, f2], 'init')
