/**
 * after config the tsconfig.json的compilerOptions.types to add "node" that can distinguish ’process‘
 */

import { MutableRefObject } from 'react'

export const isDev =
	process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

// use TS type unknown will more similar true meaning
export function isFunction(value: unknown): value is Function {
	return typeof value === 'function'
}

export function isBoolean(value: unknown): value is Boolean {
	return typeof value === 'boolean'
}

export const isReactRef = (
	target: any
): target is MutableRefObject<Element> => {
	return target?.hasOwnProperty('current') && Object.keys(target).length === 1
}

export function isDOM(target: any) {
	return !!(target instanceof HTMLElement)
}
