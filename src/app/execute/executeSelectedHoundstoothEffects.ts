import { Effect, executeAnimation, executePattern } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { createContexts, createMixedDownContext } from '../page'
import { composeMainHoundstooth } from './composeMainHoundstooth'
import { prepareFunctionObjectsPerSetting } from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => void =
	({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): void => {
		composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})

		prepareCanvas()

		execute({ layerFunctionObjects })
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts()
		if (state.exportFrames) {
			state.mixingDown = true
		}
		if (state.mixingDown) {
			state.mixedDownContext = createMixedDownContext()
		}
	}

const execute: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void =
	({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): void => {
		if (state.animating) {
			const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
			executeAnimation({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern({ layerFunctionObjects }).then().catch()
		}
	}

export { executeSelectedHoundstoothEffects }