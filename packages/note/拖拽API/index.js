const container = document.querySelector('.container')

let dragNode = null
console.log(container)

function clearStyle() {
	;[...document.querySelectorAll('.btbg')].forEach(ele => {
		ele.classList.remove('drag-hover')
	})
	document.querySelector('.classBox').classList.remove('drag-hover')
}

// 拖拽开始事件
container.addEventListener('dragstart', e => {
	dragNode = e.target
	e.dataTransfer.effectAllowed = e.target.dataset.effect // 根据自定义属性来判断
})

container.addEventListener('dragover', e => {
	/**
	 * 阻止拖拽的默认事件：
	 *  默认情况下，浏览器限制拖拽的结束的位置不能在 表格 类型的元素上面的 也就是 table tr td 标签之类的
	 *    可以通过 preventDefault() 来阻止这一默认行为
	 */
	e.preventDefault()
})

// 拖拽 进入某个元素事件
container.addEventListener('dragenter', e => {
	console.log(e.target)
	clearStyle()
	if (
		e.target.classList.contains('classBox') &&
		dragNode.dataset.effect === 'move'
	) {
		e.target.classList.add('drag-hover')
	}
	if (e.target.dataset.drop) {
		e.target.classList.add('drag-hover')
	}
})

// 拖拽 脱手事件
container.addEventListener('drop', e => {
	console.log(e.target)
	clearStyle()
	if (
		e.target.classList.contains('classBox') &&
		dragNode.dataset.effect === 'move'
	) {
		dragNode.innerHTML = ''
		return
	}

	if (!e.target.dataset.drop || dragNode.dataset.effect === 'move') {
		return
	}
	const copyNode = dragNode.cloneNode()
	console.log({ dragNode, copyNode })
	copyNode.innerHTML = dragNode.innerHTML
	copyNode.dataset.effect = 'move'
	copyNode.draggable = true
	e.target.dataset.drop = true
	e.target.appendChild(copyNode)
})

// container.addEventListener('')
