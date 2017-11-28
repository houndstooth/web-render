import { callFunctionsPerSetting, clear, exportCanvas, getSetting } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { NullaryVoidPromise } from '../../utilities'
import executePattern from '../executePattern'
import { AnimationSettings } from './animationSettings'
import { AnimateParams, BuildAnimationFunctionParams, ConditionFunction, Frame } from './types'

const buildAnimationFunction: (_: BuildAnimationFunctionParams) => NullaryVoidPromise =
	(params: BuildAnimationFunctionParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			const {
				animationFunctionObjects,
				layerFunctionObjects,
			}: BuildAnimationFunctionParams = params

			const { startFrame, refreshCanvas }: AnimationSettings = getSetting.default('animationSettings')

			if (exportingFramesStillNeedsToCatchUp()) {
				return
			}

			if (shouldBeginShowingAnimation(startFrame)) {
				await animate({ layerFunctionObjects, refreshCanvas })
			}

			callFunctionsPerSetting.default({ settingsFunctionObjects: animationFunctionObjects })
			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const exportingFramesStillNeedsToCatchUp: ConditionFunction =
	(): boolean => state.exportFrames && state.currentFrame > state.lastSavedFrame

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean =
	(startFrame: Frame): boolean => state.currentFrame >= startFrame

const animate: (_: AnimateParams) => Promise<void> =
	async ({ layerFunctionObjects, refreshCanvas }: AnimateParams): Promise<void> => {
		if (refreshCanvas) {
			clear.default()
		}

		await executePattern({ layerFunctionObjects })

		if (state.exportFrames) {
			exportCanvas.default()
		}
	}

export default buildAnimationFunction
