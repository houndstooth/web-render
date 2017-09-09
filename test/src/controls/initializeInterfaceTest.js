import initializeInterface from '../../../src/controls/initializeInterface'

describe('initialize interface', () => {
	it('sets up the effect toggles', () => {
		const setupEffectTogglesSpy = jasmine.createSpy()
		initializeInterface.__Rewire__('setupEffectToggles', setupEffectTogglesSpy)

		initializeInterface()

		expect(setupEffectTogglesSpy).toHaveBeenCalled()
	})
})