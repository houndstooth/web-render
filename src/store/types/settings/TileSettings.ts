// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcutsBase } from '../TypePathShortcutsBase'
import { getStandardTileOriginAndSize, GetTileOriginAndSize, Unit } from '../../../components'

// Structure

interface TileSettingsStructure {
	collapseSameColoredShapesWithinTile: any,
	getTileOriginAndSize: any,
	tileSize: any,
}

// Type

interface TileSettings extends TileSettingsStructure {
	collapseSameColoredShapesWithinTile: boolean,
	getTileOriginAndSize: GetTileOriginAndSize,
	tileSize: Unit,
}

// Functions of

type TileSettingsFunctions = FunctionsOf<TileSettings>

// Defaults

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

// Shortcuts

const tileSettings: SettingsPath = to.SettingsPath([ 'tileSettings' ])

const settingsPathShortcuts: TileSettingsStructure = buildSettingsPathShortcuts({
	basePath: tileSettings,
	settings: DEFAULT_TILE_SETTINGS,
})

// Shortcut types

type TileSettingsPathShortcut = 'tileSettings'

type TileSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	BooleanPathShortcuts: 'collapseSameColoredShapesWithinTile'
	GetTileOriginAndSizePathShortcuts: 'getTileOriginAndSize'
	UnitPathShortcuts: 'tileSize'
}>

// Export

export {
	// Type

	TileSettings,

	// Functions of

	TileSettingsFunctions,

	// Defaults

	DEFAULT_TILE_SETTINGS,

	// Shortcuts

	tileSettings,
	settingsPathShortcuts,

	// Shortcut types

	TileSettingsPathShortcut,
	TileSettingsTypePathShortcuts,
}
