import { createReactive } from './createReactive'
import { Target } from './type'

export function readonly(obj: Target): any {
	return createReactive(obj, false, true)
}

export function shallowReadonly(obj: Target): any {
	return createReactive(obj, true, true)
}
