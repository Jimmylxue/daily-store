import { useState } from 'react'
import useAsyncEffect from '..'

function addOne() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true)
		}, 1000)
	})
}

export default function Demo1() {
	const [count, setCount] = useState(0)
	useAsyncEffect(async () => {
		const status = await addOne()
		if (status) {
			setCount(count + 1)
		}
	}, [])

	return (
		<div>
			<p>useAsyncEffect</p>
			<p>当前count：{count}</p>
		</div>
	)
}
