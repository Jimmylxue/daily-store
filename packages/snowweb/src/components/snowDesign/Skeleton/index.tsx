import { FC, HTMLAttributes } from 'react'
import './style.css'

interface TProps extends HTMLAttributes<HTMLDataElement> {}

export const Skeleton: FC<TProps> = props => {
	const { children } = props
	return (
		<div className="skeleton-container">
			{children}
			<div className="skeleton-mask"></div>
		</div>
	)
}
