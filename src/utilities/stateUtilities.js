import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import patternStructure from '../state/patternStructure'
import houndstoothStructure from '../state/houndstoothStructure'

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ settingName, maybeSettingFunction ]) => {
		if (typeof maybeSettingFunction === 'function') {
			const settingFunctionItself = maybeSettingFunction
			functionsArray.push({ settingFunctionItself, settingsPath, settingName })
		}
		else if (typeof maybeSettingFunction === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`These settings should map onto basePattern settings, and be functions to call for them each animation / iteration frame. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

const composePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE }) => {
	if (!patternToMerge) return
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		let deeperPatternStructureChecker
		if (codeUtilities.settingIsDefinedOnSettings({
			settingName,
			settingsMaybeWithSetting: patternStructureChecker,
		})) {
			deeperPatternStructureChecker = patternStructureChecker[ settingName ]
		}
		else {
			consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingsPath.join('.')}.${settingName}`)
			return
		}

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length) {
			composePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildSettingOrCreatePath({
				settingsRoot: patternToBeMergedOnto,
				settingsPath,
			})
			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const confirmHoundstoothHasNoUnrecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(houndstoothStructure.HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	composePatterns,
	confirmHoundstoothHasNoUnrecognizedPatterns,
}
