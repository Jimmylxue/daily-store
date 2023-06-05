/**
 * 渲染器 跟 渲染 是两回事
 *
 *  渲染器的作用是：将将虚拟DOM渲染到特定平台上真是元素
 */

export type VHTMLElement = {
	_vei: {
		[key in string]: any
	}
} & HTMLElement

type VNode = {
	el: VHTMLElement
	type: keyof HTMLElementDeprecatedTagNameMap
	children: string | VNode[]
	props?: {
		[key in string]: any
	}
}
type Container = {
	_vnode: VNode
} & VHTMLElement

type RenderOption = {
	createElement: (type: keyof HTMLElementDeprecatedTagNameMap) => VHTMLElement
	setElementText: (el: HTMLElement, text: string) => void
	insert: (el: HTMLElement, parent: HTMLElement, anchor?: boolean) => void
	patchProps: (
		el: HTMLElement,
		key: string,
		preValue: any,
		nextValue: any
	) => void
}

export function createRenderer(option: RenderOption) {
	const { createElement, setElementText, insert, patchProps } = option

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
			unmount(container._vnode)
		}
		container._vnode = vnode
	}

	function patch(n1: VNode | null, n2: VNode, container: Container) {
		if (n1 && n1.type !== n2.type) {
			// 新、旧 的node 根本就是不同的节点，如 p => input, 不存在打补丁，直接卸载重新更新即可
			unmount(n1)
			n1 = null
		}

		const { type } = n2

		if (typeof type === 'string') {
			if (!n1) {
				// 挂载过程
				mountElement(n2, container)
			} else {
				// 更新过程
			}
		} else if (typeof type === 'object') {
			// 如果 n2 的type 是对象类型，则说明 n2 其实是个组件
		} else if (type === 'xxx') {
			// 处理其他类型的 vnode
		}
	}

	function mountElement(vnode: VNode, container: Container) {
		// vnode.el 引用 真实的 DOM 元素
		const el = (vnode.el = createElement(vnode.type))
		if (typeof vnode.children === 'string') {
			// 文本节点，设置内容即可
			setElementText(el, vnode.children)
		} else if (Array.isArray(vnode.children)) {
			// children 是个数组 说明是vnode数组 则遍历调用patch
			vnode.children.forEach(node => {
				patch(null, node, el as Container)
			})
		}

		if (vnode.props) {
			const vnodeProps = vnode.props
			for (const key in vnodeProps) {
				if (Object.prototype.hasOwnProperty.call(vnodeProps, key)) {
					const value = vnodeProps[key]
					patchProps(el, key, null, value)
				}
			}
		}

		insert(el, container)
	}

	function unmount(node: VNode) {
		// 先简单这样写一下吧~
		const el = node.el
		const parent = el.parentNode
		if (parent) {
			parent.removeChild(el)
		}
		/**
		 * todo:
		 * 	事件卸载
		 * 	声明周期
		 */
	}

	function patchElement(n1: VNode, n2: VNode) {
		// 核心 更新元素的逻辑 -> 需要多看几遍
		const el = (n2.el = n1.el)
		const oldProps = n1.props
		const newProps = n2.props

		for (const key in newProps) {
			if (newProps[key] !== oldProps?.[key]) {
				// 新props 的 值 与 旧 props 值不相同
				patchProps(el, key, oldProps?.[key], newProps[key])
			}
		}

		for (const key in oldProps) {
			if (!(key in newProps!)) {
				// 新node 去掉了 某些 props
				patchProps(el, key, oldProps[key], null)
			}
		}

		patchChildren(n1, n2, el)
	}

	function patchChildren(n1: VNode, n2: VNode, container: VHTMLElement) {
		// n1 旧节点 n2 新节点
		// 判断新的子节点类型是否是文本节点
		if (typeof n2.children === 'string') {
			// 旧节点有三种可能性，分别是： 没有子节点、文本子节点、一组子节点。 需要分别处理
			if (Array.isArray(n1.children)) {
				// 一组子节点 分别执行卸载即可
				n1.children.forEach(n => unmount(n))
			}
			// 其他情况 文本子节点、没有子节点  这两种情况直接设置最新的文本接口
			setElementText(container, n2.children)
		} else if (Array.isArray(n2.children)) {
			// 新的子节点为一组子节点
			if (Array.isArray(n1.children)) {
				// 旧节点也是一组子节点
				// 代码运行到这里就涉及了最最核心的部分 diff 算法了

				// 性能差的解决方案：将旧的一个个卸载再重新挂在
				n1.children.forEach(n => unmount(n))
				// @ts-ignore
				n2.children.forEach(n => patch(null, n, container))
			} else {
				// 要么是文本节点、要么没有子节点
				setElementText(container, '') // 先清空一下
				// @ts-ignore
				n2.children.forEach(n => patch(null, n, container))
			}
		} else {
			// 新节点不存在 需要将旧节点逐一卸载
			if (Array.isArray(n1.children)) {
				n1.children.forEach(n => unmount(n))
			} else if (typeof n1.children === 'string') {
				// 旧节点是文本节点 清空
				setElementText(container, '')
			}
			// 如果旧节点也是空节点 则什么都不用做
		}
	}

	function hydrate() {}

	return {
		render,
		hydrate,
	}
}
