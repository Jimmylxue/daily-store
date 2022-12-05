import { memo } from 'react'
import useDrawLayout from './core/useDrawLayout'

type TProps = {
	prizeList: {
		name: string
	}[]
}

export default memo(({ prizeList }: TProps) => {
	const { node } = useDrawLayout({
		prizeList,
		chartType: 'NINE_LATTICE',
	})

	return <div>{node}</div>
})
