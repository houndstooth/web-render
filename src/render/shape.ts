import { wrappedIndex } from '../utilities/codeUtilities'
import { getCurrentContext } from '../canvas'
import state from '../state'
import solid from './solid'
import texture from './texture'
import { ShapeParams } from './types'

const shape: {
	({}: ShapeParams): void,
} = ({ tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions }) => {
	const outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) {
		return
	}

	const context = getCurrentContext()
	const shapeColorIndex = wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const basePattern = state.mainHoundstooth.basePattern || {}
	const textureSettings = basePattern.textureSettings
	const renderTexture = textureSettings && textureSettings.renderTexture

	const renderFunction = renderTexture ? texture : solid
	renderFunction({ context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex })
}

export default shape
