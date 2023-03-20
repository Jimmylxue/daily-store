import { jimmy } from '.'
import { Person } from './staticMethod'

describe('>>> methodDecorator', () => {
	it('instance method decorator', () => {
		expect(jimmy.name === 'jimmy')
		expect(jimmy.getName()).toBe('jimmy')
	})

	it('static method decorator', () => {
		expect(Person.getName()).toBe('static name')
	})
})

export {}
