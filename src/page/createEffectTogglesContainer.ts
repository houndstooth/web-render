import { document } from '../utilities/windowWrapper'
import createCanvasContainer from './createCanvasContainer'
import insertElementRightAfter from './insertElementRightAfter'

const createEffectTogglesContainer = () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer()
	insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}

export default createEffectTogglesContainer
