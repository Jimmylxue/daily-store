import { jimmy } from '.'

describe('>>> normalDecorator', () => {
	it('test jimmy', () => {
		expect(jimmy.name === 'jimmy')
		expect(jimmy.age === 24)
	})
})

export {}
