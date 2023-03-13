/**
 * 实现一个防抖函数
 *  防抖：一段时间内的操作，只有最后一次才生效
 */

/**
 *
 * @param {()=>void} fn
 * @param {number} time
 */
function debounce(fn, time) {
	let timer = null
	return () => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn?.()
		}, time)
	}
}
