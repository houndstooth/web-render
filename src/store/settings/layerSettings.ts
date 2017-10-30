// tslint:disable:no-magic-numbers no-any

import { FunctionsOf } from '../../execute'
import { Layer } from '../../execute/types'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface LayerSettings {
	readonly endLayer: Layer,
	readonly startLayer: Layer,
	readonly [_: string]: any,
}

type LayerSettingsStructure = { readonly [P in keyof LayerSettings]: any }

type LayerSettingsFunctions = FunctionsOf<LayerSettings>

const DEFAULT_START_LAYER: Layer = to.Layer(0)
const DEFAULT_END_LAYER: Layer = to.Layer(0)

const DEFAULT_LAYER_SETTINGS: LayerSettings = {
	endLayer: DEFAULT_END_LAYER,
	startLayer: DEFAULT_START_LAYER,
}

type LayerSettingsName = 'layerSettings'

const layerSettingsNamesToPathsMap: LayerSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'layerSettings' ]),
	settings: DEFAULT_LAYER_SETTINGS,
})

type LayerSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	LayerTypedSettingsNames: 'startLayer' | 'endLayer',
}>

export {
	LayerSettings,
	LayerSettingsFunctions,
	DEFAULT_LAYER_SETTINGS,
	LayerSettingsName,
	layerSettingsNamesToPathsMap,
	LayerSettingsNamesByType,
}