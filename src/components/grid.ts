import tile from './tile'
import state from '../state'
import { applyBackgroundColor, applyOpacity } from '../view'
import { iterator } from '../utilities/codeUtilities'

const grid = () => {
	let { includeNegativeQuadrants, gridSize } : { includeNegativeQuadrants?, gridSize } = state.mainHoundstooth.basePattern.gridSettings || {}

	applyOpacity()
	applyBackgroundColor()

	if (includeNegativeQuadrants) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ gridAddress: [ x - gridSize, y - gridSize ] })
			})
		})
	}
	else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ gridAddress: [ x, y ] })
			})
		})
	}
}

export default grid