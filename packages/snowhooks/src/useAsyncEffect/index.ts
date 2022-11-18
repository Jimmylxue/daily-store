import { isDev, isFunction } from '@daily-store/common/utils'
import { useEffect } from 'react'

export default function useAsyncEffect(fn: () => void, deps: any[] = []) {
	if (isDev) {
		if (!isFunction(fn)) {
			console.error('参数错误')
		}
	}

	const asyncEffect = async () => {
		await fn?.()
	}

	useEffect(() => {
		asyncEffect()
	}, deps)
}
