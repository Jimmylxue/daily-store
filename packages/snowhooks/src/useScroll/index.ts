import { BasicTarget, TargetType } from '@daily-store/common/types'
import { getRealTarget } from '@daily-store/common/utils'
import { useCallback, useLayoutEffect, useState } from 'react'

export type Target = BasicTarget<HTMLElement | Element | Window | Document>

type TScrollOption<T extends Target = Target> = {
	target?: T
	shouldUpdate?: ({ top, left }: { top: number; left: number }) => boolean
}

type Position = { left: number; top: number }

export default function useScroll(option?: TScrollOption) {
	const [position, setPosition] = useState<Position>({
		left: 0,
		top: 0,
	})
	useLayoutEffect(() => {
		const el = getRealTarget(option?.target, document)
		if (!el) {
			return
		}
		const updatePosition = () => {
			let newPosition: Position
			if (el === document) {
				if (el.scrollingElement) {
					newPosition = {
						left: document!.scrollingElement!.scrollLeft,
						top: document!.scrollingElement!.scrollTop,
					}
				} else {
					newPosition = {
						left: Math.max(
							window.pageXOffset,
							document.documentElement.scrollLeft,
							document.body.scrollLeft
						),
						top: Math.max(
							window.pageYOffset,
							document.documentElement.scrollTop,
							document.body.scrollTop
						),
					}
				}
			} else {
				newPosition = {
					left: (el as Element).scrollLeft,
					top: (el as Element).scrollTop,
				}
			}
			setPosition(newPosition)
		}

		el?.addEventListener('scroll', updatePosition)
		return () => {
			el.removeEventListener('scroll', updatePosition)
		}
	}, [option?.target])

	return position
}
