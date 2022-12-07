import { transformWinPrizeItem } from '../transform'

describe('>>> transformWinPrizeItem', () => {
	it('the Fourth item should mapped Eighth in layout', () => {
		expect(transformWinPrizeItem(4)).toBe(7)
	})

	it('the Ninth item should be throw error', () => {
		// expect arguments should transmit an function when should test throw error
		expect(() => transformWinPrizeItem(9)).toThrow(
			"key couldn't allow bigger than 8"
		)
	})
})
