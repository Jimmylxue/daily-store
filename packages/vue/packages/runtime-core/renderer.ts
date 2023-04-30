/**
 * 渲染器 跟 渲染 是两回事
 *
 *  渲染器的作用是：将将虚拟DOM渲染到特定平台上真是元素
 */

type VNode = {
	type: keyof HTMLElementDeprecatedTagNameMap
	children: string | VNode
}
type Container = {
	_vnode: VNode
} & HTMLElement

type RenderOption = {
	createElement: (type: keyof HTMLElementDeprecatedTagNameMap) => HTMLElement
	setElementText: (el: HTMLElement, text: string) => void
	insert: (el: HTMLElement, parent: HTMLElement, anchor: boolean) => void
}

export function createRenderer(option: RenderOption) {
	const { createElement, setElementText, insert } = option

	function render(vnode: VNode, container: Container) {
		/**
		 * render 的本质就是渲染：
		 *  当响应式数据发生变化时，就会再次调用render 可以简单理解是这么一个过程：
		 *
		 *    const count = ref(1)
		 *
		 *    effect(()=>{
		 *      renderer.render(`<h1>${count}</h1>`,document.getElementById('app'))
		 *    })
		 */
		if (vnode) {
			patch(container._vnode, vnode, container)
		} else {
			// vnode  不存在 执行卸载方法
			unmount()
		}
		container._vnode = vnode
	}

	function patch(n1: VNode, n2: VNode, container: Container) {
		if (!n1) {
			// 挂载过程
			mountElement(n2, container)
		}
	}

	function mountElement(vnode: VNode, container: Container) {
		const el = createElement(vnode.type)
		if (typeof vnode.children === 'string') {
			// 文本节点，设置内容即可
			setElementText(el, vnode.children)
		}
		insert(el, container)
	}

	function unmount() {}

	function hydrate() {}

	return {
		render,
		hydrate,
	}
}
