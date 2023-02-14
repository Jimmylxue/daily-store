/**
 * Shadow DOM
 * 	Shadow DOM可以理解是一个完全隔离的作用域，它内部的 CSS JS 都不会与全局的发生影响，
 */

export function initSnowToast() {
	class SnowToast extends HTMLElement {
		constructor() {
			super()
			this.initTemplate()
			this.init()
		}

		initTemplate() {
			/**
			 * template 标签的作用：
			 * 	- 自身以及内部的额匀速不会被渲染，视觉上是不可见的，使用浏览器的调试工具会返现有个 display: none，内部元素被 DocumentFragment 包裹
			 * 	- template 内所有元素在被激活之前不会被解析、图片不会被加载，audio、video都不会被播放，JS脚本也不会执行
			 * 		- 可以使用 importNode 或者 cloneNode 进行激活模板
			 * 	- template内部的所有元素都不存在于文档空间中，是无法通过JS的一些选择器方法来捕获到它们的。
			 */
			const temp = document.createElement('template')
			temp.id = 'snow-toast-template'
			temp.innerHTML = `<style>
				.snow-toast {
					display: flex;
					width: fit-content;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.5);
					padding: 5px 10px;
					border-radius: 10px;
				}
			</style>
			<div class="snow-toast">
				<span>hello world</span>
			</div>`
			document.body.appendChild(temp)
		}

		init() {
			// @ts-ignore
			const template = document?.getElementById('snow-toast-template')?.content
			/**
			 * 当采用 mode: 'open' 之后，可以返回一个 ShadowRoot 对象，这是 DocumentFragment ，可以使用大多数的DOM的API，如 innerHTML
			 */
			this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
		}
	}

	customElements.define('snow-toast', SnowToast)
}
