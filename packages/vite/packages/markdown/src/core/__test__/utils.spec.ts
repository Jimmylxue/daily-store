import { getFilePath, parseCode } from '../utils'

describe('>>> getFilePath', () => {
	it('<snow-markdown source="./base.md"> should be ./base.md', () => {
		expect(getFilePath('<snow-markdown source="./base.md">')).toBe('./base.md')
	})

	it('<snow-markdown> should be undefined', () => {
		expect(getFilePath('<snow-markdown>')).toBeUndefined()
	})
})

describe('>>> parseCode', () => {
	it('<code>hello world</code> should be <code>{`hello world`}<code>', () => {
		expect(parseCode('<code>hello world</code>')).toBe(
			'<code>{`hello world`}</code>'
		)
	})
})
