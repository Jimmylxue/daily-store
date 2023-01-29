const data = {
	name: 'jimmy',
	skill: ['html', 'css', 'javascript'],
}

const observe = (data: any) => {
	if (!data || typeof data !== 'object') {
		return
	}

	Object.keys(data).forEach(key => {
		let currentValue = data[key]
		Object.defineProperty(data, key, {
			enumerable: true, // 可否被遍历
			configurable: false, // 客服被修改
			get() {
				console.log(
					`getting ${key} value now, getting value is :`,
					currentValue
				)
				return currentValue
			},
			set(newValue) {
				currentValue = newValue
				console.log(
					`setting ${key} value now, setting value is :`,
					currentValue
				)
			},
		})
	})
}

observe(data)
