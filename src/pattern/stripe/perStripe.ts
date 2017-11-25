// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as constants from '../../constants'
import * as from from '../../from'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] =
	({ getStripePosition }: { getStripePosition: GetStripePosition }): StripePosition[] => {
		const stripeCount: number = getFromBaseOrDefaultPattern('stripeCount')

		return to.StripePositions(codeUtilities.iterator(stripeCount).map((stripeIndex: number): StripePosition =>
			to.StripePosition(from.StripePosition(getStripePosition({
				stripeCount,
				stripeIndex,
			})) * from.StripePosition(constants.PERIMETER_SCALAR))))
	}

export { perStripe as main }
