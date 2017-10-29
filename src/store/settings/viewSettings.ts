// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import { Px } from '../../page'
import { Radian } from '../../space'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

// Structure

interface ViewSettingsStructure {
	readonly canvasSize: any,
	readonly centerViewOnCenterOfTileAtHomeAddress: any,
	readonly rotateViewAboutCanvasCenter: any,
	readonly zoom: any,
	readonly zoomOnCanvasCenter: any,
	readonly [_: string]: any
}

// Type

interface ViewSettings extends ViewSettingsStructure {
	readonly canvasSize: Px,
	readonly centerViewOnCenterOfTileAtHomeAddress: boolean,
	readonly rotateViewAboutCanvasCenter: Radian,
	readonly zoom: number,
	readonly zoomOnCanvasCenter: boolean,
}

// Functions of

type ViewSettingsFunctions = FunctionsOf<ViewSettings>

// Defaults

const DEFAULT_CANVAS_SIZE: Px = to.Px(800)
const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER: Radian = to.Radian(0)
const DEFAULT_ZOOM = 1
const DEFAULT_ZOOM_ON_CANVAS_CENTER = false

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	canvasSize: DEFAULT_CANVAS_SIZE,
	centerViewOnCenterOfTileAtHomeAddress: DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS,
	rotateViewAboutCanvasCenter: DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER,
	zoom: DEFAULT_ZOOM,
	zoomOnCanvasCenter: DEFAULT_ZOOM_ON_CANVAS_CENTER,
}

// Settings names to paths map

const viewSettings: SettingsPath = to.SettingsPath([ 'viewSettings' ])

const viewSettingsNamesToPathsMap: ViewSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: viewSettings,
	settings: DEFAULT_VIEW_SETTINGS,
})

// Settings names by type

type ViewSettingsName = 'viewSettings'

type ViewSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'centerViewOnCenterOfTileAtHomeAddress' | 'zoomOnCanvasCenter',
	NumberTypedSettingsNames: 'zoom',
	PxTypedSettingsNames: 'canvasSize',
	RadianTypedSettingsNames: 'rotateViewAboutCanvasCenter',
}>

// Export

export {
	// Type

	ViewSettings,

	// Functions of

	ViewSettingsFunctions,

	// Defaults

	DEFAULT_VIEW_SETTINGS,
	DEFAULT_CANVAS_SIZE,

	// Settings names to paths map

	viewSettings,
	viewSettingsNamesToPathsMap,

	// Settings names by type

	ViewSettingsName,
	ViewSettingsNamesByType,
}
