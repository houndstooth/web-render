import { mixDownContexts } from '../../../../../src/app/render/mixDownContexts'
import { state } from '../../../../../src/state'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo

describe('mix down contexts', () => {
	it('draws each of the contexts in turn onto the mixedDownContext', () => {
		const drawImageSpy: Spy = jasmine.createSpy('drawImage')
		state.mixedDownContext = { drawImage: drawImageSpy }

		state.contexts = [
			{ canvas: 0 },
			{ canvas: 1 },
			{ canvas: 2 },
			{ canvas: 3 },
			{ canvas: 4 },
			{ canvas: 5 },
		]

		mixDownContexts()

		const drawImageSpyCalls: CallInfo[] = drawImageSpy.calls.all()
		expect(drawImageSpyCalls[0].args[0]).toEqual(0)
		expect(drawImageSpyCalls[1].args[0]).toEqual(1)
		expect(drawImageSpyCalls[2].args[0]).toEqual(2)
		expect(drawImageSpyCalls[3].args[0]).toEqual(3)
		expect(drawImageSpyCalls[4].args[0]).toEqual(4)
		expect(drawImageSpyCalls[5].args[0]).toEqual(5)
	})

	it('does not fail if there is no mixed down context', () => {
		mixDownContexts()
	})
})