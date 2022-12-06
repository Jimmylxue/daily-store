/**
 * transform origin item key to layout item key
 */
export function transformWinPrizeItem(originKey: number): number {
	if (originKey > 8) {
		throw new Error("key couldn't allow bigger than 8")
	}
	const originKeys = [0, 1, 2, 3, 4, 5, 6, 7]
	const layoutKeys = [0, 1, 2, 5, 8, 7, 6, 3]
	return layoutKeys[originKeys[originKey]]
}
