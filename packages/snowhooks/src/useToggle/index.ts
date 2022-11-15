import { useMemo, useState } from 'react'

type TAction<T> = {
	toggle: () => void
	set: (value: T) => void
	setLeft: () => void
	setRight: () => void
}

function useToggle<T = boolean>(): { state: boolean; action: TAction<T> }

function useToggle<T = boolean>(
	defaultValue: T
): { state: boolean; action: TAction<T> }

function useToggle<T, U>(
	defaultValue: T,
	reverseValue: U
): { state: boolean; action: TAction<T> }

function useToggle<T extends boolean, U>(
	defaultValue: T = false as unknown as T,
	reverseValue?: U
): { state: T | U; action: TAction<T | U> } {
	const [state, setState] = useState<T | U>(defaultValue)

	const action = useMemo(() => {
		// reverseOriginValue is gain truly reverseValue's value, because reverseOriginValue is possible be undefined, which defaultValue type is boolean
		const reverseOriginValue = (
			reverseValue === undefined ? !defaultValue : reverseValue
		) as T | U

		return {
			toggle: () => {
				setState(v => (v === defaultValue ? reverseOriginValue : defaultValue))
			},
			set: (value: T | U) => {
				setState(value)
			},
			setLeft: () => {
				setState(defaultValue)
			},
			setRight: () => {
				setState(reverseOriginValue)
			},
		}
	}, [])

	return {
		state,
		action,
	}
}

export default useToggle
