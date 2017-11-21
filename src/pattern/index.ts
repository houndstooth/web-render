// tslint:disable:max-file-line-count

import { animationSettings, executeAnimation, exportFrame, Frame, standardAnimation } from './animation'
import {
	AssignmentMode,
	Color,
	colorAssignmentSettings,
	ColorOptions,
	ColorSet,
	colorSettings,
	parseColor,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Weave,
} from './color'
import { executePattern } from './executePattern'
import { Address, AddressElement, Grid, gridSettings, Unit } from './grid'
import { Layer, layerSettings } from './layer'
import { settingsNamesToPathsMap } from './settingsNamesToPathsMap'
import {
	Coordinate,
	GetStripePosition,
	GetStripePositions,
	Outline,
	perStripe,
	Radian,
	rotateCoordinate,
	stripeCountContinuumSettings,
	StripeCountMode,
	StripePosition,
	stripePositionSettings,
	stripeSettings,
} from './stripe'
import {
	ComponentParams, ExecuteTexture, ExecuteTextureParams,
	solid,
	SolidParams,
	textureSettings,
} from './texture'
import { tileCenter, TileOriginAndSize, tileSettings } from './tile'
import {
	BasePattern,
	Effect,
	Houndstooth,
	Pattern,
	PatternFunctions,
	SetSetting,
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
} from './types'
import { applyViewForShape, viewSettings } from './view'

export {
	standardAnimation,
	perStripe,
	tileCenter,
	solid,
	Address,
	Unit,
	Color,
	Weave,
	Supertile,
	PatternFunctions,
	BasePattern,
	ColorOptions,
	ShapeColorIndex,
	AssignmentMode,
	stripeCountContinuumSettings,
	TransformShapeColorIndices,
	ColorSet,
	rotateCoordinate,
	Outline,
	StripePosition,
	GetStripePosition,
	StripeCountMode,
	Radian,
	GetStripePositions,
	Coordinate,
	ComponentParams,
	ExecuteTexture,
	ExecuteTextureParams,
	SolidParams,
	TileOriginAndSize,
	animationSettings,
	executePattern,
	executeAnimation,
	applyViewForShape,
	Layer,
	parseColor,
	Frame,
	Houndstooth,
	TransformShapeColorIndicesParams,
	Effect,
	AddressElement,
	Grid,
	SettingsNamesToTypesMap,
	settingsNamesToPathsMap,
	Pattern,
	colorSettings,
	colorAssignmentSettings,
	gridSettings,
	layerSettings,
	stripeSettings,
	stripePositionSettings,
	textureSettings,
	tileSettings,
	SetSetting,
	viewSettings,
	SettingsNamesByTypeBase,
	exportFrame,
}
