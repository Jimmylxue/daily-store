import { jimmy } from '.'

describe('>>> decoratorFactory', () => {
	it('test jimmy', () => {
		expect(jimmy.name === 'jimmy')
		expect(jimmy.age === '24')
	})
})

export {}
