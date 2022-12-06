import { useCallback, useState } from 'react'
import { transformWinPrizeItem } from './transform'

export default function useLuckDraw() {
	const progressIndex = [0, 1, 2, 5, 8, 7, 6, 3]
	const [prizeIndex, setPrizeIndex] = useState<number>(0)
	const [isDrawing, setIsDrawing] = useState<boolean>(false)

	const draw = useCallback((prizeKey: number) => {
		setIsDrawing(true)
		const layoutKey = transformWinPrizeItem(prizeKey)
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
				console.log('抽奖结束')
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
		}, 3000)
	}, [])

	return {
		prizeIndex,
		isDrawing,
		draw,
	}
}
