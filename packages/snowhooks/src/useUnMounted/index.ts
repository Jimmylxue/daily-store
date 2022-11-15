import { isDev, isFunction } from '@daily-store/common/utils'
import { useEffect } from 'react'

export default function useUnMounted(fn: () => void) {
	if (isDev) {
		if (!isFunction(fn)) {
			console.error(
				`useUnMounted: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
			)
		}
	}
	useEffect(() => fn, [])
}
