import { createReactive } from '../reactive/createReactive'
import { Target } from '../reactive/type'

export function readonly(obj: Target): any {
	return createReactive(obj, false, true)
}

export function shallowReadonly(obj: Target): any {
	return createReactive(obj, true, true)
}
