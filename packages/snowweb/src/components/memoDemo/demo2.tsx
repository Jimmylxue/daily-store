import { useState } from 'react'

/**
 * 在这个 Demo 中， Item这个子组件并没有使用memo, 所以当父组件更新的时候，子组件也会跟着一起重新渲染。
 */

const Item = ({ name, data }: { name: string; data: number }) => {
	console.log('name:', name, 'data', data)
	return (
		<div>
			<p>{name}</p>
			<p>{data}</p>
		</div>
	)
}

export default function () {
	const [num1, setNum1] = useState(0)
	const [num2, _] = useState(0)

	const handleAdd = () => {
		setNum1(num1 + 1)
	}

	return (
		<div>
			<button onClick={handleAdd}>add</button>
			<Item name="item1" data={num1} />
			<Item name="item2" data={num2} />
		</div>
	)
}
