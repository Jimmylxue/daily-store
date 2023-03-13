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
	/**
	 * p1 和 p2 同步执行，没有await
	 * 只有await 才会引起阻塞
	 */
	await p1
	/**
	 * p1 结束之后 已经过了大于3秒，这时候p2等待的2s的时间其实状态已经变更了
	 * 所以p1结束之后几乎是立刻到p2 p2也是立刻就变更状态
	 *
	 * 所以整条链路执行下来 时间耗时是 3s 多
	 */
	await p2
	console.timeEnd()
}

fetchAll()
