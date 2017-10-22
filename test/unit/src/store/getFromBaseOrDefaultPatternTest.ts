import { state } from '../../../../src/state'
import { DEFAULT_CANVAS_SIZE } from '../../../../src/store/defaults'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import * as to from '../../../../src/utilities/to'

describe('get from base or default pattern', () => {
	it('accesses child setting if it exists on the base pattern', () => {
		state.mainHoundstooth.basePattern.viewSettings = { canvasSize: to.Dimension(2) }

		expect(getFromBaseOrDefaultPattern('canvasSize')).toBe(to.Dimension(2))
	})

	it('gets the setting off the default pattern if it is not on the base pattern', () => {
		state.mainHoundstooth.basePattern.viewSettings = { canvasSize: undefined }

		expect(getFromBaseOrDefaultPattern('canvasSize')).toBe(DEFAULT_CANVAS_SIZE)
	})
})