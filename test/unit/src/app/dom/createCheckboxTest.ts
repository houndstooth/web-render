import {
	buildEffectToggleClickHandler,
	createCheckbox,
	documentWrapper,
	InputElement,
	NamedEffect,
	noop,
	NullarySideEffector,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (_: { effect: NamedEffect }) => InputElement = createCheckbox.default

describe('create checkbox', () => {
	let returnedCheckbox: InputElement
	let checkbox: InputElement

	const attributeObject: { id: string, name: string, type: string } = { id: '', name: '', type: '' }
	const clickHandler: NullarySideEffector = noop.default
	const effect: NamedEffect = { name: 'mock tooth', description: '' }

	beforeEach(() => {
		checkbox = buildMockElement({ attributeObject }) as InputElement
		spyOn(documentWrapper, 'createElement').and.returnValue(checkbox)

		spyOn(buildEffectToggleClickHandler, 'default').and.returnValue(clickHandler)

		returnedCheckbox = subject({ effect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(checkbox)
	})

	it('makes the checkbox using the effect', () => {
		expect(buildEffectToggleClickHandler.default).toHaveBeenCalledWith({
			checkbox,
			effect,
		})
	})

	it('sets the id to a kebab-cased version of the effect\'s name', () => {
		expect(attributeObject.id).toBe('mock-tooth')
	})

	it('sets the name to a kebab-cased version of the effect\'s name', () => {
		expect(attributeObject.name).toBe('mock-tooth')
	})

	it('assigns a click handler to the checkbox', () => {
		expect(returnedCheckbox.onclick).toBe(clickHandler)
	})

	it('sets the type to checkbox', () => {
		expect(attributeObject.type).toBe('checkbox')
	})
})