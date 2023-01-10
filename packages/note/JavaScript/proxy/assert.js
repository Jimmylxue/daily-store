const assert = new Proxy(
	{},
	{
		set(target, check, value) {
			if (!value) {
				console.log('error :', check)
			}
			return true
		},
		get(target, check) {
			return target[check]
		},
	}
)

assert['check 15 is smaller than 17'] = 15 > 17
