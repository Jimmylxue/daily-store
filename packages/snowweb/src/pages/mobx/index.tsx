import { Button } from 'antd'
import React, { FC } from 'react'
import { Observer } from './core/observer/observer'
import { reactive } from './core/reactive/reactive'

const obj = reactive({
	name: 'jimmy',
	age: 22,
	study: {
		book: 'js',
	},
})

const Container: FC = () => {
	return (
		<div>
			{obj.name} -- {obj.age} -- {obj.study.book}
			<Button
				onClick={() => {
					obj.name = '吉米'
				}}
			>
				changeName
			</Button>
			<Button
				onClick={() => {
					obj.age = 33
				}}
			>
				changeAge
			</Button>
			<Button
				onClick={() => {
					obj.study.book = 'css'
				}}
			>
				changeStudy
			</Button>
		</div>
	)
}

export const MoBxDemo = Observer(Container)
