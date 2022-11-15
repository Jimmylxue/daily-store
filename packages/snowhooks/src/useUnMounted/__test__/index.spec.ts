import { renderHook } from '@testing-library/react'
import useUnMounted from '../index'

describe('>>> useUnMounted', () => {
	it('test unUnMounted', () => {
		const fn = jest.fn()
		const hooks = renderHook(() => useUnMounted(fn))
		expect(fn).toBeCalledTimes(0)
		// in jest, rerender function doesn't running clean function
		hooks.rerender()
		expect(fn).toBeCalledTimes(0)
		hooks.unmount()
		expect(fn).toBeCalledTimes(1)
	})
})
