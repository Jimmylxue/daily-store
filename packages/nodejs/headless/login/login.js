import puppeteer from 'puppeteer'
;(async () => {
	// 启动chrome浏览器
	const browser = await puppeteer.launch()
	// 创建一个新页面
	const page = await browser.newPage()
	// 页面指向指定网址
	await page.goto('https://tdl.jimmyxuexue.top/')

	// 截图
	await page.screenshot({ path: 'p1.png' })

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('span')
		for (let button of buttons) {
			console.log('aaaa')
			if (button.innerText.includes('不再提醒')) {
				button.click()
				break
			}
		}
	})

	setTimeout(async () => {
		await page.screenshot({ path: 'p2.png' })

		await page.type('#basic_phone', '19905076109')
		await page.type('#basic_password', '123456')
		await page.screenshot({ path: 'p3.png' })

		await page.evaluate(() => {
			const buttons = document.querySelectorAll('span')
			for (let button of buttons) {
				if (button.innerText.includes('登 录')) {
					button.click()
					break
				}
			}
		})

		setTimeout(async () => {
			await page.screenshot({ path: 'p4.png' })
			// 关闭
			await browser.close()
		}, 2000)
	}, 2000)
})()
