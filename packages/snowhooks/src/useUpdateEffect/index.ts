import { isDev, isFunction } from '@daily-store/common/utils'
import { useEffect, useRef } from 'react'

export default function useUpdateEffect(fn: () => void, deps: any[] = []) {
	const isMounted = useRef<boolean>(false)
	if (isDev) {
		if (!isFunction(fn)) {
			console.error(
				`useUpdateEffect: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
			)
		}
	}
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true
			return
		}
		fn?.()
	}, deps)
}
