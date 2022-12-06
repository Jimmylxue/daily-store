import { getNineLatticeInfo } from '../layout'

describe('>>> getNineLatticeInfo', () => {
	it('test number of prize is not equal 8 will throw error', () => {
		const mockList = [
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
		]
		expect(() => getNineLatticeInfo(mockList)).toThrow(
			'数据源错误-九宫格抽奖必须包含八个礼品'
		)
	})

	it('test eight prize will be return nine item', () => {
		const mockList = [
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
			{
				name: 'iphone14 pro max',
			},
		]
		expect(getNineLatticeInfo(mockList)?.length).toBe(9)
		expect(getNineLatticeInfo(mockList)?.[4].itemType === 'button').toBeTruthy()
	})
})
