import { NullarySideEffector, NullaryVoidPromise } from '../../utilities'
import { ExecuteParams } from '../types'
import * as animator from './animator'
import buildAnimationFunction from './buildAnimationFunction'

const executeAnimation: (_: ExecuteParams) => Promise<(resolveAnimation: NullarySideEffector) => void> =
	// tslint:disable-next-line:max-line-length
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<(resolveAnimation: NullarySideEffector) => void> => {
		const animationFunction: NullaryVoidPromise = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})

		const animationExecutor: (resolveAnimation: NullarySideEffector) => void =
			(resolveAnimation: NullarySideEffector): void => {
				animator.default({
					animationFunction,
					resolveAnimation,
				})
			}

		return new Promise<(resolveAnimation: NullarySideEffector) => void>(animationExecutor)
	}

export default executeAnimation
