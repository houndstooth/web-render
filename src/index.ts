// tslint:disable:max-file-line-count

export {
	attachControlHandlers,
	Canvas,
	clearContext,
	clearContexts,
	clearMixedDownContext,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	frameInputChangeHandler,
	createLabel,
	createCheckbox,
	Context,
	createContext,
	createEffectToggles,
	executeSelectedEffects,
	InputElement,
	PageElement,
	Pixel,
	Px,
	resetMainHoundstooth,
	scaleCanvasContainer,
	scaleElement,
	checkSettingForConflict,
	CheckSettingForConflict,
	effectsHaveConflicts,
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
	createEffectToggle,
	LabelElement,
	insertElementRightAfter,
	storeMixedDownContext,
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
	getPatternSettingOrCreatePath,
	addDescription,
	callFunctionsPerSetting,
	DataBlob,
	exportCanvas,
	saveBlob,
	saveCanvas,
	updateCurrentFrame,
	makeId,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	shouldRecurse,
	PatternsHaveConflictsParams,
	patternsHaveConflicts,
	updateDescriptions,
	clearInterval,
	cancelPreviousPattern,
	storeDomElements,
	buildSettingNamesToPathsMap,
	BuildSettingNamesToPathsMapParams,
	SettingNamesToPathsMap,
	documentWrapper,
	consoleWrapper,
	windowWrapper,
	updateProgress,
	completeLayers,
	animator,
	previousFrameHasFinished,
	executePattern,
	thisPatternHasNotBeenCanceled,
	executeAnimation,
	executeGridAndMaybeLogging,
	buildAnimationIntervalFunction,
	buildAnimationFunction,
	executeLayer,
	gridProgressIntervalFunction,
	executeGrid,
	gridComplete,
	asyncMaybeTile,
	ConditionFunction,
	ExecuteLayerParams,
	appState,
	InsertElementRightAfter,
	Dimensions,
	AnimationParams,
	ExecuteParams,
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	FullSettingsPath,
	PrepareFunctionObjectsParams,
} from './app'
import * as constants from './constants'
import * as defaults from './defaults'
export {
	Address,
	AddressElement,
	AssignmentMode,
	Color,
	ColorOptions,
	ColorSet,
	colorSettings,
	ComponentParams,
	Coordinate,
	Effect,
	ExecuteTexture,
	ExecuteTextureParams,
	Frame,
	GetStripePosition,
	GetStripePositions,
	Layer,
	NamedEffect,
	PatternFunctions,
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
	applyViewForShape,
	grid,
	getBySupertile,
	getByWeave,
	getColor,
	OffsetAddress,
	Grid,
	getShapeColorIndices,
	isTileUniform,
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
	patternState,
	SettingsNamesByType,
	BaseStripeDiagonal,
	animationSettings,
	colorAssignmentSettings,
	gridSettings,
	layerSettings,
	stripeSettings,
	stripeCountContinuumSettings,
	textureSettings,
	tileSettings,
	viewSettings,
	ReferencedGridAddress,
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndices,
	GetOutline,
	RotateCoordinateParams,
	GetStripeOutline,
	ShapeParams,
	TextureParams,
	DefinedTileParams,
	shouldRefreshCanvas,
} from './pattern'
export {
	codeUtilities,
	mathUtilities,
	noop,
	NullarySideEffector,
	NullaryVoidPromise,
	from,
	to,
} from './utilities'

export {
	defaults,
	constants,
}
