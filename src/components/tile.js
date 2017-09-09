import isTileUniform from './isTileUniform'
import codeUtilities from '../utilities/codeUtilities'
import render from '../render'
import getTileColorIndices from './getTileColorIndices'
import getTileOriginAndSize from './getTileOriginAndSize'
import getStripePositionsForTile from './getStripePositionsForTile'
import outlines from '../outlines'
import { PERIMETER_SCALAR } from '../constants'
import state from '../../state'

export default ({ gridAddress }) => {
	const { tileOrigin, tileSize } = getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) return

	const tileColorIndices = getTileColorIndices({ gridAddress })
	const args = { gridAddress, tileOrigin, tileSize, tileColorIndices }
	shouldUseSquare({ tileColorIndices }) ? squareTile(args) : stripedTile(args)
}

const shouldUseSquare = ({ tileColorIndices }) => {
	const { collapseSameColoredShapesWithinTile } = state.mainHoundstooth.basePattern.tileSettings || {}
	const tileCanBeCollapsed = isTileUniform({ tileColorIndices })
	const shouldCollapseSameColoredShapes = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)
	return shouldCollapseSameColoredShapes && tileCanBeCollapsed
}

const squareTile = args => {
	args.getOutline = outlines.squareOutline
	render.shape(args)
}

const stripedTile = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		render.shape(stripeArgs)
	})
}

const getStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions }) => {
	const stripeArgs = codeUtilities.deepClone(args)

	stripeArgs.getOutline = outlines.stripeOutline
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}
