import puppeteer from 'puppeteer'
import { writeFileContent } from '../core/file.js'
export async function loginXiaoMi() {
	// 启动chrome浏览器
	const browser = await puppeteer.launch({
		headless: false,
	})
	// 创建一个新页面
	const page = await browser.newPage()

	await page.setViewport({
		width: 1920,
		height: 1080,
	})
	// 页面指向指定网址
	await page.goto('https://dev.mi.com/platform/console')

	// 点击“更新版本”div
	await page.waitForFunction(() => {
		const elements = document.querySelector('.mi-input__input')
		return !!elements
	})

	// 截图
	await page.screenshot({ path: 'login/1.png' })

	await page.focus('input[name="account"]')
	await page.keyboard.type('18305934623')
	await page.focus('input[name="password"]')
	await page.keyboard.type('Zouxh123')

	await page.click('input[type="checkbox"]')
	await page.screenshot({ path: 'login/2.png' })
	await page.click('button[type="submit"]')

	// 点击“更新版本”div
	await page.waitForFunction(() => {
		const elements = document.querySelector(
			'.console_section-list-card-subtitle__rT3vU'
		)
		return !!elements
	})
	console.log('🚩 已进入登录管理平台的页面')
	await page.screenshot({ path: 'login/3.png' })
	const cookies = await page.cookies()
	console.log('cookie.length', cookies.length)
	try {
		const res = await writeFileContent('xiaomi', JSON.stringify(cookies))
		if (res) {
			console.log('🎉 cookie 已重新获取 并写入成功 🎉')
		}
	} catch (error) {
		console.log('💥 cookie 写入失败，请检查登录环节 💥')
	}
	await browser.close()
	// }, 4000)
}

loginXiaoMi()
