import { FC, useEffect, useState } from 'react'
import { Skeleton } from '../../components/snowDesign'

export const SnowDesign: FC = () => {
	const [skeletonVisible, setSkeletonVisible] = useState<boolean>(true)

	useEffect(() => {
		setTimeout(() => {
			setSkeletonVisible(false)
		}, 3000)
	}, [])

	return (
		<div>
			<Skeleton visible={skeletonVisible} loadingText={<div>加载中~~</div>}>
				<h2>Skeleton</h2>
			</Skeleton>
		</div>
	)
}
