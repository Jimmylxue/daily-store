/**
 * transform origin item key to layout item key
 */
export function transformWinPrizeItem(originKey: number): number {
	if (originKey > 8) {
		throw new Error("key couldn't allow bigger than 8")
	}
	const originKeys = [0, 1, 2, 3, 4, 5, 6, 7]
	const layoutKeys = [0, 1, 2, 7, 3, 6, 5, 4]
	return layoutKeys[originKeys.findIndex(key => key === originKey - 1)]
}

// 0 1 2     0 1 2
// 3 x 4  => 7 x 3   origin => layout
// 5 6 7     6 5 4
