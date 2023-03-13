/**
 * patchFn 批量请求接口
 *
 *  思路：将一个并发请求进行根据指定大小进行拆分，拆分成为一个二维数组类型。接着通过Promise.all 或 Promise.allSettled
 *        实现并发请求
 */

function promise1() {
	return new Promise(resolve => {
		resolve('j')
	})
}

function promise2() {
	return new Promise(resolve => {
		resolve('i')
	})
}

function promise3() {
	return new Promise(resolve => {
		resolve('m')
	})
}

function promise4() {
	return new Promise(resolve => {
		resolve('y')
	})
}

/**
 *
 * @param {(()=>Promise)[]} promiseList
 * @param {number} limit
 */
function patchFn(promiseList, limit) {
	let patchList = []
	let index = 0
	let diffIndex = 0
	let tempList = []
	if (limit === promiseList.length) {
		patchList.push(promiseList)
	} else {
		while (diffIndex <= promiseList.length) {
			index++
			if (index === limit) {
				promiseList[diffIndex] && tempList.push(promiseList[diffIndex])
				patchList.push(tempList)
				tempList = []
				index = 0
			} else {
				promiseList[diffIndex] && tempList.push(promiseList[diffIndex])
			}
			diffIndex++
			if (diffIndex > promiseList.length) {
				tempList.length && patchList.push(tempList)
			}
		}
	}

	patchList.forEach(async list => {
		const res = await Promise.allSettled(list)
		console.log(res)
	})
}

patchFn([promise1(), promise2(), promise3(), promise4()], 2)

// console.log(patchFn([promise1, promise2, promise3, promise4], 4))
