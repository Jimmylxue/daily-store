import { memo, useCallback, useState } from 'react'

const Item = memo(
	({
		name,
		data,
		handle,
	}: {
		name: string
		data: number
		handle: () => void
	}) => {
		console.log('name:', name, 'data', data)
		return (
			<div>
				<p>{name}</p>
				<p>{data}</p>
			</div>
		)
	}
)

export default function () {
	const [num1, setNum1] = useState(0)
	const [num2, _] = useState(0)

	const handleAdd = useCallback(() => {
		setNum1(num1 + 1)
	}, [])

	return (
		<div>
			<button onClick={handleAdd}>add</button>
			<Item name="item1" data={num1} handle={handleAdd} />
			<Item name="item2" data={num2} handle={handleAdd} />
		</div>
	)
}
