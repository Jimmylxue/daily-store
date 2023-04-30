import { readonly } from '../readonly/readonly'
import { reactive, track, trigger } from './reactive'
import { Target } from './type'

// 创建响应式 工厂函数
export function createReactive(
	obj: Target,
	isShallow = false,
	isReadOnly = false
) {
	const proxy = new Proxy(obj, {
		get(target, key, receiver) {
			if (!isReadOnly) {
				// 只读的数据 没有必要监听依赖收集关系
				track(target, key)
			}
			const result = Reflect.get(target, key, receiver)
			if (isShallow) {
				return result
			}
			if (typeof result === 'object' && result !== null) {
				// 对象深层只读
				return isReadOnly ? readonly(result) : reactive(result)
			}
			return Reflect.get(target, key, receiver)
		},
		set(target, key, value, receiver) {
			if (isReadOnly) {
				console.warn(`属性${String(key)}是只读的`)
				return true
			}
			Reflect.set(target, key, value, receiver)
			trigger(target, key)
			return true // return true 表示设置成功
		},
		deleteProperty(target, key) {
			if (isReadOnly) {
				console.warn(`属性${String(key)}是只读的`)
				return true
			}

			const hadKey = Object.prototype.hasOwnProperty.call(target, key)
			const res = Reflect.deleteProperty(target, key)

			if (res && hadKey) {
				trigger(target, key, 'Delete')
			}

			return res
		},
	})
	return proxy
}
