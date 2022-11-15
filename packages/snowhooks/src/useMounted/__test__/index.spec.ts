import { renderHook } from '@testing-library/react'
import useMounted from '../index'

describe('>>> test useMounted', () => {
	it('test mounted', async () => {
		const fn = jest.fn()
		// renderHooks is running a hook
		const hooks = renderHook(() => useMounted(fn))

		expect(fn).toBeCalledTimes(1)
		// like name, rerender is render against
		hooks.rerender()
		// the time of function call is still 1 even if rerender
		expect(fn).toBeCalledTimes(1)
		// unmount is to test clean
		hooks.unmount()
		expect(fn).toBeCalledTimes(1)

		renderHook(() => useMounted(fn)).unmount()

		expect(fn).toBeCalledTimes(2)

		const hook2 = renderHook(() => useMounted(fn))
		expect(fn).toBeCalledTimes(3)
	})
})
