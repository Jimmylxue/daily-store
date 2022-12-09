class Snow {
	constructor() {
		this.name = 'jimmy'
	}

	// show() {
	// 	return this.name
	// }

	// 箭头函数的 this 是声明时绑定的
	show = () => {
		return this.name
	}
}

const getSnow = () => {
	return {
		hello: 'world',
		names: new Snow().show,
	}
}

const { hello, names } = getSnow()

console.log('sss', names())
console.log('sss', getSnow().names())
