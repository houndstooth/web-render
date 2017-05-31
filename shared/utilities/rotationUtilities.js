import state from '../state/state'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET } from '../application/constants'

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

const maybeRotateCoordinates = ({ coordinates, center, /* origin,*/ rotationAboutCenter }) => {
	if (rotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: rotationAboutCenter
		})
	}

	// if (rotationAboutOrigin) {
	// 	coordinates = rotateCoordinatesAboutPoint({
	// 		point: origin,
	// 		coordinates: coordinates,
	// 		rotation: rotationAboutOrigin
	// 	})
	// }

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state.shared

	const offset = baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + tileRotationAboutTileCenter
	if (extraRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: extraRotation
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

export default {
	maybeRotateCoordinates
}