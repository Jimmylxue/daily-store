import puppeteer from 'puppeteer'
import { getFileContent } from '../core/file.js'
import { spawnSync } from 'child_process'

let fileCookie
let cookies
;(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: [
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
		devtools: false,
	})
	// 创建一个新页面
	let page = await browser.newPage()

	async function refreshCookie() {
		console.log('🚩 主进程 刷新了 cookie')
		fileCookie = await getFileContent('huawei')
		cookies = JSON.parse(fileCookie)
		cookies.forEach(cookie => {
			page.setCookie(cookie)
		})
	}

	await page.setViewport({
		width: 1920,
		height: 1080,
	})

	async function start() {
		try {
			await refreshCookie()
		} catch (error) {}
		// 页面指向指定网址
		await page.goto(
			'https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp'
		)

		try {
			// 点击“更新版本”div
			await page.waitForSelector('iframe', { timeout: 1000 * 60 })
			console.log('🌱 iframe 已出现 🌱')
		} catch (error) {
			await page.waitForTimeout(800)
			console.log('💥 指定内容未出现 cookie 需重新刷新 💥')
			spawnSync('node', ['login.js'], { stdio: 'inherit' })
			await start()
		}
	}

	await start()

	await page.waitForFunction(() => {
		const iframe = document.querySelector('iframe')
		const iframeDoc = iframe.contentWindow.document
		const elements = iframeDoc.querySelectorAll('.el-link--inner')
		for (let element of elements) {
			if (element.textContent.includes('更新')) {
				element.click()
				return true
			}
		}
	})
	console.log('🚩 已点击更新按钮 🚩')

	// 点击 软件包管理
	await page.waitForFunction(() => {
		const iframe = document.querySelector('iframe')
		const iframeDoc = iframe.contentWindow.document
		const elements = iframeDoc.querySelectorAll('.app-version-btn-manage')
		for (let element of elements) {
			if (element.textContent.includes('软件包管理')) {
				element.click()
				return true
			}
		}
	})

	console.log('🚩 已点击软件包管理 🚩')

	// 点击上传
	await page.waitForFunction(() => {
		const iframe = document.querySelector('iframe')
		const iframeDoc = iframe.contentWindow.document
		const elements = iframeDoc.querySelectorAll('.el-button--primary')
		for (let element of elements) {
			if (element.textContent.includes('上传')) {
				element.click()
				return true
			}
		}
	})

	console.log('🚩 已点击上传 🚩')

	// 找到文件 并执行上传文件操作
	const frame = await page
		.frames()
		.find(frame => frame.name() === 'mainIframeView')
	const apkInput = await frame.$('input[type="file"]')
	await apkInput.uploadFile('/Users/jimmy/Desktop/app/xuanxiang.apk')

	console.log('🚩 文件已上传 🚩')

	// 监听上传结束 弹窗关闭了
	await page.waitForFunction(
		() => {
			const iframe = document.querySelector('iframe')
			const iframeDoc = iframe.contentWindow.document
			const elements = iframeDoc.querySelectorAll('.el-button--primary')
			let isOpen = false
			for (let element of elements) {
				if (element.textContent.includes('选取')) {
					isOpen = true
				}
			}
			if (!isOpen) {
				return true
			}
		},
		{ timeout: 1000 * 60 }
	)

	console.log('🌱 弹窗已自动关闭 🌱')

	// 点击提交审核
	await page.waitForFunction(
		() => {
			const iframe = document.querySelector('iframe')
			const iframeDoc = iframe.contentWindow.document
			const elements = iframeDoc.querySelectorAll('.el-button--primary')
			for (let element of elements) {
				if (element.textContent.includes('提交审核')) {
					element.click()
					return true
				}
			}
		},
		{ timeout: 1000 * 60 }
	)

	console.log('🚩 已点击 提交审核 🚩')

	await page.waitForFunction(
		() => {
			const iframe = document.querySelector('iframe')
			const iframeDoc = iframe.contentWindow.document
			const elements = iframeDoc.querySelectorAll('#dialogSubmitConfirmBtn')
			for (let element of elements) {
				element.click()
				return true
			}
		},
		{ timeout: 1000 * 60 }
	)

	console.log('🚩 确定按钮已点击 🚩')

	try {
		await page.waitForFunction(
			() => {
				const iframe = document.querySelector('iframe')
				const iframeDoc = iframe.contentWindow.document
				const elements = iframeDoc.querySelectorAll('.agc-alert__content')
				for (let element of elements) {
					if (
						element.textContent.includes(
							'您的应用已提交审核，预计审核需要3~5个工作日，请耐心等待，谢谢。点击返回提交详情'
						)
					) {
						return true
					}
				}
			},
			{ timeout: 1000 * 60 }
		)

		console.log('🎉 应用已发布成功')
	} catch (error) {
		console.log('💥 发布失败')
	}

	await browser.close()
})()
