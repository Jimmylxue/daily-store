import { MutableRefObject } from 'react'

export type TTargetType =
	| Element
	| Document
	| (() => Element | Document)
	| MutableRefObject<Element>
