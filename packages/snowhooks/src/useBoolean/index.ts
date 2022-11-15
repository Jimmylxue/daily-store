import { useMemo } from 'react'
import useToggle from '../useToggle'

type TAction = {
	toggle: () => void
	set: (value: boolean) => void
	setTrue: () => void
	setFalse: () => void
}

export default function useBoolean(defaultValue = false): {
	state: boolean
	action: TAction
} {
	const {
		state,
		action: { toggle, set },
	} = useToggle(defaultValue)

	const action = useMemo(() => {
		const setTrue = () => set(true)
		const setFalse = () => set(false)
		return {
			set,
			setTrue,
			setFalse,
			toggle,
		}
	}, [])

	return {
		state,
		action,
	}
}
