import { act, renderHook } from '@testing-library/react'
import useUpdate from '../index'
describe('>>> useUpdate', () => {
	it('test should be update', () => {
		let count = 0
		const hooks = renderHook(() => {
			const update = useUpdate()
			return {
				update,
				count,
				onChange: () => {
					count++
					update()
				},
			}
		})
		const { onChange } = hooks.result.current
		expect(hooks.result.current.count).toBe(0)
		act(onChange)
		expect(hooks.result.current.count).toBe(1)
		act(onChange)
		expect(hooks.result.current.count).toBe(2)
	})

	it('test should return same update function', () => {
		const hooks = renderHook(() => useUpdate())
		const preUpdate = hooks.result.current
		hooks.rerender()
		const nowUpdate = hooks.result.current
		/**
		 * tobe and toEqual to check two function is deeply check, which will be check two function address in memory
		 */
		expect(preUpdate).toBe(nowUpdate)
	})

	it('study and test base function', () => {
		const f1 = () => {}
		const f2 = () => {}
		expect(f1).not.toEqual(f2)
	})
})
