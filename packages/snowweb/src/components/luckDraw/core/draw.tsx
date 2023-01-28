import { useCallback, useRef, useState } from 'react'
import { transformWinPrizeItem } from './transform'

export function useLuckDraw() {
	const progressIndex = [0, 1, 2, 5, 8, 7, 6, 3]
	const [prizeIndex, setPrizeIndex] = useState<number>(3) // 中奖高亮的key
	const [isDrawing, setIsDrawing] = useState<boolean>(false)
	const speed = [50, 300] // 速度 ms 单位
	const speedLevel = useRef<number>(0) // 速度等级 => 对应的speed的下标

	const changeSpeed = (
		tickIndex: number,
		timer: number,
		fn: (tickIndex: number) => void
	) => {
		const interval = setInterval(() => {
			if (tickIndex >= progressIndex.length) {
				tickIndex = 0
			}
			setPrizeIndex(progressIndex[tickIndex])
			tickIndex++
		}, speed[speedLevel.current])
		setTimeout(() => {
			clearInterval(interval)
			fn?.(tickIndex)
		}, timer)
	}

	const draw = useCallback((prizeKey: number) => {
		const layoutKey = transformWinPrizeItem(prizeKey)
		setIsDrawing(true)
		let tickIndex = 0
		// 中奖格子移动一格
		const nextPrize = () => {
			if (tickIndex >= progressIndex.length) {
				tickIndex = 0
			}
			setPrizeIndex(progressIndex[tickIndex])
			tickIndex++
		}

		// 检查操作
		const diffCheck = () => {
			if (tickIndex !== layoutKey) {
				nextPrize()
				setTimeout(() => {
					diffCheck()
				}, speed[speedLevel.current])
			} else {
				setIsDrawing(false)
				speedLevel.current = 0
				console.log('抽奖结束', tickIndex)
				setPrizeIndex(progressIndex[tickIndex])
			}
		}

		changeSpeed(tickIndex, 4000, (_tickIndex: number) => {
			speedLevel.current += 1
			console.log('四秒结束了', _tickIndex)

			changeSpeed(_tickIndex, 2000, __tickIndex => {
				console.log('两秒结束了', __tickIndex)
				tickIndex = __tickIndex
				diffCheck()
			})
		})
	}, [])

	return {
		prizeIndex,
		isDrawing,
		draw,
	}
}
