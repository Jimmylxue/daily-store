import { useEffect, useState } from 'react'

type TImageOption = {
	source: string
	onSuccess?: () => void
}

export async function loadImageInfo({ source }: TImageOption): Promise<{
	instance: HTMLImageElement
	originWidth: number
	originHeight: number
}> {
	return await new Promise((resolve, reject) => {
		const image = new Image()
		image.src = source
		image.onload = () =>
			resolve({
				instance: image,
				originWidth: image.width,
				originHeight: image.height,
			})
		image.onerror = () => reject()
	})
}

type TUseImageResult = {
	info?: {
		width: number
		height: number
	}
	isLoading: boolean
	isSuccess?: boolean
	isError?: boolean
}

export default function useImage({ source }: TImageOption): TUseImageResult {
	const [loadingInfo, setLoadingInfo] = useState<TUseImageResult>({
		isLoading: true,
	})

	useEffect(() => {
		;(async () => {
			try {
				const state = await loadImageInfo({ source })
				setLoadingInfo({
					isLoading: false,
					isSuccess: true,
					isError: false,
					info: { width: state.originWidth, height: state.originHeight },
				})
			} catch (error) {
				setLoadingInfo({
					isLoading: false,
					isError: true,
					isSuccess: false,
					info: undefined,
				})
			}
		})()
	}, [source])

	return loadingInfo
}
