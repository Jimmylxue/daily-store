import { sleepPromise } from '@daily-store/common/utils/testHelper'
import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import useAsyncEffect from '../index'

describe('>>> useAsyncEffect', () => {
	it('test should work without clean up', async () => {
		const hooks = renderHook(() => {
			const [x, setX] = useState(0)
			useAsyncEffect(async () => {
				await sleepPromise(100)
				setX(1)
			}, [])
			return x
		})
		expect(hooks.result.current).toBe(0)
		await act(async () => {
			await sleepPromise(150)
		})
		expect(hooks.result.current).toBe(1)
	})
})
