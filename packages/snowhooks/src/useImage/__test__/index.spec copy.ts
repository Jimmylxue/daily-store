import { act, renderHook, waitFor } from '@testing-library/react'
import useImage from '../index'

describe('>>> useImage', () => {
	beforeAll(() => {
		console.log('1111')
		jest.useFakeTimers()
	})

	const setUp = (source: string) =>
		renderHook(() =>
			useImage({
				source,
			})
		)

	let hook: any
	it('useImage base use', async () => {
		act(() => {
			hook = setUp('https://place.dog/300/200')
		})
		expect(hook.result.current.isLoading).toBeTruthy()
		act(() => {
			jest.runAllTimers()
		})
		// await waitFor(() => expect(hook.result.current.isLoading).toBeFalsy())
		expect(hook.result.current.isLoading).toBeTruthy()
		console.log(hook.result.current)
		// hook.rerender()
		// expect(hook.result.current.isLoading).toBeTruthy()
	})
})
