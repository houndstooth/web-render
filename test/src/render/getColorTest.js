import getColor from '../../../src/render/getColor'
import state from '../../../state'

describe('get Color', () => {
	it('gets the color object from the state, using the passed index', () => {
		const expectedColor = {}
		state.mainHoundstooth.basePattern.colorSettings = { colorSet: [ {}, expectedColor, {} ] }

		expect(getColor({ index: 7 })).toBe(expectedColor)
	})
})