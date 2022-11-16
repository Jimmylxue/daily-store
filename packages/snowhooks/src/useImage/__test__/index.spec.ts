import { act, renderHook, waitFor } from '@testing-library/react'
import useImage, { loadImageInfo } from '../index'

describe('>>> useImage', () => {
	beforeAll(() => {
		jest.useFakeTimers()
	})

	const setUp = (source: string) =>
		renderHook(() =>
			useImage({
				source,
			})
		)

	it('useImage useable image address', async () => {
		const hook = setUp('https://place.dog/300/200')
		expect(hook.result.current.isLoading).toBeTruthy()

		act(() => {
			jest.runAllTimers()
		})
		// expect(hook.result.current.isLoading).toBeTruthy()
		let count = 0
		await waitFor(() => {
			count++
			// expect(hook.result.current.isLoading).toBeFalsy()
		})
	})
})
