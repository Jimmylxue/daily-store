import { autoRun, reactive } from './reactive'

describe('>>> reactive test', () => {
	it('test autoRun is useful', () => {
		let a = 5
		const testObj = reactive({
			name: 'jimmy',
			age: 2,
		})
		expect(testObj.age).toBe(2)
		expect(a).toBe(5)

		autoRun(() => {
			a = testObj.age + 3
		})

		testObj.age = 22
		expect(a).toBe(25)
	})
})

export {}
