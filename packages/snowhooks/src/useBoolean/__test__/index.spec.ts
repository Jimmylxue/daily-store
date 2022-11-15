import { act, renderHook } from '@testing-library/react'
import useBoolean from '../index'

describe('>>> useBoolean', () => {
	it('test default value use', () => {
		const hook = renderHook(() => useBoolean())
		expect(hook.result.current.state).toBeFalsy()
	})

	it('test manual setting truly value', () => {
		const hook = renderHook(() => useBoolean(true))
		expect(hook.result.current.state).toBeTruthy()
	})

	it('test base use', () => {
		const hook = renderHook(() => useBoolean(true))
		expect(hook.result.current.state).toBeTruthy()
		const {
			action: { set, setTrue, setFalse },
		} = hook.result.current
		act(() => {
			setFalse()
		})
		expect(hook.result.current.state).toBeFalsy()
		act(() => {
			setTrue()
		})
		expect(hook.result.current.state).toBeTruthy()
		act(() => {
			set(false)
		})
		expect(hook.result.current.state).toBeFalsy()
	})
})
