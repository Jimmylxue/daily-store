import { attributeDecorator } from '../attribute'

/**
 * /**
 * decorator can be divided into class decorator, attribute decorator, method decorator and argument decorator.
 *
 * argument decorator also can divided on instance method argument and class static method argument,
 *  like method decorator, there has tree argument:
 *
 *  there is class static method argument:
 *
 *  - target is class, different from instance decorator target, which is like this in class
 *  - property is use this decorator method name
 *  - descriptor is an PropertyDescriptor.
 *
 */

function argumentDecorator(
	target: any,
	propertyKey: string,
	parameterIndex: number
) {
	console.log('a', target) // [class Person]
	console.log('a', propertyKey) // getName
	console.log('a', parameterIndex) // 0
}

export class Person {
	@attributeDecorator
	name?: string
	constructor() {}

	static getName(@argumentDecorator name: string) {
		return 'hello world'
	}
}

export const jimmy = new Person()
