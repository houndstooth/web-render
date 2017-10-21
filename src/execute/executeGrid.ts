import { mixDownContexts } from '../canvas'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { gridAndMaybeLogging } from './gridAndMaybeLogging'
import { Layer, SettingsFunctionObject } from './types'

const executeGrid: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void = ({ layerFunctionObjects }) => {
	const { layerSettings } = state.mainHoundstooth.basePattern
	const { startLayer = to.Layer(0), endLayer = to.Layer(0) } = layerSettings

	for (let currentLayerValue = 0; currentLayerValue <= from.Layer(endLayer); currentLayerValue++) {
		executeLayer({ currentLayer: to.Layer(currentLayerValue), startLayer, endLayer, layerFunctionObjects })
	}

	if (state.mixingDown) {
		mixDownContexts()
	}

	state.currentLayer = 0
}

const executeLayer: (_: {
	currentLayer: Layer, endLayer: Layer, layerFunctionObjects: SettingsFunctionObject[], startLayer: Layer,
}) => void = ({ currentLayer, endLayer, layerFunctionObjects, startLayer }) => {
	if (currentLayer >= startLayer || 0) {
		gridAndMaybeLogging()
	}
	if (currentLayer < endLayer) {
		callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
	}
	state.currentLayer++
}

export { executeGrid }
