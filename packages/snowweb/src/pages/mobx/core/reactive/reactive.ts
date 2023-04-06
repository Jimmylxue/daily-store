type Dep = () => void

const map = new Map<string, Set<Dep>>()
let temp: Dep

export function reactive(obj: { [key in string]: any }) {
	const proxy = new Proxy(obj, {
		get(target, key, receiver) {
			const result = Reflect.get(target, key, receiver)
			if (map.has(key as string)) {
				map.get(key as string)?.add(temp)
			} else {
				map.set(key as string, new Set<Dep>().add(temp))
			}
			return result
		},
		set(target, key, value, receiver) {
			Reflect.set(target, key, value, receiver)
			map.get(key as string)?.forEach(fn => fn?.())
			return true
		},
	})

	return proxy
}

export function autoRun(fn: () => void) {
	temp = fn
	fn?.()
}
