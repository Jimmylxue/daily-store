/**
 * 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。
 * trans(123456) —— 十二万三千四百五十六
 * trans（100010001）—— 一亿零一万零一
 */

export function trans(num: number) {
	const temp = String(num)
	let result = ''
	const list = [
		'',
		'十',
		'百',
		'千',
		'万',
		'十', // 十万
		'百', // 百万
		'千', // 千万
		'亿',
		'十', // 十亿
		'百', // 百亿
		'千', // 千亿
	]
	const ChineseMap = [
		'零',
		'一',
		'二',
		'三',
		'四',
		'五',
		'六',
		'七',
		'八',
		'九',
	]
	if (temp.length > list.length) {
		throw new Error('数字过大')
	}

	const str = [...temp].reverse().join('')

	for (let i = 0; i < str.length; i++) {
		if (str[i] !== '0') {
			const temp = ChineseMap[str[i] as unknown as number] + list[i]
			result = temp + result
		}
	}

	return result
}
