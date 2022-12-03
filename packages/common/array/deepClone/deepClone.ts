type BaseType = string | boolean | number | object

export function deepClone<T extends BaseType>(arg: T): T {
	/**
	 * due to `typeof [] === 'object'`, so we should check array type at first
	 */
	if (Array.isArray(arg)) {
		const cloneValue: any[] = []
		arg.forEach((value, index) => {
			cloneValue[index] = deepClone(value)
		})
		return cloneValue as T
	}

	if (typeof arg === 'object' && arg !== null) {
		const cloneValue: any = {}
		for (const key in arg) {
			if (Object.prototype.hasOwnProperty.call(arg, key)) {
				const element = arg[key]
				cloneValue[key] = deepClone(element as BaseType)
			}
		}
		return cloneValue
	}

	return arg
}
