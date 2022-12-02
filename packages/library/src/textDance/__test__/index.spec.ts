import {
	createElement,
	getTextArrayContent,
	renderColorValue,
	textDance,
} from '..'

describe('>>> getTextArrayContent', () => {
	let container: HTMLDivElement
	beforeEach(() => {
		container = document.createElement('div')
		container.textContent = 'hello world'
	})
	it('getTextArrayContent function with container will return hello world array', () => {
		expect(getTextArrayContent(container)).toEqual('hello world'.split(''))
	})

	it('test none content element should return undefined', () => {
		const empty = document.createElement('div')
		expect(getTextArrayContent(empty)).toBeUndefined()
	})
})

describe('>>> renderColorValue', () => {
	const arr = [5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
	it('render Color will be include with arr', () => {
		expect(arr.includes(renderColorValue())).toBeTruthy()
	})
})

describe('>>> createElement', () => {
	it('element should has class of snow-text', () => {
		expect(createElement('hello').classList.contains('snow-text'))
	})

	it('element should has jimmy content', () => {
		expect(createElement('jimmy').textContent).toBe('jimmy')
	})
})

// finally use test
describe('>>> textDance', () => {
	const element = document.createElement('div')
	element.textContent = 'jimmyxuexue'
	beforeEach(() => {
		textDance(element)
	})
	it('element should has 11 children', () => {
		expect(element.children.length).toBe(11)
	})

	it('element children has class of snow-text', () => {
		expect(
			[...element.children].every(ele => ele.classList.contains('snow-text'))
		).toBe(true)
	})
})
