import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import codeUtilities from '../utilities/codeUtilities'

export default ({ tileOrigin, sizedUnit, tileColors, colorsIndex, getCoordinates, coordinatesOptions }) => {
	const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: colorsIndex })
	if (shapeColor.a === 0) return

	let coordinates = getCoordinates({ tileOrigin, sizedUnit, coordinatesOptions })
	if (!coordinates) return
	coordinates = rotationUtilities.applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

	render({ shapeColor, coordinates })
}