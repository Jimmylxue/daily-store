import { isAcceptFile, isInvalidFile } from '../src/utils'

describe('>>> isInvalidFile', () => {
	it('test .DS_Store should be true', () => {
		expect(isInvalidFile('.DS_Store')).toBeTruthy()
	})

	it('test .mp4 should be true', () => {
		expect(isInvalidFile('.mp4')).toBeTruthy()
	})
})

describe('>>> isAcceptFile', () => {
	const accept = ['.jpg', '.png']
	it('test .jpeg but not allow .jpeg', () => {
		expect(isAcceptFile('.jpeg', accept)).toBeFalsy()
	})

	it('test header.jpg but not allow .jpg', () => {
		expect(isAcceptFile('header.jpg', accept)).toBeTruthy()
	})
})
