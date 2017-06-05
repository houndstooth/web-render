import { PERIMETER_SCALAR } from '../application/constants'
import calculateDerasterizedByAreaStripe from '../variations/derasterized/calculateDerasterizedByAreaStripe'
import calculateHarmonicContinuumSegmentStripe from '../variations/harmonitooth/calculateHarmonicContinuumSegmentStripe'
import calculateHarmonicContinuumStripe from '../variations/harmonitooth/calculateHarmonicContinuumStripe'
import calculateGinghamChevronContinuumStripes from '../variations/gingham-chevron-continuum/calculateGinghamChevronContinuumStripes'
import state from '../state/state'
import iterator from './iterator'

export default ({ stripeCount, address }) => {
	let stripes
	if (state.stripeCountConfig.mode === 'GINGHAM_CHEVRON_CONTINUUM') {
		stripes = calculateGinghamChevronContinuumStripes({ address })
	} else {
		stripes = iterator(stripeCount).map(stripeIndex => {
			const stripeStyle = state.stripeStyle

			let stripe
			if (stripeStyle === 'DERASTERIZED_BY_AREA') {
				stripe = calculateDerasterizedByAreaStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID') {
				stripe = calculateHarmonicContinuumSegmentStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE') {
				stripe = calculateHarmonicContinuumStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'STANDARD') {
				stripe = stripeIndex / stripeCount
			} else {
				console.log('stripe style not set!')
			}

			return stripe * PERIMETER_SCALAR
		})
	}

	return stripes
}