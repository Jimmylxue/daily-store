import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { isFunction, isBoolean, isReactRef } from '..'

describe('>>> base function test', () => {
	it('*** isFunction test', () => {
		expect(isFunction(() => {})).toBeTruthy()
		expect(isFunction(function () {})).toBeTruthy()
		expect(isFunction('hello world')).toBeFalsy()
	})

	it('*** isBoolean test', () => {
		expect(isBoolean(true)).toBeTruthy()
		expect(isBoolean(false)).toBeTruthy()
		expect(isBoolean('11111')).toBeFalsy()
	})

	it('*** isReactRef test', () => {
		const hooks = renderHook(() => useRef())
		console.log('length', Object.keys(hooks.result.current).length)
		expect(isReactRef(hooks.result.current)).toBeTruthy()
		expect(isReactRef({})).toBeFalsy()
	})
})
