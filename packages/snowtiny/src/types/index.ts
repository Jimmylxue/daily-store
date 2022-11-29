export type TFileItem = {
	isImage: boolean
	isAcceptImage: boolean // 是否是接受的图片
	isDir: boolean
	fileName: string
	children?: TFileItem
	fullRoute: string
	outputRoute: string // 输出地址
}

export type TFileObject = {
	dirname?: string
	dirRoute?: string
	fileChildren?: TFileItem[]
	dirChildren?: TFileObject[]
}

export type DataUploadType = {
	output: {
		url: string
		size: number
		ratio: number
	}
	input: {
		size: number
	}
	error: string
}

export type TDetail = {
	input: number
	output: number
	ratio: number
	path: string
	file: Buffer
	time?: number
	msg?: string
	fileName: string
}

export type TSnowConfig = {
	entry: string
	output: string
	diffCompress: boolean // diff压缩
	tile: boolean
	saveOther: boolean
	include: string[]
}
