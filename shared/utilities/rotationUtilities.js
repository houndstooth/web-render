import state from '../state/state'

const MINOR_DIAGONAL_OFFSET = 0
const PRINCIPAL_DIAGONAL_OFFSET = Math.PI / 2

const rotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const offsetX = coordinate[ 0 ] - point[ 0 ]
	const offsetY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + offsetX * cos - offsetY * sin,
		point[ 1 ] + offsetX * sin + offsetY * cos
	]
}

const rotateCoordinatesAboutPoint = ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}

const calculateCenter = ({ origin, sizedUnit }) => [ origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit / 2 ]

const maybeRotateCoordinates = ({ coordinates, center, rotation }) => {
	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state

	const offset = baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const tileRotation = offset + tileRotationAboutTileCenter + rotation
	if (tileRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: tileRotation
		})
	}

	if (gridRotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: gridRotationAboutCenter
		})
	}

	return coordinates
}

const calculateRotation = ({ address }) => {
	let rotation = 0
    if (state.houndsmorphosisMode && address[1] >= 0) rotation += Math.PI
    return rotation
}

export default {
	maybeRotateCoordinates,
	calculateCenter,
	calculateRotation
}