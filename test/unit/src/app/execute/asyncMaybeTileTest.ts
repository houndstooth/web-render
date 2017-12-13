import {
	Address,
	asyncMaybeTile,
	globalWrapper,
	maybeTile,
	ReferencedAddress,
	thisPatternHasNotBeenCanceled,
	to,
	updateProgress,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('async maybe tile', () => {
	let subject: (_: ReferencedAddress) => void
	let setTimeoutSpy: Spy
	let thisPatternHasNotBeenCanceledSpy: Spy
	let address: Address
	const thisPatternRef: number = 99
	beforeEach(() => {
		subject = asyncMaybeTile.default
		address = to.Address([ 4, 5 ])
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(globalWrapper.window, 'setTimeout').and.callFake((fn: () => void) => {
			fn()
		})
		spyOn(maybeTile, 'default')
		spyOn(updateProgress, 'default')
		thisPatternHasNotBeenCanceledSpy = spyOn(thisPatternHasNotBeenCanceled, 'default')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		subject({ address, thisPatternRef })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	it('checks that the pattern has not been cancelled', () => {
		subject({ address, thisPatternRef })

		expect(thisPatternHasNotBeenCanceledSpy).toHaveBeenCalledWith(99)
	})

	describe('when the pattern the tile was born from has not been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(true)

			subject({ address, thisPatternRef })
		})

		it('calls maybe tile with the same arguments', () => {
			expect(maybeTile.default).toHaveBeenCalledWith({ address, thisPatternRef })
		})

		it('updates progress', () => {
			expect(updateProgress.default).toHaveBeenCalled()
		})
	})

	describe('when the pattern the tile was born from has been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(false)

			subject({ address, thisPatternRef })
		})

		it('does not call maybe tile', () => {
			expect(maybeTile.default).not.toHaveBeenCalled()
		})

		it('does not update progress', () => {
			expect(updateProgress.default).not.toHaveBeenCalled()
		})
	})
})
