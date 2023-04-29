import { FC, useEffect, useRef, useState } from 'react'
import { autoRun, reactive } from '../reactive/reactive'

const testData = reactive({
	foo: 1,
})

const testData2 = reactive({
	foo: 1,
})

const testLazy = reactive({
	foo: 1,
})

export function Observer(fnComponent: FC): any {
	return () => {
		const ref = useRef()
		const [_, setData] = useState(0)
		useEffect(() => {
			autoRun(() => {
				console.log('run')
				// @ts-ignore
				ref.current = fnComponent()
				setData(data => data + 1)
			})
		}, [])

		useEffect(() => {
			/**
			 * 输出结果：
			 * 	1
			 * 	2
			 * 	结束了
			 */
			autoRun(() => {
				console.log(testData.foo)
			})
			testData.foo++
			console.log('结束了')
		}, [])

		useEffect(() => {
			/**
			 * 利用调度器机制，将副作用放在 宏任务队列中执行， 输出结果为：
			 * 	1
			 * 	结束了
			 * 	2
			 */
			autoRun(
				() => {
					console.log(testData2.foo)
				},
				{
					scheduler: fn => {
						setTimeout(fn)
					},
				}
			)
			testData2.foo++
			console.log('结束了')
		}, [])

		return ref.current
	}
}
