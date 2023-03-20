import { attributeDecorator } from '../attribute'

/**
 * decorator can be divided into class decorator, attribute decorator, method decorator and argument decorator.
 *
 * method decorator also can divided on instance method and class static method,
 *
 * there is instance method decorator, which has three argument:
 *
 *  - target is class, different from instance decorator target, which is like this in class
 *  - property is use this decorator method name
 *  - descriptor is an PropertyDescriptor.
 */

function staticMethodDecorator(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	console.log(target) // [class Person]
	console.log(propertyKey) // getName
	console.log(JSON.stringify(descriptor)) //  {"writable":true,"enumerable":false,"configurable":true}
}

export class Person {
	@attributeDecorator
	name?: string
	constructor() {}

	@staticMethodDecorator
	static getName() {
		return 'static name'
	}
}

export const jimmy = new Person()
