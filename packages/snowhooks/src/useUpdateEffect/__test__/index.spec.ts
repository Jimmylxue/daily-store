import { renderHook } from '@testing-library/react'
import useUpdateEffect from '../index'

describe('>>> useUpdateEffect', () => {
	it('*** test no deps use', () => {
		const fn = jest.fn()
		const hooks = renderHook(() => useUpdateEffect(fn))
		expect(fn).toBeCalledTimes(0)
		hooks.rerender()
		expect(fn).toBeCalledTimes(0)
		hooks.rerender()
		expect(fn).toBeCalledTimes(0)
	})

	it('*** test has dep data', () => {
		let state = 1
		const fn = jest.fn(() => {})
		const hooks = renderHook(() => useUpdateEffect(fn, [state]))
		expect(fn).toBeCalledTimes(0)
		hooks.rerender()
		expect(fn).toBeCalledTimes(0)
		state = 2
		hooks.rerender()
		expect(fn).toBeCalledTimes(1)
	})

	it('*** other test dep render', () => {
		let mountedState = 1
		const hook = renderHook(() =>
			useUpdateEffect(() => {
				mountedState = 3
			}, [mountedState])
		)
		expect(mountedState).toEqual(1)
		hook.rerender()
		expect(mountedState).toEqual(1)
		mountedState = 2
		hook.rerender()
		expect(mountedState).toEqual(3)
	})
})
