import { createEffectToggle, createEffectToggles, documentWrapper, NamedEffect, PageElement } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

const subject: (_: NamedEffect[]) => void = createEffectToggles.default

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	const children: PageElement[] = []
	const effectTogglesContainer: PageElement = buildMockElement({ children })
	const attributeObject: { id: string } = { id: '' }
	const moreEffectsMessage: PageElement = buildMockElement({ attributeObject })
	beforeEach(() => {
		createEffectToggleSpy = spyOn(createEffectToggle, 'default')
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(documentWrapper, 'createElement').and.returnValue(moreEffectsMessage)
	})

	it('adds an effect toggle for each effect', () => {
		subject([
			{ name: 'effectOne', description: '' },
			{ name: 'effectTwo', description: '' },
		])

		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ].name).toBe('effectOne')
		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ].name).toBe('effectTwo')
	})

	it('clears any existing toggles', () => {
		subject([])

		expect(effectTogglesContainer.innerHTML).toBe('')
	})

	it('adds a message about more effects coming soon', () => {
		subject([])

		expect(children[0]).toBe(moreEffectsMessage)
	})

	it('adds an id to that message so that it can be styled', () => {
		subject([])

		expect(attributeObject.id).toBe('more-effects-soon-message')
	})
})