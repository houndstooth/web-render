import * as to from '../utilities/to'
import { SettingsPath, SettingsStep } from './types'

const deeperPath: (_: {
	settingName: SettingsStep, settingsPath: SettingsPath,
}) => SettingsPath = ({ settingName, settingsPath }) => {
	const path = settingsPath.slice()
	path.push(settingName)

	return to.SettingsPath(path)
}

export { deeperPath }