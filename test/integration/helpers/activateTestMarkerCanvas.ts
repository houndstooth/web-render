import state from '../../../src/state'
import scaleElement from '../../../src/page/scaleElement'
import getCanvasDimensions from '../../../src/canvas/getCanvasDimensions'
import createCanvasContainer from '../../../src/page/createCanvasContainer'
import testMarkersClear from './testMarkersClear'
import createTestMarkersCanvas from './createTestMarkersCanvas'

const prepareCanvasForDisplayInTest = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

const activateTestMarkersCanvas = () => {
	testMarkersClear()

	const testMarkersCanvas: any = document.querySelector('.test-markers-canvas') || createTestMarkersCanvas()

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = 9001

	const canvasDimensions = getCanvasDimensions()
	testMarkersCanvas.width = canvasDimensions[ 0 ]
	testMarkersCanvas.height = canvasDimensions[ 1 ]

	const testCanvasDisplayArea: any = document.querySelector('.test-canvas-display-area')
	testCanvasDisplayArea.style.display = 'block'

	scaleElement({ element: testCanvasDisplayArea, dimensions: canvasDimensions })

	const existingCanvasContainer = document.querySelector('.canvas-container')
	const canvasContainer = existingCanvasContainer || createCanvasContainer({ canvasDimensions })
	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}

export default activateTestMarkersCanvas
