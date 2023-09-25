import puppeteer from 'puppeteer'
;('_frid=f1ed4d8f0d0343c09487cb65f983f677; urlBeforeLogin=https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp; state=5433814; x-siteId=1; x-teamId=30086000670132005; x-country=CN; x-userType=2; developer_userinfo=%7B%22siteid%22%3A%221%22%2C%22expiretime%22%3A%2220230925T044845Z%22%2C%22csrftoken%22%3A%222CF8B493C3120E3CA406A8D7E00A5C10A43EA9C6AAF0ACC25F%22%2C%22teamid%22%3A%2230086000670132005%22%7D; x-hd-grey=agcGreyFlag-0_agcTeamId-30086000670132005; _fr_ssid=24020002ea084cc2bfc60ffb25bcea73; HW_id_developer_huawei_com/consumer_developer_huawei_com=795cf91d647967311a0caff3e08a7dcf; HW_idts_developer_huawei_com/consumer_developer_huawei_com=1695613730162; HW_refts_developer_huawei_com/consumer_developer_huawei_com=1695613730163; HW_idvc_developer_huawei_com/consumer_developer_huawei_com=1; HW_idn_developer_huawei_com/consumer_developer_huawei_com=70b3b2fdd5a8fc566e389d570c15ff58; _fr_pvid=6aaebe760cce41cfbfa98efea3785951')
;(async () => {
	const cookies = [
		{
			name: 'sid',
			value:
				'2049379a37f8d3c67ae1020339d0f33084edc846365a89a70288037b3323f882a83bf638f54c37e83881',
			domain: '.id1.cloud.huawei.com',
			path: '/',
			expires: 1730182468.000192,
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
			name: 'hwid_cas_sid',
			value:
				'2049379a37f8d3c67ae1020339d0f33084edc846365a89a70288037b3323f882a83bf638f54c37e83881',
			domain: '.id1.cloud.huawei.com',
			path: '/',
			expires: 1730182468.000101,
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
			name: 'HW_idts_id1_cloud_huawei_com_id1_cloud_huawei_com',
			value: '1695622467827',
			domain: 'id1.cloud.huawei.com',
			path: '/',
			expires: 1727158467,
			size: 62,
			httpOnly: false,
			secure: false,
			session: false,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'HW_id_id1_cloud_huawei_com_id1_cloud_huawei_com',
			value: '75bb82ab8e354179878600cbf562f1a1',
			domain: 'id1.cloud.huawei.com',
			path: '/',
			expires: 1727158467,
			size: 79,
			httpOnly: false,
			secure: false,
			session: false,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'HW_idvc_id1_cloud_huawei_com_id1_cloud_huawei_com',
			value: '1',
			domain: 'id1.cloud.huawei.com',
			path: '/',
			expires: 1727158467,
			size: 50,
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
			expires: 1698214467,
			size: 21,
			httpOnly: false,
			secure: true,
			session: false,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'HW_idn_id1_cloud_huawei_com_id1_cloud_huawei_com',
			value: '039732a22b8f42ccbf82f907c73e2f26',
			domain: 'id1.cloud.huawei.com',
			path: '/',
			expires: 1695624268,
			size: 80,
			httpOnly: false,
			secure: false,
			session: false,
			sameParty: false,
			sourceScheme: 'Secure',
			sourcePort: 443,
		},
		{
			name: 'HW_refts_id1_cloud_huawei_com_id1_cloud_huawei_com',
			value: '1695622467826',
			domain: 'id1.cloud.huawei.com',
			path: '/',
			expires: 1711174467,
			size: 63,
			httpOnly: false,
			secure: false,
			session: false,
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
		{
			name: 'JSESSIONID',
			value:
				'168DA416E2DDB2ED61470B8C90F31373FD297EB93370061E6359D1AC6F637C56EF5A0E5DC51A37D4577636A06BF112CC',
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

	// 页面指向指定网址
	await page.goto(
		'https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp'
	)

	setTimeout(async () => {
		await page.screenshot({ path: 't1.png' })
		await browser.close()
	}, 3000)
})()
