/**
 * 一个相当常见的场景： 输入框的联想搜索
 *  每次输入框内容变化，都会触发网络请求获取最近的联想结果。 如果后触发的请求先返回了，那这时候就会有显示问题。
 *
 *    解决这个方法防抖和节流都无法解决。 正确的思路是请求取消。
 *    后面的触发的网络请求后，取消前一个网络请求的获取 这点可以使用 AbortController 这个类来实现。
 */

const input = document.querySelector('.myInput')

const controller = new AbortController() // 创建一个 中止控制器

input.oninput = async () => {
	controller.abort() // 每次input事件都终止掉上次的请求

	const list = await fetch(
		'http://127.0.0.1:9999/task/search?key' + input.value,
		{
			signal: controller.signal, // signal 是接收一个信号，一但信号接收到值 就会取消掉这个请求
		}
	).then(res => res.json())

	createPageList(list)
}

function createPageList(list) {
	// 将list 渲染至页面上
}
