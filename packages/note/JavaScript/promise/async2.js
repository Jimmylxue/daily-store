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
	const p1 = promise1()
	const p2 = promise2()
	await p1
	await p2
	console.timeEnd()
}

fetchAll()
