import {
	appState,
	createOverrideLeaf,
	createOverrideParent,
	mapOverPattern,
	updateOverrides,
} from '../../../../../../src/indexForTest'
import buildMockElement from '../../../../helpers/buildMockElement'

describe('update override', () => {
	let subject: () => void
	let children: HTMLElement[]
	beforeEach(() => {
		children = []
		subject = updateOverrides.default
		spyOn(mapOverPattern, 'default')
		appState.dom.overridesContainer = buildMockElement({ children }) as HTMLElement

		subject()
	})

	it('resets the override', () => {
		expect(appState.dom.overridesContainer.innerHTML).toBe('')
	})

	it('for each pattern, creates a node for every parent of setting and a node w input for every setting leaf', () => {
		expect(mapOverPattern.default).toHaveBeenCalledWith({
			options: { parent: children[0], grandparents: [] },
			patternName: 'basePattern',
			perLeaf: createOverrideLeaf.default,
			perParent: createOverrideParent.default,
		})
		expect(mapOverPattern.default).toHaveBeenCalledWith({
			options: { parent: children[1], grandparents: [] },
			patternName: 'animationsPattern',
			perLeaf: createOverrideLeaf.default,
			perParent: createOverrideParent.default,
		})
		expect(mapOverPattern.default).toHaveBeenCalledWith({
			options: { parent: children[2], grandparents: [] },
			patternName: 'layersPattern',
			perLeaf: createOverrideLeaf.default,
			perParent: createOverrideParent.default,
		})
	})

	it('creates headers for each of the patterns', () => {
		expect(children.length).toBe(3)
		expect(children[0].innerHTML).toBe('basePattern')
		expect(children[1].innerHTML).toBe('animationsPattern')
		expect(children[2].innerHTML).toBe('layersPattern')
	})
})