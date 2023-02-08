function initSnowToast() {
	class SnowToast extends HTMLElement {
		constructor(props) {
			super()
			this.initTemplate()
			this.init()
		}

		initTemplate() {
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
			const template = document?.getElementById('snow-toast-template').content
			this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
		}
	}

	customElements.define('snow-toast', SnowToast)
}

initSnowToast()
