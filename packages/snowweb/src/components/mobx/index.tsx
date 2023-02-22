import { Button, message, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { box } from './box'
import { observer } from 'mobx-react-lite'

export const MoBxDemo = observer(function () {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (box.flag) {
			message.success(count)
		}
	}, [count])

	return (
		<div>
			{box.flag ? '1' : '0'}
			<Button onClick={() => setCount(count + 1)}>add one</Button>
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

// export function MoBxDemo() {
// 	const [count, setCount] = useState(0)

// 	useEffect(() => {
// 		if (box.flag) {
// 			message.success(count)
// 		}
// 	}, [count])

// 	return (
// 		<div>
// 			{box.flag ? '1' : '0'}
// 			<Button onClick={() => setCount(count + 1)}>add one</Button>
// 			<Button
// 				onClick={() => {
// 					box.flag ? box.setFlg(false) : box.setFlg(true)
// 				}}
// 			>
// 				changeFlag
// 			</Button>
// 		</div>
// 	)
// }
