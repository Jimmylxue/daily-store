import { deepClone } from './deepClone'

describe('>>> deepClone', () => {
	it('number type should return same value', () => {
		expect(deepClone(1)).toBe(1)
	})

	it('string type should return same value', () => {
		expect(deepClone('jimmy')).toBe('jimmy')
	})

	it('boolean type should return same value', () => {
		expect(deepClone(true)).toBeTruthy()
	})

	it('base array should return deep clone array', () => {
		const arr = [1, '2', true]
		expect(deepClone(arr) === arr).toBeFalsy()
		expect(deepClone(arr)).toEqual(arr)
	})

	it('base deep struct array should return deep clone array', () => {
		const arr = [1, '2', true, [1, '2', false]]
		expect(deepClone(arr) === arr).toBeFalsy()
		expect(deepClone(arr)).toEqual(arr)
	})

	it('base object should return deep clone object', () => {
		const object = {
			name: 'jimmy',
			love: 'xue',
		}
		expect(deepClone(object) === object).toBeFalsy()
		expect(deepClone(object)).toEqual(object)
	})

	it('base deep struct object should return deep clone object', () => {
		const object = {
			name: 'jimmy',
			love: 'xue',
			other: {
				age: 22,
			},
		}
		expect(deepClone(object) === object).toBeFalsy()
		expect(deepClone(object)).toEqual(object)
	})

	// it('deepClone', () => {
	// 	const a: {
	// 		key: string
	// 		current: any
	// 	} = { key: 'jimmy', current: undefined }
	// 	a.current = a

	// 	expect(deepClone(a)).toEqual(a)
	// })
})
