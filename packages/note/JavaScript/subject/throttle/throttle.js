/**
 * 实现一个节流函数。
 *  节流：一段时间内的操作，只有第一次操作才生效。
 */

/**
 *
 * @param {()=>void} fn
 * @param {number} time
 */
function throttle(fn, time) {
	let hasDoneFlag = false
	return () => {
		if (!hasDoneFlag) {
			hasDoneFlag = true
			fn?.()
			setTimeout(() => {
				hasDoneFlag = false
			}, time)
		}
	}
}
