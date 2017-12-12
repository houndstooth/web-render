// tslint:disable:no-any no-unsafe-any

import { appState, getPatternSettingOrCreatePath, patternState, SettingsPath } from '../../../src/indexForTest'
import { SetPatternSettingForTest } from './types'

const setPatternSettingForTest: SetPatternSettingForTest =
	(settingName: any, value: any): void => {
		console.log('is it just slightly off or something?', appState.settings.settingNamesToPathsMap)
		const baseSettingsPath: SettingsPath = appState.settings.settingNamesToPathsMap[ settingName ]

		const parentSetting: any = getPatternSettingOrCreatePath.default({
			pattern: patternState.get(),
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setPatternSettingForTest
