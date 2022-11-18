import { isDev, isFunction } from '@daily-store/common/utils'
import { useEffect } from 'react'

export default function useAsyncEffect(
	fn: () => AsyncGenerator<void, void, void> | Promise<void>,
	deps: any[] = []
) {
	if (isDev) {
		if (!isFunction(fn)) {
			console.error('参数错误')
		}
	}

	function isAsyncGenerator(
		value: AsyncGenerator<void, void, void> | Promise<void>
	): value is AsyncGenerator<void, void, void> {
		// @ts-ignore
		return isFunction(value[Symbol.asyncIterator])
	}

	useEffect(() => {
		/**
		 * Due to useEffect first argument function is can't be async function,
		 * so we just show an diff function to do effect can be work
		 *
		 * function in here call can be execute async function
		 */
		const e = fn()
		let cancelled = false
		async function execute() {
			/**
			 * this is to execute generator function,
			 * as we all know generator also an async function
			 */
			if (isAsyncGenerator(e)) {
				console.log('ddd')
				while (true) {
					const result = await e.next()
					if (result.done || cancelled) {
						break
					}
				}
			}
		}
		execute()
		return () => {
			cancelled = true
		}
	}, deps)
}
