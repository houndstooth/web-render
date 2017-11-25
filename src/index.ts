// tslint:disable:max-file-line-count

export {
	attachControlHandlers,
	Canvas,
	clear,
	combineHoundstoothEffects,
	composeMainHoundstooth,
	composePatterns,
	createLabel,
	createCheckbox,
	Context,
	createContext,
	createEffectToggles,
	createMixedDownContext,
	executeSelectedHoundstoothEffects,
	InputElement,
	PageElement,
	Pixel,
	Px,
	resetState,
	scaleCanvasContainer,
	scaleElement,
	maybeWarnAboutConflicts,
	SettingsFunctionObject,
	prepareFunctionObjectsPerSetting,
	createContexts,
	settingPath,
	SettingsPath,
	SettingsStep,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	buildEffectToggleClickHandler,
	setSetting,
	createEffectToggle,
	LabelElement,
	deleteElementIfExists,
	insertElementRightAfter,
	buildFill,
	Path,
	buildPath,
	clipPath,
	fillPath,
	fill,
	getCurrentContext,
	mixDownContexts,
	resetClip,
	setClip,
	deeperPath,
	getSettingOrCreatePath,
	resetInterface,
	warn,
	callFunctionsPerSetting,
	DataBlob,
} from './app'
import * as constants from './constants'
import * as defaults from './defaults'
import * as from from './from'
export {
	Address,
	AddressElement,
	animator,
	AssignmentMode,
	Color,
	ColorOptions,
	ColorSet,
	colorSettings,
	ComponentParams,
	ConditionFunction,
	Coordinate,
	Effect,
	ExecuteTexture,
	ExecuteTextureParams,
	Frame,
	GetStripePosition,
	GetStripePositions,
	Layer,
	Outline,
	parseColor,
	perStripe,
	Radian,
	rotateCoordinate,
	ShapeColorIndex,
	solid,
	SolidParams,
	standardAnimation,
	StripeCountMode,
	StripePosition,
	Supertile,
	tileCenter,
	TileOriginAndSize,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Unit,
	Weave,
	Pattern,
	executePattern,
	executeAnimation,
	applyViewForShape,
	executeGridAndMaybeLogging,
	exportFrame,
	buildIntervalFunction,
	buildAnimationFunction,
	grid,
	executeLayer,
	buildStopConditionFunction,
	saveFrame,
	saveBlob,
	getBySupertile,
	getByWeave,
	getColor,
	OffsetAddress,
	Grid,
	getShapeColorIndices,
	isTileUniform,
	buildGridProgressIntervalFunction,
	executeGrid,
	gridComplete,
	asyncMaybeTile,
	maybeTile,
	applyViewForGrid,
	getStripePositionsForTile,
	stripePositionSettings,
	squareOutline,
	OutlineOptions,
	stripeOutline,
	texture,
	shape,
	getTileOriginAndSize,
	tile,
	GetTileOriginAndSize,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyZoom,
} from './pattern'
export { state, DEFAULT_STATE } from './state'
import * as to from './to'
export {
	codeUtilities,
	consoleWrapper,
	documentWrapper,
	mathUtilities,
	noop,
	NullarySideEffector,
	NullaryVoidPromise,
	windowWrapper,
} from './utilities'
export { State } from './types'

export {
	to,
	from,
	defaults,
	constants,
}
