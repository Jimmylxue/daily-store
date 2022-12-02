import { MutableRefObject } from 'react'

export type TargetType = HTMLElement | Element | Window | Document

export type TargetValue<T> = T | undefined | null

export type BasicTarget<T extends TargetType = Element> =
	| (() => TargetValue<T>)
	| TargetValue<T>
	| MutableRefObject<TargetValue<T>>
