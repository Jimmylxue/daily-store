import { Button, Input, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

export const EffectEventDemo: FC = () => {
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [show, setShow] = useState<boolean>(false)

	/**
	 * 每一个effect版本“看到”的值都来自于它属于的那次渲染
	 */

	useEffect(() => {
		if (show) {
			message.success(`${name} + ${age}`)
		}
	}, [show])

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		message.success(`${name} + ${age}`)
	// 	}, 5000)
	// }, [])

	return (
		<div>
			<Input
				value={name}
				onChange={e => {
					setName(e.target.value)
				}}
			></Input>
			<Input
				value={age}
				onChange={e => {
					setAge(Number(e.target.value))
				}}
			></Input>
			<Switch
				checked={show}
				onClick={val => {
					setShow(val)
				}}
			/>
		</div>
	)
}
