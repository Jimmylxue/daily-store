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

export { createElement, setElementText, insert }
