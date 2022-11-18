export function sleep(fn: () => void, timeOut: number = 1000) {
	setTimeout(() => {
		fn?.()
	}, timeOut)
}

export function sleepPromise(timeOut: number = 1000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('success')
		}, timeOut)
	})
}
