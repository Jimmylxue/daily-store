import { Layout, RenderChess } from './component'
import { useGame } from './core/useGame'

export function Gobang() {
	const { twoDiffPointList, playChess } = useGame()
	const clickFn: JSX.IntrinsicElements['div']['onClick'] = e => {
		const clickPosition = {
			xPx: e.nativeEvent.offsetX,
			yPx: e.nativeEvent.offsetY,
		}
		console.log({ x: clickPosition.xPx, y: clickPosition.yPx })
		playChess(clickPosition)
	}

	return (
		<div
			className="relative"
			style={{
				width: 750,
				height: 750,
				marginTop: 50,
				marginLeft: 100,
			}}
		>
			<div className=" w-full h-full" onClick={clickFn}>
				<Layout />
				<RenderChess pointList={twoDiffPointList} />
			</div>
		</div>
	)
}
