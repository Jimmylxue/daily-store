/**
 * This of normal function is dynamic！
 * 	- direct running ->  name()
 * 		  this is global or window or undefined, this is depended on environment
 * 	- object to call -> obj.name()
 * 			this is obj, because of is obj to call name function,
 *
 * Arrow function(箭头函数) this is write dead(写死的), this 指向的是 声明这个函数时 拥有这个函数的对象， 某种意义上这种this 是不动态的。
 */

class Snow {
	constructor() {
		this.name = 'jimmy'
		this.age = 24
	}

	show() {
		return this.name
	}

	show2 = () => {
		return this.age
	}
}

const getSnow = () => {
	return {
		name: 'snow~',
		hello: 'world',
		names: new Snow().show,
		age: new Snow().age,
	}
}

const { hello, names } = getSnow()

console.log('name1', names()) // throw error -> cause by undefined.name
console.log('name2', getSnow().names()) // undefined

const { age } = getSnow()
console.log('age1', age()) // 24
console.log('age1', getSnow.age()) // 24
