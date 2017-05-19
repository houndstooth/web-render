import render from './render'
import calculateAnIndividualStripesCoordinates from '../utilities/calculateAnIndividualStripesCoordinates'
import maybeRotateStripe from '../utilities/maybeRotateStripe'

export default ({ sizedUnit, center, origin, rotationAboutCenter, rotationAboutOrigin, colors, stripes }) => {
	stripes.forEach((currentPositionAlongPerimeter, index) => {
		const color = colors[ index % 2 ]
		const nextPositionAlongPerimeter = stripes[ index + 1 ] || 2

		let coordinates = calculateAnIndividualStripesCoordinates({
			currentPositionAlongPerimeter,
			nextPositionAlongPerimeter,
			sizedUnit,
			origin
		})
		coordinates = maybeRotateStripe({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })

		render({ color, coordinates })
	})
}