export function listenStorage(fn: (type: string, payload: any) => void) {
	const eventHandle = (e: StorageEvent) => {
		const data = JSON.parse(e.newValue!) as {
			payload: any
		}
		fn(e.key!, data.payload)
	}
	window.addEventListener('storage', eventHandle)
	return () => {
		window.removeEventListener('storage', eventHandle)
	}
}

export function sendMessage(type: string, payload: any) {
	localStorage.setItem(
		`@@snow@@${type}`,
		JSON.stringify({
			payload,
			timeString: Date.now(),
		})
	)
}
