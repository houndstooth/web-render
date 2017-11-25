import { buildStopConditionFunction, ConditionFunction, state, to } from '../../../../../src'

describe('build stop condition function', () => {
	// tslint:disable-next-line:max-line-length
	it('returns a function that evaluates to true once the current animation frame on the state is greater than the requested end animation frame', () => {
		const stopConditionFunction: ConditionFunction = buildStopConditionFunction.main({ endFrame: to.Frame(3) })

		state.currentFrame = to.Frame(0)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(1)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(2)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(3)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(4)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(5)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(6)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(7)
		expect(stopConditionFunction()).toBe(true)
	})
})
