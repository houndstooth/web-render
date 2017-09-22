import insertElementRightAfter from './insertElementRightAfter'
import createEffectTogglesContainer from './createEffectTogglesContainer'

const createWarningsContainer = () => {
	const warnings = document.createElement('div')
	warnings.classList.add('warnings-container')
	warnings.style.padding = '20px'

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	insertElementRightAfter(warnings, effectTogglesContainer)

	return warnings
}

export default createWarningsContainer
