import { memo, useEffect } from 'react'
import { TShowList } from '../core/types'

type TProps = {
	prizeLayoutList: TShowList
}

export default memo(({ prizeLayoutList }: TProps) => {
	return (
		<>
			{prizeLayoutList.map((item, index) => (
				<div key={index}>{item.name}</div>
			))}
		</>
	)
})
