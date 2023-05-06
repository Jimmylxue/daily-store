export async function colorPicker() {
	// @ts-ignore
	const dropper = new EyeDropper()
	try {
		const result = await dropper.open()
		return result
	} catch {
		console.log('user cancel')
	}
}
