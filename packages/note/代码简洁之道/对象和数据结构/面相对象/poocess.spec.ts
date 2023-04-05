import { circle, geometry, rectangle, square } from './process'

describe('>>> Geometry', () => {
	it('square test', () => {
		expect(geometry.area(square)).toBe(100)
	})

	it('rectangle test', () => {
		expect(geometry.area(rectangle)).toBe(80)
	})

	it('circle test', () => {
		expect(geometry.area(circle)).toBe(28.26)
	})
})

export {}
