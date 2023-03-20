import { jimmy } from '.'
import { Person } from './staticMethodArgument'

describe('>>> argument decorator', () => {
	it('instance method argument test', () => {
		expect(jimmy.getName('xuexue')).toBe('jimmy')
	})

	it('static method argument test', () => {
		expect(Person.getName('xuexue')).toBe('hello world')
	})
})

export {}
