/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
 * “ababac” —— “ababa”
 * “aaabbbcceeff” —— “aaabbb”
 */

/**
 *
 * @param {string} code
 */
export function deleteString(code: string) {
	const map: {
		[key: string]: number
	} = {}
	let result = ''
	for (let i = 0; i < code.length; i++) {
		if (map[code[i]]) {
			map[code[i]] = map[code[i]] + 1
		} else {
			map[code[i]] = 1
		}
	}

	const sort = Object.entries(map).sort((a, b) => a[1] - b[1])
	const minCount = sort[0][1]
	const filterKey = sort
		.filter(item => item[1] === minCount)
		.map(item => item[0])

	for (let i = 0; i < code.length; i++) {
		if (!filterKey.includes(code[i])) {
			result += code[i]
		}
	}

	console.log(sort, minCount, filterKey)

	return result

	// console.log(sort, keyCode)
}

// deleteString('ababac')
deleteString('aaabbbcceeff')
