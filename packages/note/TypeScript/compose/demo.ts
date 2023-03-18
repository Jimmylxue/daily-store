/**
 * realize an rounding(四舍五入)
 * // compose(f,g)(x) === f(g(x))
 */

function compose<
	T extends (num: number) => number,
	U extends (str: number) => number
>(a: T, b: U) {
	return function (x: number) {
		return a(b(x))
	}
}

compose(Math.random, Math.floor)(3.56) // 4
