import puppeteer from 'puppeteer'
;(async () => {
	const cookies = [
		{
			name: 'developer_type',
			value: '2',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 15,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'developer_id',
			value: '1097326',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 19,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'ABtestWhiteUser',
			value: '1',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 16,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'certification',
			value:
				'%E7%A6%8F%E5%BB%BA%E5%AE%A3%E6%83%B3%E5%B0%8F%E7%9B%92%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8',
			domain: '.mi.com',
			path: '/',
			expires: -1,
			size: 121,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'self_developer_type',
			value: '2',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 20,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'mideveloper_ph',
			value: 'NIt9fXYtVqo5k7V/5tYQbg==',
			domain: '.dev.mi.com',
			path: '/',
			expires: -1,
			size: 38,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'mideveloper_slh',
			value: 'E17eET86rJkDz1ePtVPZe9fVJ0A=',
			domain: '.dev.mi.com',
			path: '/',
			expires: -1,
			size: 43,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'openPlatform',
			value: '0',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 13,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'openGrayApp',
			value: '0',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 12,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'route',
			value: 'acb88a63456cbf3e3a64f7af5dce1ca6',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 37,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'userId',
			value: '171969262',
			domain: '.mi.com',
			path: '/',
			expires: -1,
			size: 15,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'self_developer_id',
			value: '1097326',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 24,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'uLocale',
			value: 'zh_CN',
			domain: '.mi.com',
			path: '/',
			expires: -1,
			size: 12,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'pageType',
			value: '1',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 9,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'JSESSIONID',
			value: 'aaa-vxZd0bJnfgzZ1L2Qy',
			domain: 'dev.mi.com',
			path: '/',
			expires: -1,
			size: 31,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'serviceToken',
			value:
				'Xv5lATucFWfMVEEue0csFP8eWcF8GD8sVI0tnI7Zh81AhRlQ2Q3ziOPlKO99gREOGcnG7anUXBupxEa/Czcko/8FIAG5DNX1Ie87qgTvsQVOPrUOzJhJ9oi3NOJ68R3QYhoEBvrbcO3btvuO/RiVwxpOX2hI5ZZVkNZsX1FyWspUznA1HLFHs2EZBbgJQdzUodyh5wyyV/6HJzvMwGaJgZk8iwh07uJZIoWD/pF+H2LCfRFkOS20cbatG5Di9UILpQVdH2rVqvhJPWC9nm5nMTPhDr67XmFi7nMvclg2prwvOH/r1OB3nGPQ4kRK1/+vd9y8K90NewdeyBVOjgeNe7bQ/z7RTRTIgdwZMbV618A=',
			domain: '.dev.mi.com',
			path: '/',
			expires: -1,
			size: 376,
			httpOnly: true,
			secure: true,
			session: true,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
	]

	// 启动chrome浏览器
	const browser = await puppeteer.launch({
		args: [
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
	})
	// 创建一个新页面
	const page = await browser.newPage()

	cookies.forEach(cookie => {
		page.setCookie(cookie)
	})

	await page.setViewport({
		width: 1920,
		height: 1080,
	})
	// 页面指向指定网址
	await page.goto(
		'https://dev.mi.com/distribute/app/2882303761520226434?namespaceValue=0&userId=171969262&packageName=com.tastien.app'
	)

	// 点击“更新版本”div
	await page.waitForFunction(() => {
		const elements = document.querySelectorAll('span')
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.includes('更新版本')) {
				return true
			}
		}
		return false
	})
	console.log('更新版本 按钮已出现')
	// 截图
	await page.screenshot({ path: 't1.png' })
	await page.evaluate(() => {
		const buttons = document.querySelectorAll('span')
		for (let button of buttons) {
			if (button.innerText.includes('更新版本')) {
				button.click()
				break
			}
		}
	})

	// const elements = await page.$x('//span[contains(text(), "更新版本")]')
	// console.log('elements', JSON.stringify(elements?.[0]))
	// await elements[0].click()

	await page.waitForFunction(() => {
		const elements = document.querySelectorAll('input')
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type === 'file' && elements[i].accept === '.apk') {
				return true
			}
		}
		return false
	})
	console.log('input框已出现')
	await page.screenshot({ path: 't2.png' })

	const apkInput = (
		await page.$x('//input[@type="file" and @accept=".apk"]')
	)[0]
	await apkInput.uploadFile('/Users/jimmy/Desktop/app/tastien.apk')
	// })

	setTimeout(async () => {
		await page.screenshot({ path: 't3.png' })
	}, 30000)

	// await page.waitForFunction(
	// 	() => {
	// 		const elements = document.querySelectorAll('span')
	// 		for (let i = 0; i < elements.length; i++) {
	// 			if (elements[i].textContent.includes('重新上传')) {
	// 				return true
	// 			}
	// 		}
	// 		return false
	// 	},
	// 	{ timeout: 1000 * 60 * 3 }
	// )

	console.log('已上传成功')

	await page.screenshot({ path: 't4.png' })

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('label')
		for (let button of buttons) {
			if (button.innerHTML.includes('审核通过后立即上线')) {
				console.log('aaa')
				button.click()
				break
			}
		}
	})

	await page.pdf({
		path: './pdf.pdf',
	})

	await browser.close()

	// setTimeout(async () => {
	// 	await page.screenshot({ path: 'ta.png' })
	// }, 2000)

	// console.log(' 文件上传按钮已出现 ')
	// await page.evaluate(async () => {
	// 	const buttons = document.querySelectorAll('span')
	// 	console.log('btns', buttons)
	// 	for (let button of buttons) {
	// 		if (button.innerText.includes('更新版本')) {
	// 			console.log('ddddd')
	// 			button.click()
	// 			break
	// 		}
	// 	}

	// 	// setTimeout(async () => {

	// 	// }, 1000)
	// })

	// const  const apkInput = (
	//   await page.$x('//input[@type="file" and @accept=".apk"]')
	// )[0]

	// setTimeout(async () => {
	// 	await page.screenshot({ path: 't2.png' })
	// 	// await page.evaluate(async () => {
	// 	// const apkInput = document.querySelector('input[type=file][accept=".apk"]')
	// 	await page.waitForSelector('input[type=file][accept=.apk]')
	// const apkInput = (
	// 	await page.$x('//input[@type="file" and @accept=".apk"]')
	// )[0]
	// 	console.log('apkInput', apkInput)
	// 	await apkInput.uploadFile('/Users/jimmy/Desktop/app/tastien.apk')
	// 	console.log('inputElement', apkInput)

	// 	// 等待上传完成
	// 	await page.waitForSelector('.apk_icon--4NK6b')
	// 	await page.screenshot({ path: 't3.png' })
	// 	// })

	// 	await browser.close()
	// }, 5000)

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
