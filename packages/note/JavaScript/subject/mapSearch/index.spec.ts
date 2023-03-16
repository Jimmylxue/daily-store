import { mapSearch } from '.'

describe('>>> mapSearch', () => {
	it('base test', () => {
		expect(mapSearch(1)).toBe('A')
		expect(mapSearch(4)).toBe('B')
		expect(mapSearch(9)).toBe('C')
	})
})

export {}
