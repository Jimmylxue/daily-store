import { Observable } from '..'

describe('>>> Observable', () => {
	let count = 0
	let cancel = null
	const emitter = new Observable<number>()

	beforeEach(() => {
		count = 0
		cancel = null
	})

	it('test notify and subscribe', () => {
		emitter.subscribe(payload => {
			count = payload
		})
		expect(count).toBe(0)
		emitter.notify(1)
		expect(count).toBe(1)
		emitter.notify(2)
		expect(count).toBe(2)
	})

	it('test cancel listener', () => {
		let cancel = emitter.subscribe(payload => {
			count = payload
		})
		cancel()
		expect(count).toBe(0)
		emitter.notify(0)
	})
})
