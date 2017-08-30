import render from '../render/render'
import componentUtilities from '../utilities/componentUtilities'
import codeUtilities from '../utilities/codeUtilities'
import viewUtilities from '../utilities/viewUtilities'
import texture from './texture'

export default ({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions, renderTexture }) => {
    let outline = getOutline({ tileOrigin, tileSize, outlineOptions })
    if (!outline) return

    outline = componentUtilities.rotateCoordinatesAboutTileCenter({ coordinates: outline, tileOrigin, tileSize })

    outline = viewUtilities.applyZoomAndScroll({ coordinates: outline })
    outline = viewUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates: outline })

    if (renderTexture) {
    	texture({ outline, tileColors, tileOrigin, tileSize, colorsIndex, renderTexture })
    }
    else {
        const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: colorsIndex })
        if (shapeColor.a === 0) return
        
        render({ shapeColor, outline })
    }
}
