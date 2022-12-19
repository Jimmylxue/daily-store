import { byteSize, isImage, isInvalidFile } from '../file'

describe('>>> isImage', () => {
	it('index.html is not image file', () => {
		expect(isImage('index.html')).toBeFalsy()
	})

	it('avatar.png is an image file', () => {
		expect(isImage('avatar.png')).toBeTruthy()
	})

	it('avatar.jpg is an image file', () => {
		expect(isImage('avatar.jpg')).toBeTruthy()
	})

	it('avatar.jpeg is an image file', () => {
		expect(isImage('avatar.jpeg')).toBeTruthy()
	})
})

describe('>>> isInvalidFile', () => {
	it('.DS_Store is an invalidFile', () => {
		expect(isInvalidFile('.DS_Store')).toBeTruthy()
	})

	it('index.html is an invalidFile', () => {
		expect(isInvalidFile('index.html')).toBeFalsy()
	})
})

describe('>>> byteSize', () => {
	it('10240 bite will return 10.0 KB', () => {
		expect(byteSize(10240)).toBe('10.0 KB')
	})
})
