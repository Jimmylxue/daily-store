import { memo } from 'react'
import classnames from 'classnames'
import { TShowList } from '../core/types'
import './style.less'
import { useLuckDraw } from '../core/draw'

type TProps = {
	prizeLayoutList: TShowList
}

export default memo(({ prizeLayoutList }: TProps) => {
	const { prizeIndex, draw, isDrawing } = useLuckDraw()

	return (
		<div className=" grid grid-cols-3 grid-rows-3 gap-2">
			{prizeLayoutList.map((item, index) => (
				<div
					key={index}
					style={{
						width: 200,
						height: 200,
					}}
					className={classnames(
						'flex justify-center items-center border border-gray-400',
						{
							winPrize: prizeIndex === index,
						}
					)}
					onClick={() => {
						if (item.itemType === 'button') {
							if (!isDrawing) {
								const index = Math.floor(Math.random() * 8) + 1
								console.log(`即将抽中第${index}个奖品`)
								draw(index)
							} else {
								console.log('正在抽奖中')
							}
						}
					}}
				>
					{item.name}
				</div>
			))}
		</div>
	)
})
