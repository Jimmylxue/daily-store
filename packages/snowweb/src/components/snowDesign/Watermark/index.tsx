import { FC, HTMLAttributes, useMemo } from 'react'
import './index.css'

interface TProps extends HTMLAttributes<HTMLImageElement> {
	src: string
}

export const WaterMark: FC<TProps> = props => {
	const { children, src } = props
	const style = useMemo(() => {
		return {
			background: `url(${src}) center center repeat`,
		}
	}, [src])
	return (
		<div className=" relative">
			{children}
			<div
				className="water-mark absolute left-0 top-0 w-full h-full"
				style={style}
			></div>
		</div>
	)
}
