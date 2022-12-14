type TFn<T> = (payload: T) => void

export class Observable<T> {
	private observers: Set<TFn<T>> = new Set()

	subscribe = (fn: TFn<T>) => {
		this.observers.add(fn)
		return () => {
			this.observers.delete(fn)
		}
	}

	notify = (payload: T) => {
		this.observers.forEach(observer => observer?.(payload))
	}
}
