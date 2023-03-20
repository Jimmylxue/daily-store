import { attributeDecorator } from '../attribute'

/**
 * decorator can be divided into class decorator, attribute decorator, method decorator and argument decorator.
 *
 * argument decorator also can divided on instance method argument and class static method argument,
 *  like method decorator, there has tree argument:
 *
 *  there is instance method argument:
 *
 *  - target is instance, like this in class
 *  - property is use this decorator method name
 *  - descriptor is an PropertyDescriptor.
 *
 */

function argumentDecorator(
	target: any,
	propertyKey: string,
	parameterIndex: number
) {
	console.log('a', target) // { name: 'jimmy' }
	console.log('a', propertyKey) // getName
	console.log('a', parameterIndex) // 0
}

class Person {
	@attributeDecorator
	name?: string
	constructor() {}

	getName(@argumentDecorator name: string) {
		return this.name
	}
}

export const jimmy = new Person()
