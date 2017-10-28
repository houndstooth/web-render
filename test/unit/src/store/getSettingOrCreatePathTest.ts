// tslint:disable:no-any

import { getSettingOrCreatePath } from '../../../../src/store/getSettingOrCreatePath'
import { SettingsStep } from '../../../../src/store/types'
import * as to from '../../../../src/utilities/to'

describe('get setting or create path', () => {
	it('accesses child setting if it exists', () => {
		const expectedSetting: any = {}
		const settings: any = {
			childPathFirstStep: {
				childPathSecondStep: expectedSetting,
			},
		}
		const settingsPath: SettingsStep[] = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toBe(expectedSetting)
	})

	it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
		const settings: any = {}
		const settingsPath: SettingsStep[] = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toEqual({})
		expect(settings).toEqual({
			childPathFirstStep: {
				childPathSecondStep: {},
			},
		})
	})

	it('does not override zeroes', () => {
		const settings: any = {
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		}
		const settingsPath: SettingsStep[] = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toBe(0)
		expect(settings).toEqual({
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		})
	})
})
