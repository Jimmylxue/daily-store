import puppeteer from 'puppeteer'
;(async () => {
	// 启动chrome浏览器
	const browser = await puppeteer.launch()
	// 创建一个新页面
	const page = await browser.newPage()
	// 页面指向指定网址
	await page.goto('https://blog.jimmyxuexue.top')
	// 截图
	await page.screenshot({ path: 'jimmyxuexue.png' })
	// 关闭
	await browser.close()
})()
