import puppeteer from 'puppeteer'
import ReadLine from 'readline-promises'
const Read = new ReadLine()

const cookies = [
	{
		name: 'HuaweiID_CAS_ISCASLOGIN',
		value: 'true',
		domain: '.huawei.com',
		path: '/',
		expires: -1,
		size: 27,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'sid',
		value:
			'204936bc371bb580e433894814245aebaa8b9c2583a40ca89d3c5a45b0fad4334804851b67b5373437df',
		domain: '.id1.cloud.huawei.com',
		path: '/',
		expires: 1730255866.366445,
		size: 87,
		httpOnly: false,
		secure: true,
		session: false,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'HW_id_id1_cloud_huawei_com_id1_cloud_huawei_com',
		value: 'b9dd51a34b7d411b8b167334925a8ed7',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1727231866,
		size: 79,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'hwid_cas_sid',
		value:
			'204936bc371bb580e433894814245aebaa8b9c2583a40ca89d3c5a45b0fad4334804851b67b5373437df',
		domain: '.id1.cloud.huawei.com',
		path: '/',
		expires: 1730255866.366404,
		size: 96,
		httpOnly: false,
		secure: true,
		session: false,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'VERSION_NO',
		value: 'UP_CAS_6.12.0.100_live',
		domain: '.id1.cloud.huawei.com',
		path: '/',
		expires: -1,
		size: 32,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'HW_idts_id1_cloud_huawei_com_id1_cloud_huawei_com',
		value: '1695695866190',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1727231866,
		size: 62,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'LOGINACCSITE',
		value: '1',
		domain: '.huawei.com',
		path: '/',
		expires: -1,
		size: 13,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'HW_idvc_id1_cloud_huawei_com_id1_cloud_huawei_com',
		value: '1',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1727231866,
		size: 50,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'HW_idn_id1_cloud_huawei_com_id1_cloud_huawei_com',
		value: 'f140e99878db48168666e71fbf7a3cf5',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1695697667,
		size: 80,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'CASTGC',
		value:
			'TGT-193410-3ztupV8yhokPJHTI74yHwiayY9wlDfibrTwvvrgcEIeIag3BKagD-cas-MkJ9jNefx2sZp1wBLvpKh7uosDMTZ6Oa',
		domain: '.id1.cloud.huawei.com',
		path: '/CAS',
		expires: -1,
		size: 106,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'HW_refts_id1_cloud_huawei_com_id1_cloud_huawei_com',
		value: '1695695866189',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1711247866,
		size: 63,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'cookieBannerOnOff',
		value: 'true',
		domain: 'id1.cloud.huawei.com',
		path: '/',
		expires: 1698287866,
		size: 21,
		httpOnly: false,
		secure: true,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'CASLOGINSITE',
		value: '1',
		domain: '.huawei.com',
		path: '/',
		expires: -1,
		size: 13,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'JSESSIONID',
		value:
			'57AC2013263AD56AB057C02F4E72C4676B729A647CD526EE84E2321FF5599C5E0ECEB674EC54B95943530AD03893DF26',
		domain: 'id1.cloud.huawei.com',
		path: '/CAS',
		expires: -1,
		size: 106,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: 'CAS_THEME_NAME',
		value: 'red',
		domain: '.id1.cloud.huawei.com',
		path: '/',
		expires: -1,
		size: 17,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'None',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
]

;(async () => {
	const browser = await puppeteer.launch({
		args: [
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
	})
	// 创建一个新页面
	const page = await browser.newPage()

	await page.setViewport({
		width: 1920,
		height: 1080,
	})

	// cookies.forEach(cookie => {
	// 	page.setCookie(cookie)
	// })
	// 页面指向指定网址
	await page.goto(
		'https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp'
	)

	// 点击“更新版本”div
	await page.waitForFunction(() => {
		const elements = document.querySelector('.userAccount')
		return !!elements
	})

	await page.type('.userAccount', 'zouxinhua@tastien.com')
	await page.type('.hwid-input-pwd', 'Zouxh123456')
	// await page.type('.userAccount', '19905076109')
	// await page.type('.hwid-input-pwd', 'yshzx171107.')
	// await page.evaluate(() => {
	// 	const input = document.querySelector('input[ht="input_pwdlogin_pwd"]')
	// 	// input.value = '112233'
	// 	input.classList.add('dz-check-input')
	// })
	// await page.type('.dz-check-input', '112233')

	console.log('🎉🎉🎉🎉🎉🎉🎉账号密码已输入🎉🎉🎉🎉🎉🎉🎉🎉')
	await page.screenshot({ path: 'login/2.png' })

	// await browser.close()

	// return

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('.hwid-btn-primary')
		for (let button of buttons) {
			if (button.innerText.includes('登录')) {
				button.click()
				break
			}
		}
	})
	console.log('🎉🎉🎉🎉🎉🎉🎉登录按钮已点击🎉🎉🎉🎉🎉🎉🎉🎉')

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
	await page.screenshot({ path: 'login/3.png' })

	// await page.evaluate(() => {
	// 	const buttons = document.querySelectorAll('.hwid-vertical-align')
	// 	for (let button of buttons) {
	// 		if (button.innerText.includes('获取验证码')) {
	// 			button.click()
	// 			break
	// 		}
	// 	}
	// })
	// console.log('🎉🎉🎉🎉🎉🎉🎉获取验证码已点击🎉🎉🎉🎉🎉🎉🎉🎉')

	// const phoneCode = await Read.Question(
	// 	'手机验证码已发送至 - 19905076109，请输入手机获取的验证码\n'
	// )
	const phoneCode = '940575'

	console.log('🎉🎉🎉🎉🎉🎉🎉🎉接受的验证码为：', String(phoneCode))

	await page.evaluate(() => {
		const input = document.querySelector(
			'input[ht="input_authentication_authcode"]'
		)
		// input.value = phoneCode
		input.classList.add('dz-check-input')
	})

	await page.type('.dz-check-input', String(phoneCode))

	console.log('🎉🎉🎉🎉🎉🎉🎉验证码已填写🎉🎉🎉🎉🎉🎉🎉🎉')
	// setTimeout(() => {

	// }, timeout);
	await page.screenshot({ path: 'login/4.png' })

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

	setTimeout(async () => {
		await page.screenshot({ path: 'login/6.png' })

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
		await page.screenshot({ path: 'login/7.png' })

		await browser.close()
	}, 3000)
})()
