import { deeperPath, FullSettingsPath, SettingsPath, SettingsStep, to } from '../../../../../src/indexForTest'

describe('deeper path', () => {
	it('does not mutate the passed objects path', () => {
		const subject: (_: FullSettingsPath) => SettingsPath = deeperPath.default
		const originalSettingsPath: SettingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingsStep = to.SettingsStep('colorSet')

		const actualDeeperPath: SettingsPath = subject({ settingsPath: originalSettingsPath, settingName })

		expect(actualDeeperPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'colorSet' ]))
		expect(originalSettingsPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]))
	})
})
