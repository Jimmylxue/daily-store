import { renderHook } from '@testing-library/react'
import useEventListener from '../index'

describe('>>> useEventListener', () => {
	let container: HTMLDivElement
	let state = 0

	beforeEach(() => {
		state = 0
		container = document.createElement('div')
		document.body.appendChild(container)
	})

	const click = () => {
		state++
	}

	it('test function target', () => {
		renderHook(() =>
			useEventListener('click', click, { target: () => container })
		)
		document.body.click()
		expect(state).toBe(0)
		container.click()
		expect(state).toBe(1)
		container.click()
		expect(state).toBe(2)
	})

	it('test click event', () => {
		const { rerender, unmount } = renderHook(() =>
			useEventListener('click', click, { target: container })
		)

		document.body.click()
		expect(state).toBe(0)
		container.click()
		expect(state).toBe(1)
		container.click()
		expect(state).toBe(2)
		rerender()
		expect(state).toBe(2)
		unmount()
		// after unmount, click callback will be avoid
		container.click()
		expect(state).toBe(2)
	})

	it('test once option', () => {
		let state = 0
		const click = () => {
			state++
		}
		const { unmount } = renderHook(() =>
			useEventListener('click', click, { target: container, once: true })
		)
		expect(state).toBe(0)
		container.click()
		expect(state).toBe(1)
		container.click()
		// state is still 1, because of once option is true
		expect(state).toBe(1)
	})
})
