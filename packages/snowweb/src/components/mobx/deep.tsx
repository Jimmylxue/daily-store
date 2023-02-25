import { Button, message, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { box } from './box'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'

type TProps = {
	child: { name: string }
}

export const DeepDemo = observer(function () {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (box.flag) {
			message.success(count)
		}
	}, [count])

	// const Names = observer(({ child }: TProps) => {
	// 	return (
	// 		<div
	// 			onClick={action(() => {
	// 				box.childs[0].name = 'hello world'
	// 			})}
	// 		>
	// 			{child.name}
	// 		</div>
	// 	)
	// })

	const Names = ({ child }: TProps) => {
		return (
			<div
				onClick={action(() => {
					box.childs[0].name = 'hello world'
				})}
			>
				{child.name}
			</div>
		)
	}

	return (
		<div>
			{box.childs.map((child, index) => (
				<Names child={child} key={index} />
			))}
			<Button onClick={() => setCount(count + 1)}>add one</Button>
			<Button
				onClick={() => {
					box.addChild({
						name: 'jimmy',
					})
				}}
			>
				add Child
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
