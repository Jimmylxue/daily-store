import puppeteer from 'puppeteer'
import { getFileContent } from '../core/file.js'

let fileCookie
let cookies
;(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: [
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
		devtools: true,
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
			await page.waitForSelector('iframe', { timeout: 10000 })
			console.log('出现更新了')
		} catch (error) {
			console.log('没有找到')
			// await page.waitForTimeout(800)
			// console.log('💥 指定内容未出现 cookie 需重新刷新')
			// spawnSync('node', ['login.js'], { stdio: 'inherit' })
			// await start()
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

	await page.waitForFunction(() => {
		const iframe = document.querySelector('input')
		const iframeDoc = iframe.contentWindow.document
		const elements = iframeDoc.querySelectorAll('.el-button--primary')
		for (let element of elements) {
			if (element.textContent.includes('上传')) {
				element.click()
				return true
			}
		}
	})

	// Get all frames on the page
	const frames = await page.frames()

	let element
	for (const frame of frames) {
		element = await frame.$x('//input[@type="file" and @accept=".aab,.apk"]')
		if (element) {
			break
		}
	}

	console.log(element, element.uploadFile)

	// const apkInput = (
	// 	await page.$x('//input[@type="file" and @accept=".aab,.apk"]')
	// )[0]

	// await apkInput.uploadFile('/Users/jimmy/Desktop/app/tastien.apk')
	// await page.waitForFunction(()=>{
	// 	const iframe = document.querySelector('iframe')
	// 	const iframeDoc = iframe.contentWindow.document
	// })

	console.log('结束')
})()
