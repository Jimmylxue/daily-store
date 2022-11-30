import { getRealTarget } from '@daily-store/common/utils'
import { MutableRefObject, useEffect, useState } from 'react'

type TTargetType =
	| Element
	| Document
	| (() => Element | Document)
	| MutableRefObject<Element>

export default function useTextSelection(target?: TTargetType) {
	const [selectText, setSelectText] = useState<string>('')
	useEffect(() => {
		const realTarget = getRealTarget(target)
		console.log('realTarget', realTarget?.addEventListener)

		const mouseDownHandler = () => {}
		const mouseUpHandler = () => {}

		realTarget?.addEventListener('mousedown', mouseDownHandler)
		realTarget?.addEventListener('mouseup', mouseUpHandler)
	}, [])

	return { text: selectText }
}
