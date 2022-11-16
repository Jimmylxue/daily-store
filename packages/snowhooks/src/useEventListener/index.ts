import { isReactRef } from '@daily-store/common/utils'
import { useLayoutEffect } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useEffect, useRef } from 'react'

type TOptions = {
	target: any
	once?: boolean
	capture?: boolean
	passive?: boolean
}

function isDOM(target: any) {
	return !!(target instanceof HTMLElement)
}

function getRealTarget(target: any) {
	// switch (target) {
	// 	case isReactRef(target):
	// 		return target.current
	// 	case isDOM(target):
	// 		return target
	// 	case target === 'Document':
	// 		return document
	// 	default:
	// 		return window
	// }
	if (isReactRef(target)) {
		return target?.current
	}

	if (isDOM(target)) {
		return target
	}

	return window
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

	// useEffect(() => {
	useLayoutEffect(() => {
		console.log('option', option?.target)
		const realTarget = getRealTarget(option?.target)
		console.log('res', realTarget)

		realTarget.addEventListener(eventName, fn)
		return () => {
			realTarget.removeEventListener(eventName, fn)
		}
	}, [option?.target])
}
