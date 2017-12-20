// tslint:disable:max-file-line-count no-reaching-imports

export {
	createOverrideLeafNode,
	createOverrideNodes,
	effectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	frameInputChangeHandler,
	getCurrentFrame,
	getOverrideLeafNode,
	getOverrideParentNode,
	isParentOfAnyOverridingChildren,
	overrideClearClickHandler,
	overrideInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	toggleOverrideParentOpen,
	updateCurrentFrame,
	updateDescriptions,
	updateOverrideLeafNode,
	updateOverrideNodes,

	OverrideLeafNode,
	OverrideNode,
	OverrideParentNode,
} from './controls/indexForTest'
export {
	appendOverride,
	attachControlHandlers,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	createOverrideClear,
	createOverrideId,
	createOverrideLeaf,
	createOverrideParent,
	formatSetting,
	parseOverrideId,
	saveBlobThroughAnchor,
	storeDomElements,
	updateOverrides,

	AppendOverrideParams,
	CreateOverrideParams,
	CreateOverrideTextParams,
	Dimensions,
	OverrideOptions,
	Px,
} from './dom/indexForTest'
export {
	animator,
	asyncMaybeTile,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	callFunctionsPerSetting,
	cancelPreviousPattern,
	clearIntervalAndRemoveFromState,
	completeLayers,
	executeAnimation,
	executeGrid,
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	executeSelectedEffects,
	getCurrentLayer,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	previousFrameHasFinished,
	setTileCount,
	thisPatternHasNotBeenCanceled,
	updateProgress,

	AnimationParams,
	ExecuteLayerParams,
	ExecuteParams,
} from './execute/indexForTest'
export {
	buildFill,
	buildPath,
	clearContext,
	clearContexts,
	clearMixedDownContext,
	clipPath,
	fill,
	fillPath,
	getCurrentContext,
	mixDownContexts,
	resetClip,
	saveCanvas,
	setClip,
	setupMixedDownContext,

	ERASE,

	Path,
	Pixel,
} from './render/indexForTest'
export {
	concatFullSettingPath,
	checkSettingForConflict,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	deeperPath,
	effectsHaveConflicts,
	getEffectSetting,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	mapOverPattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	resetMainHoundstooth,
	setupAvailableEffects,
	shouldRecurse,

	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,

	CheckSettingForConflictParams,
	ComposePatternsParams,
	FullSettingPath,
	GetEffectSetting,
	MapOverPatternParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingFunction,
	SettingFunctionObject,
	SettingPath,
	SettingPathAndName,
	SettingStep,
} from './settings/indexForTest'
export { appState } from './appState'
export {
	AppState,
} from './types'
import * as startUp from './startUp'
export {
	startUp,
}
export {
	DEFAULT_APP_STATE,
} from './defaults'
