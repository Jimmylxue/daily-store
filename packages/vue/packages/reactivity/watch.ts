import { autoRun } from './reactive'

type Source = () => void | { [key: string]: any }

/**
 * watch 本质就是对 effect 的二次封装
 */

export function watch(
	source: Source,
	callback: (newValue: any, oldValue: any) => void
) {
	// watch 除了可以接收响应式对象，还可以接受 getter
	let getter: () => void
	if (typeof source === 'function') {
		// 如果 source 是函数，说明用户传递的本质上是 getter 则直接将 source 赋值给 getter 即可
		getter = source
	} else {
		// 否则 按照原来的实现调用 traverse 递归的读取
		getter = () => traverse(source)
	}

	let oldValue: any, newValue: any

	const effectFn = autoRun(() => getter(), {
		lazy: true,
		scheduler: () => {
			newValue = effectFn()
			callback(newValue, oldValue)
			oldValue = newValue
		},
	})

	oldValue = effectFn()
}

export function traverse(value: { [key: string]: any }, seen = new Set()) {
	// 如果读取的数据是原始数据，或已经被读取过了，则什么都不用做即可
	if (typeof value !== 'object' || value === null || seen.has(value)) return

	// 将数据添加到 seen 中 表示已经读取过了 避免死循环
	seen.add(value)

	// 遍历对象 深度递归
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(value, key)) {
			const element = value[key]
			traverse(element, seen)
		}
	}

	return value
}
