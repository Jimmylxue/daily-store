import { isBoolean, isDev } from '@daily-store/common/utils'
import { useMemo, useState } from 'react'

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
	const [state, setState] = useState(() => {
		if (isDev) {
			if (!isBoolean(defaultValue)) {
				console.error(
					`useBoolean: parameter \`defaultValue\` expected to be a boolean, but got "${typeof defaultValue}".`
				)
			}
			return !!defaultValue
		}
		return !!defaultValue
	})

	// useMemo can avoid rerender from other state change
	const action = useMemo(() => {
		return {
			toggle: () => {
				setState(!state)
			},
			set: (value: boolean) => {
				if (isDev) {
					if (!isBoolean(value)) {
						console.error(
							`useBoolean: parameter \`defaultValue\` expected to be a boolean, but got "${typeof value}".`
						)
					}
					setState(!!value)
				}
				setState(!!value)
			},
			setTrue: () => {
				setState(true)
			},
			setFalse: () => {
				setState(false)
			},
		}
	}, [])

	return {
		state,
		action,
	}
}
