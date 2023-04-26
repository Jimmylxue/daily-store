type Dep = () => void

type Target = { [key in string]: any }

const map = new Map<string, Set<Dep>>()
let temp: Dep

export function reactive(obj: Target): any {
	const proxy = new Proxy(obj, {
		get(target, key, receiver) {
			track(map, key)

			const result = Reflect.get(target, key, receiver)
			if (typeof result === 'object' && result !== null) {
				return reactive(result)
			}
			return Reflect.get(target, key, receiver)
		},
		set(target, key, value, receiver) {
			Reflect.set(target, key, value, receiver)
			map.get(key as string)?.forEach(fn => fn?.())
			return true
		},
	})
	return proxy
}

export function track(map: Map<string, Set<Dep>>, key: string | symbol) {
	if (map.has(key as string)) {
		map.get(key as string)?.add(temp)
	} else {
		map.set(key as string, new Set<Dep>().add(temp))
	}
}

export function autoRun(fn: () => void) {
	temp = fn
	fn?.()
}
