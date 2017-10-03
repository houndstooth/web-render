import addEffectToggles from '../../../../src/ui/addEffectToggles'
import * as addEffectToggle from '../../../../src/ui/addEffectToggle'
import * as window from '../../../../src/utilities/windowWrapper'

describe('add effect toggles', () => {
	beforeEach(() => spyOn(addEffectToggle, 'default'))
	it('adds an effect toggle for each effect', () => {
		addEffectToggles([ 'effectOne', 'effectTwo' ])

		expect(addEffectToggle.default.calls.all()[ 0 ].args[ 0 ]).toBe('effectOne')
		expect(addEffectToggle.default.calls.all()[ 1 ].args[ 0 ]).toBe('effectTwo')
	})

	it('does not add the effects if the container is already on the page', () => {
		spyOn(window.document, 'querySelector').and.returnValue({})

		addEffectToggles([ 'effectOne', 'effectTwo' ])

		expect(addEffectToggle.default).not.toHaveBeenCalled()
	})
})
