import { PointsParamsPlusStripeStart } from '../types'
import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'

const firstPoint: (_: PointsParamsPlusStripeStart) => void =
	({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize }: PointsParamsPlusStripeStart): void => {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointAlongTopEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
		else {
			outline.push(pointAlongRightEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
	}

export { firstPoint }
