import puppeteer from 'puppeteer'
;(async () => {
	// 启动chrome浏览器
	const browser = await puppeteer.launch()
	// 创建一个新页面
	const page = await browser.newPage()

	await page.setViewport({
		width: 1920,
		height: 1080,
	})
	// 页面指向指定网址
	await page.goto(
		'https://account.xiaomi.com/fe/service/login/password?_locale=zh_CN'
	)

	// 截图
	await page.screenshot({ path: 'p1.png' })

	await page.focus('input[name="account"]')
	await page.keyboard.type('18305934623')
	await page.focus('input[name="password"]')
	await page.keyboard.type('Zouxh123')
	// await page.keyboard.type('jimmyxuexue')
	// await page.keyboard.type('123456')

	await page.click('input[type="checkbox"]')
	await page.screenshot({ path: 'p3.png' })
	await page.click('button[type="submit"]')

	setTimeout(async () => {
		await page.screenshot({ path: 'p4.png' })
		await page.goto('https://dev.mi.com/platform/console')
		await page.screenshot({ path: 'p5.png' })
		const cookies = await page.cookies()
		console.log('cookies', cookies)

		// 获取所有存储在localStorage中的数据
		const localStorageData = await page.evaluate(() => {
			let items = {}
			for (let i = 0; i < localStorage.length; i++) {
				items[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
			}
			return items
		})
		console.log('localStorage', localStorageData)

		// 获取所有存储在sessionStorage中的数据
		const sessionStorageData = await page.evaluate(() => {
			let items = {}
			for (let i = 0; i < sessionStorage.length; i++) {
				items[sessionStorage.key(i)] = sessionStorage.getItem(
					sessionStorage.key(i)
				)
			}
			return items
		})
		console.log('session', sessionStorageData)
		await browser.close()
	}, 2000)

	// await page.evaluate(() => {
	// 	const buttons = document.querySelectorAll('span')
	// 	for (let button of buttons) {
	// 		if (button.innerText.includes('登 录')) {
	// 			button.click()
	// 			break
	// 		}
	// 	}
	// })

	// setTimeout(async () => {
	// 	await page.screenshot({ path: 'p4.png' })
	// 	// 关闭
	// 	await browser.close()
	// }, 2000)
})()
