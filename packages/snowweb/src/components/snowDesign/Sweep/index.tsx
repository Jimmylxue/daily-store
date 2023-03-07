import { CSSProperties, FC, HTMLAttributes, useMemo } from 'react'
import './style.css'

interface TProps extends HTMLAttributes<HTMLDivElement> {
	lightWidth?: CSSProperties['width']
	lightBg?: string
	lightDegree?: string
	duration?: string
}

export const Sweep: FC<TProps> = props => {
	const {
		children,
		lightWidth = 80,
		lightDegree = '22.5deg',
		lightBg = 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .24) 50.04%, rgba(255, 255, 255, 0) 99.37%)',
		duration = '2s',
	} = props

	const sweepLightStyle = useMemo(() => {
		return {
			width: lightWidth,
			background: lightBg,
			transform: `rotate(${lightDegree}) scaleY(2)`,
		}
	}, [lightBg, lightWidth, lightDegree])

	return (
		<div className="container">
			{children}
			<div className="mask">
				<div className="sweepLight" style={sweepLightStyle}></div>
			</div>
		</div>
	)
}
