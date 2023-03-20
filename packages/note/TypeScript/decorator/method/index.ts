import { attributeDecorator } from '../attribute'

/**
 * decorator can be divided into class decorator, attribute decorator, method decorator and argument decorator.
 *
 * method decorator also can divided on instance method and class static method,
 *
 * there is instance method decorator, which has three argument:
 *
 *  - target is instance, like this in class
 *  - property is use this decorator method name
 *  - descriptor is an PropertyDescriptor.
 *
 * method decorator can use very grace(优雅) to add some logic into an method !!!
 */

function methodDecorator(
	target: any,
	property: string,
	descriptor: PropertyDescriptor
) {
	console.log(target) // { name: 'jimmy' }
	console.log(property) // getName
	console.log(JSON.stringify(descriptor)) //  {"writable":true,"enumerable":false,"configurable":true}

	/**
	 * do some other logic
	 */
}

class Person {
	@attributeDecorator
	name?: string
	constructor() {}

	@methodDecorator
	getName() {
		return this.name
	}
}

export const jimmy = new Person()
