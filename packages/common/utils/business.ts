import { BasicTarget, TargetType, TargetValue } from '../types'
import { isBrowser, isDOM, isFunction, isReactRef } from './base'

export function getRealTarget<T extends TargetType>(
	target?: BasicTarget<T>,
	defaultElement?: T
): TargetValue<T> {
	if (!isBrowser()) {
		return undefined
	}

	if (!target) {
		return defaultElement
	}

	let targetElement: TargetValue<T>

	if (isFunction(target)) {
		targetElement = target()
	} else if (isReactRef(target)) {
		targetElement = target.current
	} else {
		targetElement = target
	}

	return targetElement
}
