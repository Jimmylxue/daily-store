interface Person {
	name: string
	age: number
}

/**
 *
 * decorator is an function, which has some arguments
 *
 * normalDecorator is an normal use. it has one argument, which is ES5 Constructor,
 * we can use 'target.prototype' to add attribute into class
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
