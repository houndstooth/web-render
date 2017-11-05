import { InputElement, PageElement } from '../../../../src/page'
import * as createCheckbox from '../../../../src/page/createCheckbox'
import { createLabel } from '../../../../src/page/createLabel'
import { LabelElement } from '../../../../src/page/types'
import { Effect } from '../../../../src/store/types'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create label', () => {
	let returnedLabel: LabelElement
	let label: PageElement
	const children: LabelElement[] = []
	const checkbox: InputElement = buildMockElement()
	const name: PageElement = buildMockElement()
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		label = buildMockElement({ children })
		spyOn(window.document, 'createElement').and.returnValue(label)

		spyOn(window.document, 'createTextNode').and.returnValue(name)

		spyOn(createCheckbox, 'createCheckbox').and.returnValue(checkbox)

		returnedLabel = createLabel({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(label)
	})

	it('adds one checkbox to the label', () => {
		expect(children[ 0 ]).toBe(checkbox as PageElement)
	})

	it('adds one name to the label, after the checkbox', () => {
		expect(children[ 1 ]).toBe(name)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(createCheckbox.createCheckbox).toHaveBeenCalledWith({ houndstoothEffect })
	})

	it('makes the name using the houndstooth effect\'s name', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(window.document.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})