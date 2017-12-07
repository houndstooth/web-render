import { appState, ConditionFunction, previousFrameHasFinished, to } from '../../../../../src'

const subject: ConditionFunction = previousFrameHasFinished.default

describe('previous frame has finished', () => {
	it('is true when the grid has no tiles still in progress, and the pattern no layers still in progress', () => {
		appState.execute.tilesCompleted = 0
		appState.execute.currentLayer = to.Layer(0)

		expect(subject()).toBe(true)
	})

	it('is false when a grid still has tiles in progress', () => {
		appState.execute.tilesCompleted = 243

		expect(subject()).toBe(false)
	})

	it('is true when a pattern still has layers in progress', () => {
		appState.execute.currentLayer = to.Layer(11)

		expect(subject()).toBe(false)
	})
})