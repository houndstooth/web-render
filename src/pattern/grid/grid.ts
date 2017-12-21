import { setTileCount } from '../../app'
import { codeUtilities, to } from '../../utilities'
import { patternState } from '../patternState'
import { applyViewForGrid } from '../view'
import { GridSettings } from './gridSettings'
import { ReferencedAddress } from './types'

const NEGATIVE_AND_POSITIVE: number = 2
const QUADRANT_COUNT: number = NEGATIVE_AND_POSITIVE * NEGATIVE_AND_POSITIVE

const grid: (_: { gridTile: (_: ReferencedAddress) => void, patternId: number }) => void =
	({ gridTile, patternId }: { gridTile: (_: ReferencedAddress) => void, patternId: number }): void => {
		applyViewForGrid.default()

		const { includeNegativeQuadrants, tileResolution }: GridSettings = patternState.gridSettings

		let adjustedTileResolution: number = tileResolution
		let gridOffset: number = 0
		let tileCount: number = tileResolution * tileResolution

		if (includeNegativeQuadrants) {
			adjustedTileResolution *= NEGATIVE_AND_POSITIVE
			gridOffset -= tileResolution
			tileCount *= QUADRANT_COUNT
		}

		setTileCount.default(tileCount)

		codeUtilities.iterator(adjustedTileResolution).forEach((x: number): void => {
			codeUtilities.iterator(adjustedTileResolution).forEach((y: number): void => {
				gridTile({ address: to.Address([ x + gridOffset, y + gridOffset ]), patternId })
			})
		})
	}

export default grid
