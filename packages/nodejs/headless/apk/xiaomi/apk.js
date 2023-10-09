import puppeteer from 'puppeteer'
import { resolve } from 'path'
import { getFileContent } from '../core/file.js'
import { spawn, spawnSync } from 'child_process'
const pwd = process.cwd()

let fileCookie
let cookies

const fileContent = await getFileContent('xiaomi')
if (!fileContent) {
	spawnSync('node', ['login.js'], {
		stdio: 'inherit', // 将子进程的标准输出流重定向到父进程的标准输出流中
	})
}

;(async () => {
	// 启动chrome浏览器
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
		fileCookie = await getFileContent('xiaomi')
		cookies = JSON.parse(fileCookie)
		cookies.forEach(cookie => {
			page.setCookie(cookie)
		})
	}

	await refreshCookie()

	await page.setViewport({
		width: 1920,
		height: 1080,
	})

	async function start() {
		// 页面指向指定网址
		await page.goto(
			'https://dev.mi.com/distribute/app/2882303761520226434?namespaceValue=0&userId=171969262&packageName=com.tastien.app'
		)

		await page.screenshot({ path: `${resolve(pwd, './progress/0.png')}` })

		try {
			// 点击“更新版本”div
			await page.waitForFunction(
				() => {
					const elements = document.querySelectorAll('span')
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].textContent.includes('更新版本')) {
							return true
						}
					}
					return false
				},
				{ timeout: 5000 }
			)
		} catch (error) {
			console.log('💥 指定内容未出现 cookie 需重新刷新')
			const childProcess = spawn('node', ['login.js'])
			function newProcess() {
				return new Promise((resolve, reject) => {
					// 监听子进程的退出事件
					childProcess.on('close', () => {
						console.log(`🎉 子进程执行结束，正常退出 🎉`)
						resolve(1)
					})
				})
			}

			await newProcess()

			await refreshCookie()

			await start()
		}
	}

	await start()

	console.log('🌱 更新版本 按钮已出现 🌱')
	// 截图
	await page.screenshot({ path: `${resolve(pwd, './progress/1.png')}` })
	await page.evaluate(() => {
		const buttons = document.querySelectorAll('span')
		for (let button of buttons) {
			if (button.innerText.includes('更新版本')) {
				button.click()
				break
			}
		}
	})

	await page.waitForFunction(() => {
		const elements = document.querySelectorAll('input')
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type === 'file' && elements[i].accept === '.apk') {
				return true
			}
		}
		return false
	})
	console.log('🌱 input框已出现 🌱')
	const apkInput = (
		await page.$x('//input[@type="file" and @accept=".apk"]')
	)[0]
	await apkInput.uploadFile('/Users/jimmy/Desktop/app/tastien.apk')

	const watchUploadSuccess = page.waitForFunction(
		() => {
			const elements = document.querySelectorAll('span')
			for (let i = 0; i < elements.length; i++) {
				if (
					elements[i].textContent.includes(
						'因兼容包体相对较大，为保障设备运行及用户下载体验，建议您上传32位、64位双包'
					)
				) {
					return true
				}
			}
			return false
		},
		{ timeout: 1000 * 60 * 3 }
	)

	await watchUploadSuccess

	console.log('🚩 apk已上传成功 🚩')

	await page.screenshot({ path: `${resolve(pwd, './progress/2.png')}` })

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('label')
		for (let button of buttons) {
			if (button.innerHTML.includes('审核通过后立即上线')) {
				button.click()
				break
			}
		}
	})

	console.log('🚩 上线时间已配置 🚩')

	await page.screenshot({ path: `${resolve(pwd, './progress/3.png')}` })

	await page.evaluate(() => {
		const buttons = document.querySelectorAll('.ant-btn-primary')
		buttons?.[0]?.click()
	})

	setTimeout(async () => {
		await page.screenshot({ path: './progress/4.png' })
		console.log('🎉 小米应用市场app自动化上传成功 🎉')
		await browser.close()
	}, 3000)
})()
