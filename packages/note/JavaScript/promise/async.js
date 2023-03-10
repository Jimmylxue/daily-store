function promise1() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello')
		}, 3000)
	})
}

function promise2() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('world')
		}, 2000)
	})
}

async function fetchAll() {
	console.time()
	await promise1()
	await promise2()
	console.timeEnd()
}

fetchAll()
