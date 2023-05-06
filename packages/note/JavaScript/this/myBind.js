Function.prototype.myBind = function (ctx) {
	/**
	 * this 是一个函数， 因为在用时是这样用的：
	 *  getName.myBind() 在myBind中 this 指向 getName, getName 是一个函数
	 */
	const fn = this
	return function () {
		return fn.apply(ctx, arguments)
	}
}

const obj = {
	name: 'jimmy',
}

function getName(obj) {
	console.log(this, obj)
}

const newFn = getName.myBind(obj)

newFn({ age: 22 })
