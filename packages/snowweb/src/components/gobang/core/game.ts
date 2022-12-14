import { getPositionPxList } from './position'
import { BasePxPosition, TPointInfo } from './type'

// 检查当前这个棋子 可否在某个点下
export function checkPointHasChess(
	player: 'WHITE' | 'BLACK',
	pointInfo: TPointInfo
) {
	if (pointInfo.pointStatus === player) {
		return false
	}
	return true
}

// 下棋
export function playChess(
	player: 'WHITE' | 'BLACK',
	pointInfo: TPointInfo,
	twoDiffPointList: TPointInfo[][],
	oneDiffPointList: TPointInfo[]
) {}
