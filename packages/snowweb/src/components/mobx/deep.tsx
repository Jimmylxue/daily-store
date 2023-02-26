import { Button } from 'antd'
import { box } from './box'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'

type TProps = {
	child: { name: string }
}

export const DeepDemo = observer(function () {
	const Names = observer(({ child }: TProps) => {
		return (
			<div
				onClick={action(() => {
					box.child[0].name = 'hello world'
				})}
			>
				{child.name}
			</div>
		)
	})

	return (
		<div>
			{box.child.map((child, index) => (
				<Names child={child} key={index} />
			))}
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
