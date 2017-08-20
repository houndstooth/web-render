import codeUtilities from '../utilities/codeUtilities'
import tile from './tile'
import store from '../../store'
import applyBackgroundColor from '../render/applyBackgroundColor'
import applyOpacity from '../render/applyOpacity'

export default () => {
	let { includeNegativeQuadrants, gridSize } = store.mainHoundstooth.basePattern.gridSettings || {}
	const { iterator } = codeUtilities

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
