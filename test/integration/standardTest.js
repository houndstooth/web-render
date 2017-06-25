import 'jasmine'

import execute from '../../src/execute'
import ctx from '../../src/render/ctx'
import state from '../../src/state/state'
import { BLACK, TRANSPARENT } from '../../src/constants'

import _resetStatesForTest from '../_resetStatesForTest'
beforeEach(() => _resetStatesForTest({ 
    state: typeof state === 'undefined' ? {} : state, 
    iterations: typeof iterations === 'undefined' ? {} : iterations, 
    animations: typeof animations === 'undefined' ? {} : animations, 
}))

describe("Standard Houndstooth", () => {
	beforeEach(() => {
		state.tileConfig = {
			tileSize: 50,
			isTileUniform: null,
			getCoordinates: {
				whenTileIsUniform: null,
				whenTileIsMultiform: null
			}
		}
		state.gridConfig = {
			gridSize: 2
		}
		state.viewConfig = {
			canvasSize: 100,
			zoom: 1
		}
		state.colorConfig = {
			set: [ BLACK, TRANSPARENT ],
			assignment: {
				mode: 'WEAVE',
				weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
			},
			opacity: 1
		}
		state.stripeCountConfig = {
			mode: 'STANDARD',
			stripeCount: 4
		}
		state.baseStripeDiagonal = 'MINOR'

		execute({
			iterating: false,
			animating: false,
			exportFrames: false,
			performanceLogging: false
		})
	})

	it("has four stripes in a striped square", () => {
		expect(pixel(sectorCenter({ x: 0, y: 0, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })

		expect(pixel(sectorCenter({ x: 2, y: 0, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
		expect(pixel(sectorCenter({ x: 1, y: 1, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
		expect(pixel(sectorCenter({ x: 0, y: 2, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })

		expect(pixel(sectorCenter({ x: 3, y: 1, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })
		expect(pixel(sectorCenter({ x: 2, y: 2, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })
		expect(pixel(sectorCenter({ x: 1, y: 3, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })

		expect(pixel(sectorCenter({ x: 3, y: 3, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
	})

	it("repeats a 2x2 pattern of a solid black, solid white, and two b&w striped tiles", () => {

	})
})

const pixel = ([ x, y ]) => {
	const pixelData = ctx.getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255
	}
}

const sectorCenter = ({ x, y, n }) => {
	const sectorSize = state.tileConfig.tileSize / n
	return [ (x + 0.5) * sectorSize, (y + 0.5) * sectorSize ]
}
