import { useEffect } from 'react'
import { Layout, RenderChess } from './component'
import { useGame } from './core/useGame'

export function Gobang() {
	const { twoDiffPointList, playChess, winner, rePlay } = useGame()
	const clickFn: JSX.IntrinsicElements['div']['onClick'] = e => {
		const clickPosition = {
			xPx: e.nativeEvent.offsetX,
			yPx: e.nativeEvent.offsetY,
		}
		// @ts-ignore
		if ([...e.target.classList].includes('absolute')) {
			clickPosition.xPx = e.nativeEvent.x - 100
			clickPosition.yPx = e.nativeEvent.y - 50
		}
		// if(e.currentTarget)

		console.log({ x: clickPosition.xPx, y: clickPosition.yPx })
		playChess(clickPosition)
	}

	useEffect(() => {
		if (winner) {
			alert(`${winner}赢了`)
		}
	}, [winner])

	return (
		<>
			<div
				className="relative"
				style={{
					width: 750,
					height: 750,
					marginTop: 50,
					marginLeft: 100,
					zIndex: 100,
				}}
			>
				<div className=" w-full h-full" onClick={clickFn}>
					<Layout />
					<RenderChess pointList={twoDiffPointList} />
				</div>
			</div>
			<button onClick={rePlay}>replay</button>
		</>
	)
}
