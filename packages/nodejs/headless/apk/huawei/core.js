import puppeteer from 'puppeteer'
// ;('_frid=f1ed4d8f0d0343c09487cb65f983f677; urlBeforeLogin=https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp; state=5433814; x-siteId=1; x-teamId=30086000670132005; x-country=CN; x-userType=2; developer_userinfo=%7B%22siteid%22%3A%221%22%2C%22expiretime%22%3A%2220230925T044845Z%22%2C%22csrftoken%22%3A%222CF8B493C3120E3CA406A8D7E00A5C10A43EA9C6AAF0ACC25F%22%2C%22teamid%22%3A%2230086000670132005%22%7D; x-hd-grey=agcGreyFlag-0_agcTeamId-30086000670132005; _fr_ssid=24020002ea084cc2bfc60ffb25bcea73; HW_id_developer_huawei_com/consumer_developer_huawei_com=795cf91d647967311a0caff3e08a7dcf; HW_idts_developer_huawei_com/consumer_developer_huawei_com=1695613730162; HW_refts_developer_huawei_com/consumer_developer_huawei_com=1695613730163; HW_idvc_developer_huawei_com/consumer_developer_huawei_com=1; HW_idn_developer_huawei_com/consumer_developer_huawei_com=70b3b2fdd5a8fc566e389d570c15ff58; _fr_pvid=6aaebe760cce41cfbfa98efea3785951')
;(async () => {
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
	// await page.evaluate(() => {
	// 	localStorage.setItem(
	// 		'sid',
	// 		'204936bc371bb580e433894814245aebaa8b9c2583a40ca89d3c5a45b0fad4334804851b67b5373437df'
	// 	)
	// 	localStorage.setItem(
	// 		'hwid_cas_sid',
	// 		'204936bc371bb580e433894814245aebaa8b9c2583a40ca89d3c5a45b0fad4334804851b67b5373437df'
	// 	)
	// })

	// 页面指向指定网址
	await page.goto(
		'https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myApp'
	)

	setTimeout(async () => {
		await page.screenshot({ path: 't1.png' })
		await browser.close()
	}, 15000)
})()
