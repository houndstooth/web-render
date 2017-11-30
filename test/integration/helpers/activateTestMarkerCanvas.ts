// tslint:disable:no-any no-unsafe-any max-line-length

import {
	Canvas,
	getSetting,
	NullarySideEffector,
	PageElement,
	Px,
	resetMixedDownContext,
	scaleElement,
	to,
} from '../../../src'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import testMarkersClear from './testMarkersClear'

const activateTestMarkerCanvas: NullarySideEffector =
	(): void => {
		testMarkersClear()

		const canvasSize: Px = getSetting.default('canvasSize')

		const testMarkersCanvas: Canvas = document.querySelector('#test-markers-canvas') as HTMLCanvasElement || createTestMarkersCanvas()
		testMarkersCanvas.style.position = 'absolute'
		testMarkersCanvas.style.zIndex = '9001'
		testMarkersCanvas.width = canvasSize
		testMarkersCanvas.height = canvasSize

		const testCanvasDisplayArea: PageElement = document.querySelector('#test-canvas-display-area') as HTMLElement || document.createElement('div')
		if (testCanvasDisplayArea.style) {
			testCanvasDisplayArea.style.display = 'block'
			scaleElement.default({ element: testCanvasDisplayArea, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })
		}

		const canvasContainer: PageElement = document.querySelector('#canvas-container') as PageElement || document.createElement('div')
		canvasContainer.setAttribute('id', 'canvas-container')
		canvasContainer.style.position = 'absolute'
		testCanvasDisplayArea.appendChild(canvasContainer)
		scaleElement.default({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

		const mixedDownCanvas: Canvas = document.querySelector('#mixed-down-canvas') as HTMLCanvasElement || document.createElement('canvas')
		mixedDownCanvas.setAttribute('id', 'mixed-down-canvas')
		testCanvasDisplayArea.appendChild(mixedDownCanvas)
		resetMixedDownContext.default()
	}

export default activateTestMarkerCanvas
