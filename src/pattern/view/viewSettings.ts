// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
import { to } from '../../utilities'
import { Radian } from '../stripe'
import { SettingsNamesByTypeBase } from '../types'

interface ViewSettings {
	readonly centerViewOnCenterOfTileAtHomeAddress: boolean,
	readonly rotateViewAboutCanvasCenter: Radian,
	readonly zoom: number,
	readonly zoomOnCanvasCenter: boolean,
	readonly [_: string]: any,
}

type ViewSettingsFunctions = FunctionsOf<ViewSettings>

const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS: boolean = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER: Radian = to.Radian(0)
const DEFAULT_ZOOM: number = 1
const DEFAULT_ZOOM_ON_CANVAS_CENTER: boolean = false

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	centerViewOnCenterOfTileAtHomeAddress: DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS,
	rotateViewAboutCanvasCenter: DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER,
	zoom: DEFAULT_ZOOM,
	zoomOnCanvasCenter: DEFAULT_ZOOM_ON_CANVAS_CENTER,
}

type ViewSettingsName = 'viewSettings'

type ViewSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'centerViewOnCenterOfTileAtHomeAddress' | 'zoomOnCanvasCenter',
	NumberTypedSettingsNames: 'zoom',
	PxTypedSettingsNames: 'canvasSize',
	RadianTypedSettingsNames: 'rotateViewAboutCanvasCenter',
}>

export {
	ViewSettings,
	ViewSettingsFunctions,
	DEFAULT_VIEW_SETTINGS,
	ViewSettingsName,
	ViewSettingsNamesByType,
}
