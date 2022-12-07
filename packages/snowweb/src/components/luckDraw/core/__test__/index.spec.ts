import { renderHook, act } from '@testing-library/react'
import { useLuckDraw } from '../draw'

describe('>>> useLuckDraw', () => {
	jest.useFakeTimers()

	it('test draw', () => {
		const hook = renderHook(() => useLuckDraw())
		expect(hook.result.current.isDrawing).toBeFalsy()
		act(() => {
			// 抽中第一项
			hook.result.current.draw(4)
		})
		expect(hook.result.current.prizeIndex).toBe(0)
		expect(hook.result.current.isDrawing).toBeTruthy()
		act(() => {
			jest.advanceTimersByTime(10000)
		})
		expect(hook.result.current.isDrawing).toBeFalsy()
		expect(hook.result.current.prizeIndex).toBe(3)
	})
})
