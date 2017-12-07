import { appState } from '../appState'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import executeGridAndMaybeLogging from './executeGridAndMaybeLogging'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, thisPatternRef }: ExecuteLayerParams): Promise<void> => {
		appState.execute.currentLayer = layer

		callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })

		await executeGridAndMaybeLogging({ thisPatternRef })
	}

export default executeLayer