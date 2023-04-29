import { Button } from 'antd'
import React, { FC, useEffect } from 'react'
import { computed } from '../core/computed/computed'
import { Observer } from '../core/observer/observer'
import { reactive } from '../core/reactive/reactive'

const obj = reactive({
	foo: 1,
	bar: 2,
})

const Container: FC = () => {
	useEffect(() => {
		const sumRes = computed(() => obj.foo + obj.bar)
		console.log(sumRes.value)
		console.log(sumRes.value)
		console.log(sumRes.value)
		obj.foo = 2
		console.log(sumRes.value)
		console.log(sumRes.value)
	}, [])

	return <div>computed demo - 控制台查看</div>
}

// export const ComputedDemo = Observer(Container)
export const ComputedDemo = Container
