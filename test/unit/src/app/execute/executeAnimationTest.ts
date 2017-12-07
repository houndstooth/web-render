import {
	animator,
	buildAnimationFunction,
	executeAnimation,
	ExecuteParams,
	NullarySideEffector,
	SettingsFunctionObject,
} from '../../../../../src'

const subject: (_: ExecuteParams) => Promise<(resolveAnimation: NullarySideEffector) => void> = executeAnimation.default

describe('execute animation', () => {
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingsFunctionObject[]
	let animationFunctionObjects: SettingsFunctionObject[]

	beforeEach(() => {
		spyOn(animator, 'default')
		spyOn(buildAnimationFunction, 'default').and.returnValue(animationFunction)
		layerFunctionObjects = []
		animationFunctionObjects = []
	})

	it('calls the animator', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
		}))
	})

	it('builds an animation function', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(buildAnimationFunction.default).toHaveBeenCalledWith(
			jasmine.objectContaining({
				animationFunctionObjects,
				layerFunctionObjects,
			}),
		)
	})
})