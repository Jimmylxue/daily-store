import { useCallback, useReducer } from 'react'

export default function useUpdate() {
	const [, dispatch] = useReducer(x => x + 1, 0)

	return useCallback(dispatch, [])
}
