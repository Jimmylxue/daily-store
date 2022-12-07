import { useMemo } from 'react'
import NineLattice from '../component/NineLattice'
import { getNineLatticeInfo } from './layout'
import { TOriginPrizeItem } from './types'

type TDrawLayoutConfig = {
	prizeList: TOriginPrizeItem[]
	chartType: 'NINE_LATTICE'
}

export default function useDrawLayout({
	prizeList,
	chartType,
}: TDrawLayoutConfig) {
	const prizeLayoutList = useMemo(() => {
		switch (chartType) {
			case 'NINE_LATTICE':
				return getNineLatticeInfo(prizeList)!
		}
	}, [chartType, prizeList])

	const node = useMemo(() => {
		return chartType === 'NINE_LATTICE' ? (
			<NineLattice prizeLayoutList={prizeLayoutList} />
		) : (
			<></>
		)
	}, [chartType, prizeList])

	return { node }
}
