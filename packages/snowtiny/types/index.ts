export type TFileItem = {
	isImage: boolean
	isDir: boolean
	fileName: string
	children?: TFileItem
	fullRoute: string
}

export type TFileObject = {
	dirname?: string
	dirRoute?: string
	fileChildren?: TFileItem[]
	dirChildren?: TFileObject[]
}
