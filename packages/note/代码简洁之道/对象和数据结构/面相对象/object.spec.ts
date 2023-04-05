import { circle, rectangle, square } from './object'

describe('>>> object', () => {
	it('square test', () => {
		expect(square.area()).toBe(100)
	})

	it('rectangle test', () => {
		expect(rectangle.area()).toBe(80)
	})

	it('circle test', () => {
		expect(circle.area()).toBe(28.26)
	})
})

export {}
