import { act, renderHook } from '@testing-library/react'
import useToggle from '../index'

describe('>>> useToggle', () => {
	it('test default use', () => {
		const hooks = renderHook(() => useToggle())
		expect(hooks.result.current.state).toBeFalsy()
		act(() => {
			hooks.result.current.action.toggle()
		})
		expect(hooks.result.current.state).toBeTruthy()
	})

	it('test one params', () => {
		const hooks = renderHook(() => useToggle('hello'))
		expect(hooks.result.current.state).toBe('hello')
		act(() => {
			hooks.result.current.action.toggle()
		})
		expect(hooks.result.current.state).toBeFalsy()
		act(() => {
			hooks.result.current.action.toggle()
		})
		expect(hooks.result.current.state).toBe('hello')
	})

	it('test two params', () => {
		const hooks = renderHook(() => useToggle('hello', 'world'))
		expect(hooks.result.current.state).toBe('hello')
		act(() => {
			hooks.result.current.action.toggle()
		})
		expect(hooks.result.current.state).toBe('world')
		act(() => {
			hooks.result.current.action.toggle()
		})
		expect(hooks.result.current.state).toBe('hello')
		act(() => {
			hooks.result.current.action.setRight()
		})
		expect(hooks.result.current.state).toBe('world')
		act(() => {
			hooks.result.current.action.setLeft()
		})
		expect(hooks.result.current.state).toBe('hello')
	})
})
