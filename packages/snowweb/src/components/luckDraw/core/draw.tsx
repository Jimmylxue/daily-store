import { useCallback, useState } from 'react'
import { transformWinPrizeItem } from './transform'

export function useLuckDraw() {
	const progressIndex = [0, 1, 2, 5, 8, 7, 6, 3]
	const [prizeIndex, setPrizeIndex] = useState<number>(0) // 中奖高亮的key
	const [isDrawing, setIsDrawing] = useState<boolean>(false)

	const draw = useCallback((prizeKey: number) => {
		const layoutKey = transformWinPrizeItem(prizeKey)
		setIsDrawing(true)
		let tickIndex = 0
		const nextPrize = () => {
			if (tickIndex >= progressIndex.length) {
				tickIndex = 0
			}
			setPrizeIndex(progressIndex[tickIndex])
			tickIndex++
		}
		const diffCheck = () => {
			if (tickIndex !== layoutKey) {
				nextPrize()
				setTimeout(() => {
					diffCheck()
				}, 300)
			} else {
				setIsDrawing(false)
				console.log('抽奖结束', tickIndex)
				setPrizeIndex(progressIndex[tickIndex])
			}
		}
		let interVal = setInterval(() => {
			if (tickIndex >= progressIndex.length) {
				tickIndex = 0
			}
			setPrizeIndex(progressIndex[tickIndex])
			tickIndex++
		}, 300)

		setTimeout(() => {
			clearInterval(interVal)
			console.log('3秒到 定位中')
			setTimeout(() => {
				diffCheck()
			}, 300)
		}, 4000)
	}, [])

	return {
		prizeIndex,
		isDrawing,
		draw,
	}
}
