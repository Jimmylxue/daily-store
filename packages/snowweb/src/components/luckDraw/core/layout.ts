import { TOriginPrizeItem, TShowList } from './types'

export function getNineLatticeInfo(
	prizeList: TOriginPrizeItem[]
): TShowList | undefined {
	if (prizeList.length !== 8) {
		throw new Error('数据源错误-九宫格抽奖必须包含八个礼品')
	}
	const tempPrizeList = prizeList.map(prize => ({
		name: prize.name,
		itemType: 'prize',
	}))
	tempPrizeList.splice(4, 0, {
		name: '立即抽奖',
		itemType: 'button',
	})
	return tempPrizeList as TShowList
}
