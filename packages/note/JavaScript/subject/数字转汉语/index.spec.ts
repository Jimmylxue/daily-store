import { trans } from '.'

describe('>>> deleteString', () => {
	it('base test', () => {
		expect(trans(123456)).toBe('一十二万三千四百五十六')
		expect(trans(100020011)).toBe('一亿二万一十一')
	})
})

export {}
