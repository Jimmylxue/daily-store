/**
 * decorator can be divided into class decorator, attribute decorator, method decorator and argument decorator.
 *
 * there is attribute decorator
 *
 *  decorator has two argument：
 *    - first argument is an class Person, like this in class
 *
 *    - second argument is attribute who use this decorator
 */

export function attributeDecorator(target: any, property: string) {
	console.log(target) // Person {}
	console.log(property) // name

	target[property] = 'jimmy'
}

class Person {
	@attributeDecorator
	name?: string
	constructor() {}
}

export const jimmy = new Person()
