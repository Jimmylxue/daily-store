import { memo } from 'react'
import { TLuckDrawInterface } from './core/types'
import useDrawLayout from './core/useDrawLayout'

type TProps = {
	prizeList: {
		name: string
	}[]
}

export default memo<TLuckDrawInterface>(({ prizeList, drawType }) => {
	const { node } = useDrawLayout({
		prizeList,
		chartType: drawType,
	})

	return <div>{node}</div>
})
