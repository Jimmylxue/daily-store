/**
 * 给几个数组, 可以通过数值找到对应的数组名称
 */

export function mapSearch(num: number) {
	const A = [1, 2, 3]
	const B = [4, 5, 6]
	const C = [7, 8, 9]
	let result = ''
	A.includes(num) ? (result += 'A') : null
	B.includes(num) ? (result += 'B') : null
	C.includes(num) ? (result += 'C') : null
	return result
}
