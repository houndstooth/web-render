// tslint:disable:max-file-line-count no-reaching-imports

export {
	animator,
	appState,
	asyncMaybeTile,
	attachControlHandlers,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	buildFill,
	buildPath,
	callFunctionsPerSetting,
	cancelPreviousPattern,
	checkSettingForConflict,
	clearContext,
	clearContexts,
	clearIntervalAndRemoveFromState,
	clearMixedDownContext,
	clipPath,
	combineEffects,
	completeLayers,
	composeMainHoundstooth,
	composePatterns,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	deeperPath,
	effectsHaveConflicts,
	effectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeAnimation,
	executeGrid,
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	executeSelectedEffects,
	fill,
	fillPath,
	frameInputChangeHandler,
	getCurrentContext,
	getCurrentFrame,
	getCurrentLayer,
	getPatternSettingOrCreatePath,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	initializeCurrentPatternFromBasePattern,
	makeId,
	mixDownContexts,
	patternsHaveConflicts,
	pauseClickHandler,
	playClickHandler,
	prepareFunctionObjectsPerSetting,
	previousFrameHasFinished,
	resetClip,
	resetMainHoundstooth,
	rewindClickHandler,
	saveBlobThroughAnchor,
	saveCanvas,
	setClip,
	setTileCount,
	settingPath,
	setupAvailableEffects,
	setupMixedDownContext,
	shouldRecurse,
	snapshotClickHandler,
	startUp,
	storeDomElements,
	thisPatternHasNotBeenCanceled,
	updateCurrentFrame,
	updateDescriptions,
	updateProgress,

	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_APP_STATE,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	ERASE,

	AnimationParams,
	CheckSettingForConflict,
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	Dimensions,
	ExecuteLayerParams,
	ExecuteParams,
	FullSettingsPath,
	Path,
	PatternsHaveConflictsParams,
	Pixel,
	PrepareFunctionObjectsParams,
	Px,
	SettingsFunctionObject,
	SettingsPath,
	SettingsStep,
} from './app/indexForTest'
export {
	animationSettings,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyViewForGrid,
	applyViewForShape,
	applyZoom,
	colorAssignmentSettings,
	colorSettings,
	getBySupertile,
	getByWeave,
	getColor,
	getShapeColorIndices,
	getStandardTileOriginAndSize,
	getStripePositionsForTile,
	grid,
	gridSettings,
	initializePatternState,
	isTileUniform,
	layerSettings,
	maybeTile,
	parseColor,
	patternState,
	perStripe,
	rotateCoordinate,
	shape,
	shouldRefreshCanvas,
	solid,
	squareOutline,
	standardAnimation,
	stripeCountContinuumSettings,
	stripeOutline,
	stripePositionSettings,
	stripeSettings,
	textureSettings,
	tile,
	tileSettings,
	viewSettings,

	BLACK,
	BLUE,
	CYAN,
	GREEN,
	MAGENTA,
	RED,
	TRANSPARENT,
	WHITE,
	YELLOW,
	DEFAULT_PATTERN_STATE,
	PERIMETER_SCALAR,

	Address,
	AssignmentMode,
	BaseStripeDiagonal,
	ColorSet,
	ComponentParams,
	Coordinate,
	DefinedTileParams,
	ExecuteTexture,
	ExecuteTextureParams,
	GetOutline,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GetStripeOutline,
	GetStripePosition,
	GetStripePositions,
	GetTileOriginAndSize,
	Grid,
	OffsetAddress,
	Outline,
	OutlineOptions,
	PatternFunctions,
	Radian,
	ReferencedAddress,
	RotateCoordinateParams,
	ShapeColorIndex,
	ShapeParams,
	SolidParams,
	StripeCountMode,
	StripePosition,
	Supertile,
	TextureParams,
	TileOriginAndSize,
	TransformShapeColorIndices,
	Unit,
	Weave,
} from './pattern/indexForTest'
export {
	codeUtilities,
	from,
	globalWrapper,
	mathUtilities,
	ObjectOf,
	to,
} from './utilities/indexForTest'

export {
	CANVAS_SIZE,
} from './constants'
export {
	Color,
	Effect,
	Frame,
	Layer,
	NamedEffect,
	Pattern,
} from './types'
