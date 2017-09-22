import state from '../../state'
import deleteElementIfExists from './deleteElementIfExists'
import { getCanvasSize } from '../canvas'

const createMixedDownCanvas = () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasSize = getCanvasSize()
	mixedDownCanvas.width = canvasSize[ 0 ]
	mixedDownCanvas.height = canvasSize[ 1 ]

	mixedDownCanvas.style.display = 'none'

	state.mixedDownContext = mixedDownCanvas.getContext('2d')
}

export default createMixedDownCanvas
