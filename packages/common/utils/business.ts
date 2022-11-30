import { TTargetType } from '../types'
import { isDOM, isFunction, isReactRef } from './base'

export function getRealTarget(target?: TTargetType) {
	if (isFunction(target)) {
		return target()
	}

	if (isReactRef(target)) {
		return target.current
	}

	if (isDOM(target)) {
		return target
	}

	return window
}
