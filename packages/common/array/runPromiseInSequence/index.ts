/**
 * 此函数的关键点在于 数组的 reduce 方法。
 *  reduce方法的第一个参数是 callback.
 *    callback 的第一个参数 上一次callback的返回值， 初始值为数组的第二个参数。（如果没有提供这个参数，则初始值为数组的第一个元素会被作为callback的第一个参数）
 */

function runPromiseInSequence<T>(array: (() => Promise<T>)[], value: T) {
	return array.reduce(
		(promiseChain: any, currentFunction) => promiseChain.then(currentFunction),
		Promise.resolve(value)
	)
}

const f1: () => Promise<string> = () =>
	new Promise((resolve, _) => {
		setTimeout(() => {
			console.log('promise1 running')
			resolve('hello')
		}, 1000)
	})

const f2: () => Promise<string> = () =>
	new Promise((resolve, _) => {
		setTimeout(() => {
			console.log('promise2 running')
			resolve('world')
		}, 1000)
	})

runPromiseInSequence<string>([f1, f2], 'init')
