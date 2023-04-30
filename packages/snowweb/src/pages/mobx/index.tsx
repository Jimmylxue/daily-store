import { Button } from 'antd'
import React, { FC } from 'react'
import { Observer } from './core/observer/observer'
import { reactive, shallowReactive } from './core/reactive/reactive'

// const obj = shallowReactive({
const obj = reactive({
	name: 'jimmy',
	age: 22,
	study: {
		book: 'js',
	},
})

const obj2 = reactive({
	ok: true,
	text: 'hello world',
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
			<hr />
			<div>
				{/* 
					当 obj2.ok 为 false 的时候， 这时候应该清空掉 obj2.text 的副作用函数集合。
						因为这种情况已经不需要关注 obj2.text 的变化了
				*/}
				{JSON.stringify(obj2)} {obj2.ok ? obj2.text : 'not change'}
				<Button
					onClick={() => {
						obj2.ok = !obj2.ok
					}}
				>
					change Status
				</Button>
				<Button
					onClick={() => {
						obj2.text = 'jimmy'
					}}
				>
					change Text
				</Button>
			</div>
		</div>
	)
}

export const MoBxDemo = Observer(Container)
