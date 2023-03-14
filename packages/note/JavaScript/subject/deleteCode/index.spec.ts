import { deleteString } from '.'

describe('>>> deleteString', () => {
	it('base test', () => {
		expect(deleteString('ababac')).toBe('ababa')
		expect(deleteString('aaabbbcceeff')).toBe('aaabbb')
	})
})

export {}
