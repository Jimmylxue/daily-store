import { renderHook, act } from '@testing-library/react'
import { useLuckDraw } from '../draw'

describe('>>> useLuckDraw', () => {
	it('test draw', () => {
		const hook = renderHook(() => useLuckDraw())
		expect(hook.result.current.isDrawing).toBeFalsy()
		//
		act(() => {
			hook.result.current.draw(7)
		})
		expect(hook.result.current.isDrawing).toBeTruthy()
		// hook.rerender()
		// expect(hook.result.current.prizeIndex).toBe(0)
		// hook.rerender()
		// expect(hook.result.current.prizeIndex).toBe(1)

		// setTimeout(() => {
		// 	expect(hook.result.current.isDrawing).toBeFalsy()
		// 	expect(hook.result.current.prizeIndex).toBe(6)
		// 	done()
		// }, 5000)
	})
})
