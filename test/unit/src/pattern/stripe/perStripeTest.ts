import { composeMainHoundstooth } from '../../../../../src/app/execute/composeMainHoundstooth'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { setSetting } from '../../../../../src/app/store/setSetting'
import { perStripe } from '../../../../../src/pattern/stripe/perStripe'
import { GetStripePosition, StripePosition } from '../../../../../src/pattern/stripe/types'
import * as to from '../../../../../src/to'

describe('per stripe', () => {
	beforeEach(() => composeMainHoundstooth)

	it('uses a stripe count if provided', () => {
		setSetting('stripeSettings', {
			stripePositionSettings: {
				stripeCount: 3,
			},
		})
		const stripePositions: StripePosition[] = perStripe({
			getStripePosition: (): StripePosition => to.StripePosition(5),
		})

		expect(stripePositions.length).toBe(3)
	})

	it('calls the stripe position function once for each stripe', () => {
		const getStripePositionSpy: Spy = jasmine.createSpy('getStripePosition')

		perStripe({ getStripePosition: getStripePositionSpy })

		const spyCalls: CallInfo[] = getStripePositionSpy.calls.all()
		expect(spyCalls.length).toBe(4)
		expect(spyCalls[ 0 ].args[ 0 ]).toEqual({ stripeIndex: 0, stripeCount: 4 })
		expect(spyCalls[ 1 ].args[ 0 ]).toEqual({ stripeIndex: 1, stripeCount: 4 })
		expect(spyCalls[ 2 ].args[ 0 ]).toEqual({ stripeIndex: 2, stripeCount: 4 })
		expect(spyCalls[ 3 ].args[ 0 ]).toEqual({ stripeIndex: 3, stripeCount: 4 })
	})

	it('multiplies the result of each stripe position by the perimeter scalar', () => {
		const standardStripePosition: GetStripePosition = ({ stripeIndex, stripeCount }: {
			stripeCount: number, stripeIndex: number,
		}): StripePosition => to.StripePosition(stripeIndex / stripeCount)
		const stripePositions: StripePosition[] = perStripe({ getStripePosition: standardStripePosition })

		const expectedStripePositions: StripePosition[] = to.StripePositions([ 0, 0.5, 1, 1.5 ])
		expect(stripePositions).toEqual(expectedStripePositions)
	})
})