// function sleep() {}
import { act } from '@testing-library/react'
import { sleep, sleepPromise } from '../testHelper'

describe('>>> testHelper utils', () => {
	// jest.useFakeTimers()
	// it('sleep Fn', () => {
	// 	jest.useFakeTimers()
	// 	let state = 0
	// 	sleep(() => {
	// 		state = 1
	// 	})
	// 	expect(state).toBe(0)
	// 	act(() => {
	// 		jest.advanceTimersByTime(1001)
	// 	})
	// 	expect(state).toBe(1)
	// })
})

describe('>>> testHelper utils', () => {
	it('sleepPromise Fn', async () => {
		await expect(sleepPromise()).resolves.toBe('success')
	})
})
