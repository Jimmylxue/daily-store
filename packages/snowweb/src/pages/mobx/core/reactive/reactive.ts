type Dep = () => void

// 函数类型 且拥有 deps 静态属性
interface IDep {
	(): void
	deps: Set<Dep>
}

type Target = { [key in string]: any }

/**
 * 为何 bucket 使用的是 WeakMap 而 不是 Map
 *
 * 	Map 是会影响垃圾回收机制的， 如果Map中引用了某个key, 这个key 将不会被垃圾回收机制所回收，会一直存在一个引用关系
 *
 * 	而 WeakMap 则是不会影响垃圾回收机制，它的key是会有存在被回收的情况的（没有引用关系） 所以被回收时就查不到引用关系了。
 *
 * 	所以 WeakMap 常用于存储那些只有key 被引用的对象存在时（没有被垃圾回收）才有价值，在这个案例中：
 * 		如果 target 被 垃圾回收了 就完全没有必要再保留 target 所关联的所有信息了
 */

const bucket = new WeakMap<Target, Map<string | symbol, Set<Dep>>>() // WeakMap 由 target 和 map 构成 , Map 由 key 与 Set 构成

let activeEffect: IDep | undefined // 用这个方式当effect 嵌套时会发生问题，因为这样等于同一时刻只会有一个effect 会出现嵌套内部的覆盖掉外部的

const effectStack: IDep[] = []

export function reactive(obj: Target): any {
	const proxy = new Proxy(obj, {
		get(target, key, receiver) {
			track(target, key)
			const result = Reflect.get(target, key, receiver)
			if (typeof result === 'object' && result !== null) {
				return reactive(result)
			}
			return Reflect.get(target, key, receiver)
		},
		set(target, key, value, receiver) {
			Reflect.set(target, key, value, receiver)
			trigger(target, key)
			return true // return true 表示设置成功
		},
	})
	return proxy
}

export function track(target: Target, key: string | symbol) {
	if (!activeEffect) {
		return
	}
	let depsMap = bucket.get(target)
	if (!depsMap) {
		bucket.set(target, (depsMap = new Map()))
	}
	let deps = depsMap.get(key)
	if (!deps) {
		depsMap.set(key, (deps = new Set<Dep>()))
	}
	deps.add(activeEffect)
	activeEffect.deps.add(deps as any)
}

export function trigger(target: Target, key: string | symbol) {
	const depsMap = bucket.get(target)
	if (!depsMap) {
		return true
	}
	const effects = depsMap.get(key)

	const effectsToRun = new Set(effects)
	effectsToRun.forEach(effectFn => effectFn?.())
}

export function cleanup(effectFn: any) {
	for (let i = 0; i < effectFn.deps.length; i++) {
		const deps = effectFn.deps[i]
		deps.delete(effectFn)
	}
	effectFn.deps.length = 0
}

export function autoRun(fn: () => void) {
	const effectFn: IDep = () => {
		cleanup(effectFn) // 每次副作用函数执行之前，将其从关联的Set集合中删除
		activeEffect = effectFn
		effectStack.push(activeEffect) // 使用effectStack 是为了防止嵌套时发生问题
		fn?.() //  fn 执行时 会重新触发和 收集新的 依赖关系
		effectStack.pop()
		activeEffect = effectStack[effectStack.length - 1]
	}
	// effectFn.deps 用来村塾所有与该副作用函数相关联的依赖集合
	effectFn.deps = new Set()
	effectFn()
}
