import { sleep } from '.'

describe('>>> sleep', () => {
	it('testSleep demo', async () => {
		jest.useFakeTimers()
		const callback = jest.fn()

		const act = async () => {
			await sleep(1000)
			callback()
		}

		const prom = act()

		expect(callback).not.toHaveBeenCalled()

		jest.runAllTimers() // 将所有时间放开

		await prom //  that is crux(关键) in this test case

		expect(callback).toHaveBeenCalledTimes(1)
	})
})

export {}
