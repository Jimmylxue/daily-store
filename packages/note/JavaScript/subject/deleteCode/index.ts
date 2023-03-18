/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
 * “ababac” —— “ababa”
 * “aaabbbcceeff” —— “aaabbb” => [[c,2],[e,2],[f,2],[a,3],[b,3]]
 */

/**
 *
 * @param {string} code
 */
export function deleteString(code: string) {
	// 哪些字符是出现最少次数 => 维护一个映射关系
	// 找到最少得字符
	// 过滤掉这些字符
	const map: {
		[key: string]: number
	} = {}

	for (let i = 0; i < code.length; i++) {
		if (map[code[i]]) {
			map[code[i]] = map[code[i]] + 1
		} else {
			map[code[i]] = 1
		}
	}

	/**
	 * map = {
	 *  a:4,
	 *  b:5
	 * }
	 *
	 * sort = [['a',4],['b',5]]
	 */

	const sort = Object.entries(map).sort((a, b) => a[1] - b[1])
	const minCount = sort[0][1]
	const filterKeys = sort
		.filter(item => item[1] === minCount)
		.map(item => item[0])

	let result = ''
	for (let i = 0; i < code.length; i++) {
		if (!filterKeys.includes(code[i])) {
			result += code[i]
		}
	}

	return result
}
