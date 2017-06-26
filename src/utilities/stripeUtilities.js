import codeUtilities from './codeUtilities'
import { PERIMETER_SCALAR } from '../constants'
import { STRIPE_COUNT } from '../defaults'

const getStripePositionsForTile = ({ address }) => {
	const getStripePositionsForTile = state.getStripePositions || standardStripePositions
	return getStripePositionsForTile({ address })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

const perStripe = ({ getStripePosition }) => {
	const stripeCount = state.stripeCountConfig && state.stripeCountConfig.stripeCount || STRIPE_COUNT
	return codeUtilities.iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default {
	getStripePositionsForTile,
	perStripe
}
