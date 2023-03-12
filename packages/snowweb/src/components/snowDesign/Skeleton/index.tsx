import { CSSProperties, FC, HTMLAttributes, ReactNode, useMemo } from 'react'
import './style.css'

interface TProps extends HTMLAttributes<HTMLDataElement> {
	minHeight?: CSSProperties['height']
	loadingText?: string | ReactNode
	visible: boolean
}

export const Skeleton: FC<TProps> = props => {
	const { children, minHeight, visible, loadingText } = props

	const skeletonHeight = useMemo(() => {
		return {
			height: minHeight || 'fit-content',
		}
	}, [minHeight])
	return (
		<div className="skeleton-container" style={skeletonHeight}>
			{children}
			{visible && <div className="skeleton-mask">{loadingText}</div>}
		</div>
	)
}
