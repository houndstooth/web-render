import { Effect, executeAnimation, executePattern } from '../../pattern'
import { state } from '../../state'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { createContexts } from '../dom'
import composeMainHoundstooth from './composeMainHoundstooth'
import prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => void =
	({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): void => {
		composeMainHoundstooth({ houndstoothEffects: state.controls.selectedHoundstoothEffects, houndstoothOverrides })

		prepareCurrentPattern()

		prepareCanvas()

		execute()
	}

const prepareCurrentPattern: NullarySideEffector =
	(): void => {
		state.settings.currentPattern = codeUtilities.deepClone(state.settings.mainHoundstooth.basePattern)
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts.default()
	}

const execute: NullarySideEffector =
	(): void => {
		const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.settings.mainHoundstooth.animationsPattern,
		})
		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.settings.mainHoundstooth.layersPattern,
		})

		if (state.controls.animating) {
			executeAnimation.default({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern.default({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
	}

export default executeSelectedHoundstoothEffects
