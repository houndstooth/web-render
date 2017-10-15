import buildIntervalFunction from '../../../../src/animation/buildIntervalFunction'
import state from '../../../../src/state'
import windowWrapper from '../../../../src/utilities/windowWrapper'

describe('build animation function', () => {
	let intervalFunction
	let animationFunctionSpy
	let stopConditionFunctionSpy
	beforeEach(() => {
		spyOn(windowWrapper, 'clearInterval')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		stopConditionFunctionSpy = jasmine.createSpy('stopConditionFunction')
		intervalFunction = buildIntervalFunction({
			animationFunction: animationFunctionSpy,
			stopConditionFunction: stopConditionFunctionSpy,
		})
	})

	it('returns a function which calls the animation function it was built from', () => {
		stopConditionFunctionSpy.and.returnValue(false)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		expect(windowWrapper.clearInterval).not.toHaveBeenCalled()
	})

	it('returns a function which calls clear interval on the current interval if the stop condition is met', () => {
		stopConditionFunctionSpy.and.returnValue(true)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})
})
