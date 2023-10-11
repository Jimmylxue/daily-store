import puppeteer from 'puppeteer'
import { writeFileContent } from '../core/file.js'
import ReadLine from 'readline-promises'

const Read = new ReadLine()

export async function loginHuaWei() {
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
	await page.goto('https://id1.cloud.huawei.com/CAS/portal/loginAuth.html')

	await page.waitForFunction(() => {
		const elements = document.querySelector('.userAccount')
		return !!elements
	})
	// 截图
	await page.type('.userAccount', '19905076109')
	await page.type('.hwid-input-pwd', 'yshzx171107.')
	// await page.type('.userAccount', 'zouxinhua@tastien.com')
	// await page.type('.hwid-input-pwd', 'Zouxh123456')

	console.log('🎉🎉🎉🎉🎉🎉🎉账号密码已输入🎉🎉🎉🎉🎉🎉🎉🎉')

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('.hwid-btn-primary')
		for (let button of buttons) {
			if (button.innerText.includes('登录')) {
				button.click()
				break
			}
		}
	})

	await page.waitForFunction(() => {
		const elements = document.querySelectorAll('.subTitle')
		for (let i = 0; i < elements.length; i++) {
			if (
				elements[i].textContent.includes(
					'因您尚未信任此浏览器，为保护帐号安全，请输入验证码。'
				)
			) {
				return true
			}
		}
		return false
	})
	console.log('🎉🎉🎉🎉🎉🎉🎉手机号二次验证已出现🎉🎉🎉🎉🎉🎉🎉🎉')

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('.hwid-vertical-align')
		for (let button of buttons) {
			if (button.innerText.includes('获取验证码')) {
				button.click()
				break
			}
		}
	})
	console.log('🎉🎉🎉🎉🎉🎉🎉获取验证码已点击🎉🎉🎉🎉🎉🎉🎉🎉')

	const phoneCode = await Read.Question(
		'手机验证码已发送至 - 19905076109，请输入手机获取的验证码\n'
	)

	await page.evaluate(() => {
		const input = document.querySelector(
			'input[ht="input_authentication_authcode"]'
		)
		// input.value = phoneCode
		input.classList.add('dz-check-input')
	})

	await page.type('.dz-check-input', String(phoneCode))
	console.log('🎉🎉🎉🎉🎉🎉🎉验证码已填写🎉🎉🎉🎉🎉🎉🎉🎉')

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('.btn-next')
		for (let button of buttons) {
			if (button.innerText.includes('确定')) {
				button.click()
				break
			}
		}
	})
	console.log('🎉🎉🎉🎉🎉🎉🎉确定已点击🎉🎉🎉🎉🎉🎉🎉🎉')

	// try {
	// 	await page.waitForSelector('.hwid-dialog-main', { timeout: 3000 })
	// 	await page.evaluate(() => {
	// 		const buttons = document.querySelectorAll('.hwid-btn-primary')
	// 		for (let button of buttons) {
	// 			if (button.innerText.includes('信任')) {
	// 				button.click()
	// 				break
	// 			}
	// 		}
	// 	})
	const cookies = await page.cookies()
	const res = await writeFileContent('huawei', JSON.stringify(cookies))
	if (res) {
		console.log('🎉 cookie 已重新获取 并写入成功 🎉')
	}

	setTimeout(async () => {
		const cookies = await page.cookies()
		const res = await writeFileContent('huawei', JSON.stringify(cookies))
		if (res) {
			console.log('🎉 cookie 已重新获取 并写入成功 🎉')
		}
		await browser.close()
	}, 5000)
}

loginHuaWei()
