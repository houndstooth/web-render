import { InputElement } from '../../../../../src/app/page'
import { createCheckbox } from '../../../../../src/app/page/createCheckbox'
import * as ui from '../../../../../src/app/ui'
import { Effect } from '../../../../../src/pattern'
import { documentWrapper } from '../../../../../src/utilities'
import { noop } from '../../../../../src/utilities/noop'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('create checkbox', () => {
	let returnedCheckbox: InputElement
	let checkbox: InputElement
	const classList: string[] = []
	const attributeObject: { type: string } = { type: '' }
	const clickHandler: NullarySideEffector = noop
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		checkbox = buildMockElement({ classList, attributeObject }) as InputElement
		spyOn(documentWrapper, 'createElement').and.returnValue(checkbox)

		spyOn(ui, 'buildEffectToggleClickHandler').and.returnValue(clickHandler)

		returnedCheckbox = createCheckbox({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(checkbox)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(ui.buildEffectToggleClickHandler).toHaveBeenCalledWith({
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