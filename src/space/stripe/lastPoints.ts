import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { PointsParams } from '../types'
import { pointAlongBottomEdge, pointAlongLeftEdge, pointInBottomLeftCorner } from './stripePoints'

const lastPoints: (_: PointsParams) => void = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, stripeStart, tileOrigin, tileSize } = params
	const stripeStartsInTopLeftCorner = from.StripePosition(stripeStart || to.StripePosition(0)) === 0
	if (!stripeStartsInTopLeftCorner) {
		lastPointsWhenStripeDoesNotStartInTopLeftCorner({
			outline,
			stripeEndsInBottomRightHalf,
			stripeStart,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		})
	}
	else if (stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ tileOrigin, tileSize }))
	}
}

const lastPointsWhenStripeDoesNotStartInTopLeftCorner: (_: PointsParams) => void = params => {
	const { stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, outline, stripeStart, tileOrigin, tileSize } = params

	if (stripeStartsInTopLeftHalf && stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ tileOrigin, tileSize }))
	}

	if (stripeStartsInTopLeftHalf) {

		outline.push(pointAlongLeftEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
	else {
		outline.push(pointAlongBottomEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
}

export { lastPoints }
