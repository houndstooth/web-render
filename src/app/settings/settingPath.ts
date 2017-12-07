import { SettingsPath, SettingsStep } from './types'

const settingPath: (_: { settingName: SettingsStep, settingsPath: SettingsPath }) => string =
	({ settingName, settingsPath }: { settingName: SettingsStep, settingsPath: SettingsPath }): string =>
		`${settingsPath.join('.')}.${settingName}`

export default settingPath