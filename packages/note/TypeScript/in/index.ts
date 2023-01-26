type person = {
	age: number
	weight: string
	height: string
}

/**
 * sometime we should batch change an type obj to change same type value.
 *  which we can use 'in' to process it
 */

/**
 * person's weight change weight and height to number type, we can do this as follow
 */

type TPerson = {
	[key in keyof person]: number
}

const jimmy: TPerson = {
	age: 25,
	weight: 140,
	height: 170,
}

/**
 * we also can use generic paradigm（泛型） to make it become currency（通用）
 */

type keyChangeToNumber<T, K> = {
	[key in keyof T]: K
}

const TNewPerson: keyChangeToNumber<person, number> = {
	age: 33,
	weight: 130,
	height: 170,
}
