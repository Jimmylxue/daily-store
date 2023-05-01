/**
 * 这部分是浏览器平台的一些能力。
 *  因为 vue 要实现跨平台，所以除了核心逻辑不变之外，一些更新渲染的API需要实现一层抽象。到时候其他平台逻辑带入
 */

function createElement(type: keyof HTMLElementDeprecatedTagNameMap) {
	console.log('create element', type)
	const element = document.createElement(type)
	return element
}

function setElementText(el: HTMLElement, text: string) {
	console.log('setElementText', el, text)
	el.textContent = text
}

function insert(el: HTMLElement, parent: HTMLElement, anchor = null) {
	// 给 parent 下添加指定的元素
	console.log('insert')
	parent.insertBefore(el, anchor)
}

function shouldSetAsProps(el: HTMLElement, key: string, value: any) {
	console.log(value)
	// 特殊处理
	if (key === 'form' && el.tagName === 'INPUT') return false

	return key in el
}

function patchProps(
	el: HTMLElement,
	key: string,
	preValue: any, // 前一次的 props
	nextValue: any // 重新render后的 props
) {
	/**
	 * HTML Attribute 和 DOM Property 是不一样的
	 * 	HTML Attribute 中的 class 在 DOM 中是 className
	 *
	 * 	<Input value="foo" /> 中 如果获取 el 就是 input 这个DOM对象
	 * 		当input 输入了 jimmy 之后：
	 * 		el.value : jimmy
	 * 		el.getAttribute('value') : foo
	 */
	if (shouldSetAsProps(el, key, nextValue)) {
		// @ts-ignore
		const type = typeof el[key]
		if (type === 'boolean' && nextValue === '') {
			/**
			 * const button = {
			 * 	type: 'button',
			 * 	props: {
			 * 		disable: '' // 这样就算设置了 disable 属性
			 * 	}
			 * }
			 */
			// @ts-ignore
			el[key] = true
		} else {
			// @ts-ignore
			el[key] = nextValue
		}
	} else {
		el.setAttribute(key, nextValue)
	}
}

export { createElement, setElementText, insert, patchProps }
