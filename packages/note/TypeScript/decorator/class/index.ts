interface Person {
	name: string
	age: number
}

/**
 * decorator can be divided into(分为) class decorator, attribute decorator, method decorator and argument decorator.
 *
 * there is class decorator:
 */

function normalDecorator(target: any) {
	target.prototype.name = 'jimmy'
	target.prototype.age = 24
}

@normalDecorator
class Person {
	constructor() {}
}

export const jimmy = new Person()
