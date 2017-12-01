import {
	buildGridProgressIntervalFunction,
	NullarySideEffector,
	PageElement,
	state,
	windowWrapper,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('build progress interval function returns a function which', () => {
	let progressBar: PageElement
	let progressMessage: PageElement
	let gridProgressIntervalFunction: NullarySideEffector
	beforeEach(() => {
		progressBar = buildMockElement()
		progressMessage = buildMockElement()
		gridProgressIntervalFunction = buildGridProgressIntervalFunction.default({ progressBar, progressMessage })
		spyOn(state, 'resolveGrid')
		state.tileCount = 99
		state.gridProgressInterval = jasmine.createSpy('gridProgressInterval')
	})

	describe('when the grid is complete', () => {
		beforeEach(() => {
			state.tilesCompleted = 99
		})

		it('resolves the promise', () => {
			gridProgressIntervalFunction()

			expect(state.resolveGrid).toHaveBeenCalled()
		})

		it('clears the progress interval off the store', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.gridProgressInterval || {})
		})

		it('resets the progress bar', () => {
			progressBar.style.width = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.width).toBe('0%')
		})

		it('resets the progress message', () => {
			progressMessage.textContent = 'Rendering frame 777: 99%'

			gridProgressIntervalFunction()

			expect(progressMessage.textContent).toBe('')
		})
	})

	describe('when the grid is not yet complete', () => {
		beforeEach(() => {
			state.tilesCompleted = 13
		})

		it('does not resolve the promise', () => {
			gridProgressIntervalFunction()

			expect(state.resolveGrid).not.toHaveBeenCalled()
		})

		it('does not clear the progress interval off the store', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.clearInterval).not.toHaveBeenCalled()
		})

		it('does not reset the progress bar', () => {
			progressBar.style.width = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.width).toBe('99%')
		})

		it('does not reset the progress message', () => {
			progressMessage.textContent = 'Rendering frame 777: 99%'

			gridProgressIntervalFunction()

			expect(progressMessage.textContent).toBe('Rendering frame 777: 99%')
		})
	})

	it('does not fail when there is no progress bar', () => {
		state.tilesCompleted = 99
		gridProgressIntervalFunction = buildGridProgressIntervalFunction.default({ progressBar: undefined })

		gridProgressIntervalFunction()
	})
})
