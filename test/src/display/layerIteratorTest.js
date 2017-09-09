import state from '../../../state'
import layerIterator from '../../../src/display/layerIterator'

describe('layer iterator', () => {
	it('returns an array of numbers of each layer', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }

		expect(layerIterator()).toEqual([ 0,1,2,3,4,5 ])
	})
})
