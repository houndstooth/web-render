import buildEffectToggleClickHandler from '../../../src/controls/buildEffectToggleClickHandler'
import state from '../../../state'
import execute from '../../../src/execute'

describe('build effect toggle click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy = jasmine.createSpy()
		buildEffectToggleClickHandler.__Rewire__('resetInterface', resetInterfaceSpy)

		const executeSelectedHoundstoothEffectsSpy = spyOn(execute, 'executeSelectedHoundstoothEffects')

		const checkbox = document.createElement('input')
		checkbox.setAttribute('type', 'checkbox')

		const mockHoundstoothEffect = { name: 'mock tooth' }

		const clickHandler = buildEffectToggleClickHandler(checkbox, mockHoundstoothEffect)

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, mockHoundstoothEffect ])

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		executeSelectedHoundstoothEffectsSpy.calls.reset()

		// to confirm that it preserves the order otherwise when removing an effect
		const otherHoundstoothEffect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox, clickHandler) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
