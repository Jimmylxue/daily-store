import { useEffect, useState } from 'react'
import NineLattice from '../component/NineLattice'
import { getNineLatticeInfo } from './layout'
import { TOriginPrizeItem, TShowList } from './types'

type TDrawLayoutConfig = {
	prizeList: TOriginPrizeItem[]
	chartType: 'NINE_LATTICE'
}

export default function useDrawLayout({
	prizeList,
	chartType,
}: TDrawLayoutConfig) {
	const [prizeLayoutList, setPrizeLayoutList] = useState<TShowList>([])
	useEffect(() => {
		switch (chartType) {
			case 'NINE_LATTICE':
				setPrizeLayoutList(getNineLatticeInfo(prizeList)!)
		}
	}, [chartType, prizeList])

	const node =
		chartType === 'NINE_LATTICE' ? (
			<NineLattice prizeLayoutList={prizeLayoutList} />
		) : (
			<></>
		)

	return { node }
}
