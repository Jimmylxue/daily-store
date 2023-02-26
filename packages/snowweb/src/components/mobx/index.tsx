import { Button } from 'antd'
import { box } from './box'
import { observer } from 'mobx-react-lite'

export const MoBxDemo = observer(function () {
	return (
		<div>
			{box.flag ? '1' : '0'}
			<Button
				onClick={() => {
					box.flag ? box.setFlg(false) : box.setFlg(true)
				}}
			>
				changeFlag
			</Button>
		</div>
	)
})
