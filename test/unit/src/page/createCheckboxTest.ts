import { InputElement } from '../../../../src/page'
import { createCheckbox } from '../../../../src/page/createCheckbox'
import { Effect } from '../../../../src/store/types'
import * as buildEffectToggleClickHandler from '../../../../src/ui/buildEffectToggleClickHandler'
import { NullarySideEffector } from '../../../../src/utilities/types'
import * as window from '../../../../src/utilities/windowWrapper'
import { noop } from '../../../helpers/noop'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create checkbox', () => {
	let returnedCheckbox: InputElement
	let checkbox: InputElement
	const classList: string[] = []
	const attributeObject: { type: string } = { type: '' }
	const clickHandler: NullarySideEffector = noop
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		checkbox = buildMockElement({ classList, attributeObject }) as InputElement
		spyOn(window.document, 'createElement').and.returnValue(checkbox)

		spyOn(buildEffectToggleClickHandler, 'buildEffectToggleClickHandler').and.returnValue(clickHandler)

		returnedCheckbox = createCheckbox({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(checkbox)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(buildEffectToggleClickHandler.buildEffectToggleClickHandler).toHaveBeenCalledWith({
			checkbox,
			houndstoothEffect,
		})
	})

	it('gives the checkbox a class which is the kebab-cased version of the houndstooth effect\'s name', () => {
		expect(classList[ 0 ]).toBe('mock-tooth')
	})

	it('assigns a click handler to the checkbox', () => {
		expect(returnedCheckbox.onclick).toBe(clickHandler)
	})

	it('sets the type to checkbox', () => {
		expect(attributeObject.type).toBe('checkbox')
	})
})