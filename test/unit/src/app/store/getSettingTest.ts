import { defaults, getSetting, setSetting, to } from '../../../../../src'

const { DEFAULT_CANVAS_SIZE } = defaults

describe('get setting', () => {
	it('accesses child setting if it exists on the base pattern', () => {
		setSetting.main('viewSettings', { canvasSize: to.Px(2) })

		expect(getSetting.main('canvasSize')).toBe(to.Px(2))
	})

	it('gets the setting off the default pattern if it is not on the base pattern', () => {
		setSetting.main('viewSettings', { canvasSize: undefined })

		expect(getSetting.main('canvasSize')).toBe(DEFAULT_CANVAS_SIZE)
	})
})