import { state } from '../state'
import { defaults } from '../store'
import { document } from '../utilities/windowWrapper'
import { deleteElementIfExists } from './deleteElementIfExists'
import { Context } from './types'

const createMixedDownCanvas: () => Context = () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const { canvasSize = defaults.DEFAULT_CANVAS_SIZE } = state.mainHoundstooth.basePattern.viewSettings || {}
	mixedDownCanvas.width = canvasSize
	mixedDownCanvas.height = canvasSize

	mixedDownCanvas.style.display = 'none'

	return mixedDownCanvas.getContext('2d')
}

// tslint:disable-next-line:no-default-export
export default createMixedDownCanvas
