import { useEffect } from 'react'
import { isFunction, isDev } from '@daily-store/common/utils'

export default function useMounted(fn: () => void) {
	if (isDev) {
		if (!isFunction(fn)) {
			console.error(
				`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
			)
		}
	}
	useEffect(() => {
		fn?.()
	}, [])
}
