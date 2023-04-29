import { autoRun, track, trigger } from '../reactive/reactive'

type Getter = () => any

export function computed(getter: Getter) {
	// 缓存上次计算的值
	let value: any

	// dirty 标志，用来标识是否需要重新计算值， true 表示数据已经脏了 需要重新计算
	let dirty = true

	const effectFn = autoRun(getter, {
		lazy: true,
		scheduler: () => {
			// 在调度器中将 dirty 设置为true
			/**
			 * 这个副作用函数 本质上也只有在 getter 中依赖的数据变化时才会执行，当他变化时也正好
			 * 是说明数据已经脏了 需要重新计算的时候，这样就非常巧妙的做到了缓存的功能了
			 */
			dirty = true
			// 当数据变化时，手动触发一下 trigger 更新函数，是为了解决 effect 嵌套 computer
			trigger(obj, 'value')
		},
	})

	const obj = {
		get value() {
			if (dirty) {
				value = effectFn()
				dirty = false
				console.log('重新计算的')
			} else {
				console.log('走缓存')
			}
			// 当读取value时 手动触发一下 track 依赖收集  是为了解决 effect 嵌套 computer
			track(obj, 'value')
			return value
		},
	}

	return obj
}
