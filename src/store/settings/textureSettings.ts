// tslint:disable:no-magic-numbers no-any

import { ExecuteTexture } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface TextureSettings {
	readonly executeTexture?: ExecuteTexture,
	readonly [_: string]: any,
}

type TextureSettingsStructure = { readonly [P in keyof TextureSettings]: any }

type TextureSettingsFunctions = FunctionsOf<TextureSettings>

const DEFAULT_EXECUTE_TEXTURE: undefined = undefined

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	executeTexture: DEFAULT_EXECUTE_TEXTURE,
}

type TextureSettingsName = 'textureSettings'

const textureSettingsNamesToPathsMap: TextureSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'textureSettings' ]),
	settings: DEFAULT_TEXTURE_SETTINGS,
})

type TextureSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ExecuteTextureTypedSettingsNames: 'executeTexture',
}>

export {
	TextureSettings,
	TextureSettingsFunctions,
	DEFAULT_TEXTURE_SETTINGS,
	TextureSettingsName,
	textureSettingsNamesToPathsMap,
	TextureSettingsNamesByType,
}