import { DEFAULT_ANIMATIONS_PATTERN, DEFAULT_BASE_PATTERN, DEFAULT_LAYERS_PATTERN } from '../../defaults'
import { Effect } from '../../pattern'
import { state } from '../../state'
import { consoleWrapper } from '../../utilities'
import { combineHoundstoothEffects } from './combineHoundstoothEffects'
import { composePatterns } from './composePatterns'
import { ComposeMainHoundstooth, ComposePatternParams } from './types'

const composeMainHoundstooth: (_?: ComposeMainHoundstooth) => void =
	(params?: ComposeMainHoundstooth): void => {
		const {
			houndstoothEffects = [],
			houndstoothOverrides = {},
			logComposedMainHoundstooth = false,
		}: ComposeMainHoundstooth = params || {}

		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects({ houndstoothEffects })

		composePattern({
			patternDefaults: DEFAULT_BASE_PATTERN,
			patternEffects: combinedHoundstoothEffects.basePattern,
			patternOverrides: houndstoothOverrides.basePattern,
			patternToCompose: state.mainHoundstooth.basePattern,
		})
		composePattern({
			patternDefaults: DEFAULT_LAYERS_PATTERN,
			patternEffects: combinedHoundstoothEffects.layersPattern,
			patternOverrides: houndstoothOverrides.layersPattern,
			patternToCompose: state.mainHoundstooth.layersPattern,
		})
		composePattern({
			patternDefaults: DEFAULT_ANIMATIONS_PATTERN,
			patternEffects: combinedHoundstoothEffects.animationsPattern,
			patternOverrides: houndstoothOverrides.animationsPattern,
			patternToCompose: state.mainHoundstooth.animationsPattern,
		})

		if (logComposedMainHoundstooth) {
			// tslint:disable-next-line:no-unsafe-any
			consoleWrapper.log(state.mainHoundstooth)
		}
	}

const composePattern: (_: ComposePatternParams) => void =
	({ patternDefaults, patternEffects, patternOverrides = {}, patternToCompose }: ComposePatternParams): void => {
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternDefaults,
		})
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternEffects,
		})
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternOverrides,
		})
	}

export { composeMainHoundstooth }
