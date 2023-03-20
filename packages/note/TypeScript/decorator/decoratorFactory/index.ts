interface Person {
	name: string
	age: string
}

/**
 *
 * decoratorFactory:
 *
 *  sometimes we wanner add some argument by dynamic, we can use pattern of factory(工厂模式),
 *  which to accept some argument to used by return function.
 *
 *  return function is truly decorator
 */

function decoratorFactory(...argument: string[]) {
	return (target: any) => {
		target.prototype.name = argument[0]
		target.prototype.age = argument[1]
	}
}

@decoratorFactory('jimmy', '24')
class Person {
	constructor() {}
}

export const jimmy = new Person()
