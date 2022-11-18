import { useState } from 'react'
import useAsyncEffect from '../index'

function addOne(value: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(value.length > 0)
		}, 1000)
	})
}

export default () => {
	const [value, setValue] = useState('')
	const [pass, setPass] = useState<boolean>()

	useAsyncEffect(
		async function* () {
			setPass(undefined)
			const result = await addOne(value)
			yield
			setPass(result)
		},
		[value]
	)

	return (
		<div>
			<input
				value={value}
				onChange={e => {
					setValue(e.target.value)
				}}
			/>
			<p>
				{pass === null && 'Checking...'}
				{pass === false && 'Check failed.'}
				{pass === true && 'Check passed.'}
			</p>
		</div>
	)
}
