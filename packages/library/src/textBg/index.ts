type Config = {
	imgSrc: string
	strokeColor: string
	strokeSize: number
}

export function textBg(config: Config, element: HTMLElement) {
	const { imgSrc, strokeColor, strokeSize } = config
	element.style.background = `url(${imgSrc}) no-repeat center/cover`
	// @ts-ignore
	element.style.textStroke = `${strokeSize}px ${strokeColor}`
	// @ts-ignore
	element.style['-webkit-text-stroke'] = `${strokeSize}px ${strokeColor}`
	element.style.backgroundClip = 'text'
	// @ts-ignore
	element.style['-webkit-background-clip'] = 'text'
	element.style.color = 'transparent'
}
