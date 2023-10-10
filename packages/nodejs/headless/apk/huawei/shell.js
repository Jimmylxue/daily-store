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
			await page.waitForFunction(
				() => {
					const elements = document.querySelectorAll('.el-link--inner')
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].textContent.includes('更新')) {
							return true
						}
					}
					return false
				},
				{ timeout: 8000 }
			)
		} catch (error) {
			await page.waitForTimeout(800)
			console.log('💥 指定内容未出现 cookie 需重新刷新')
			spawnSync('node', ['login.js'], { stdio: 'inherit' })
			await start()
		}
	}

	await start()
})()
