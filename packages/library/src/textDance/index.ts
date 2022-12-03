import './index.less'

export function getTextArrayContent(app: HTMLElement): string[] | undefined {
	if (!app.textContent) {
		console.warn('请给文件设置内容')
		return
	}
	return [...app.textContent!]
}

export function renderColorValue() {
	const arr = [5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
	return arr[Math.floor(Math.random() * arr.length)]
}

export function renderColor() {
	return (
		`#` +
		Array(6)
			.fill(null)
			.map(_ => renderColorValue())
			.join('')
	)
}

export function createElement(text: string) {
	const element = document.createElement('div')
	element.classList.add('snow-text')
	element.style.color = renderColor()
	element.textContent = text
	return element
}

export function reRenderInApp(app: HTMLElement, texts: string[]) {
	const fragment = document.createDocumentFragment()
	texts.forEach(text => {
		const element = createElement(text)
		fragment.append(element)
	})
	app.appendChild(fragment)
}

export function textDance(app: HTMLElement) {
	const text = getTextArrayContent(app)
	app.textContent = ''
	if (text) {
		reRenderInApp(app, text)
	}
}
