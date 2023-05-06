Function.prototype.myCall = function (ctx, ...args) {
	const key = Symbol('dz_key') // 用不重复的key
	Object.defineProperty(ctx, key, {
		// 设置这个key为不可枚举
		enumerable: false,
		value: this,
	})
	const result = ctx[key](...args)
	// console.log(ctx[key])
	// delete ctx[key]
	return result
}

const obj = {
	name: 'jimmy',
}

function getName(obj) {
	console.log(this, obj)
	return obj.name
}

getName.myCall(obj, { age: 22 })
