import { TOriginPrizeItem, TShowList } from './types'

type TPrizeList = {
	name: string
}[]

export function getNineLatticeInfo(
	prizeList: TOriginPrizeItem[]
): TShowList | undefined {
	if (prizeList.length !== 8) {
		// console.error('数据源错误')
		throw new Error('数据源错误')
	}
	const tempPrizeList = prizeList.map(prize => ({
		name: prize.name,
		itemType: 'prize',
	}))
	const res = tempPrizeList.splice(4, 0, {
		name: '立即抽奖',
		itemType: 'button',
	})
	return tempPrizeList as TShowList
}
