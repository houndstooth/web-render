import clear from '../../../src/canvas/clear'
import state from '../../../state'
import * as getCanvasSize from '../../../src/canvas/getCanvasSize'

describe('clear', () => {
	let mixedDownClearRectSpy
	beforeEach(() => {
		spyOn(getCanvasSize, 'default').and.returnValue([ 400, 500 ])

		mixedDownClearRectSpy = jasmine.createSpy()
		state.mixedDownContext = { clearRect: mixedDownClearRectSpy }
	})

	describe('when there is a single context', () => {
		let clearRectSpy
		beforeEach(() => {
			clearRectSpy = jasmine.createSpy()
			state.contexts = [ { clearRect: clearRectSpy } ]

			clear()
		})

		it('wipes the default amount of canvas', () => {
			expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})

		it('also wipes the mixed down canvas', () => {
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})
	})

	describe('when there are multiple contexts', () => {
		it('wipes every canvas', () => {
			const clearRectSpy1 = jasmine.createSpy()
			const clearRectSpy2 = jasmine.createSpy()
			const clearRectSpy3 = jasmine.createSpy()
			state.contexts = [
				{ clearRect: clearRectSpy1 },
				{ clearRect: clearRectSpy2 },
				{ clearRect: clearRectSpy3 },
			]

			clear()

			expect(clearRectSpy1).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(clearRectSpy2).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(clearRectSpy3).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})
	})
})