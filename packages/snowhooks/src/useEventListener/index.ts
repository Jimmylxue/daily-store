import { TTargetType } from '@daily-store/common/types'
import {
	getRealTarget,
	isDOM,
	isFunction,
	isReactRef,
} from '@daily-store/common/utils'
import { useLayoutEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

type TOptions = {
	target?: TTargetType
	once?: boolean
	capture?: boolean
	passive?: boolean
}

export default function useEventListener(
	eventName: keyof WindowEventMap,
	handler: (e: Event) => void,
	option?: TOptions
) {
	const once = useRef<boolean>(false)

	const fn = useCallback(
		(e: Event) => {
			if (option?.once && once.current) {
				return
			}
			handler?.(e)
			once.current = true
		},
		[option?.target]
	)

	useLayoutEffect(() => {
		const realTarget = getRealTarget(option?.target)

		realTarget?.addEventListener(eventName, fn)
		return () => {
			realTarget?.removeEventListener(eventName, fn)
		}
	}, [option?.target])
}
