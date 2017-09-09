import applyBackgroundColor from '../../../src/display/applyBackgroundColor'
import { CYAN } from '../../../src/constants'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('apply background color', () => {
	const defaultFillStyle = '#000000'
	let fillRectSpy
	beforeEach(() => {
		resetState(state)
		fillRectSpy = jasmine.createSpy()
		state.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		applyBackgroundColor.__Rewire__('getCanvasSize', () => [ 400, 500 ])
	})

	it('fills the entire canvas with the color', () => {
		state.mainHoundstooth.basePattern.colorSettings = { backgroundColor: CYAN }

		applyBackgroundColor()

		expect(state.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor()

		expect(state.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
