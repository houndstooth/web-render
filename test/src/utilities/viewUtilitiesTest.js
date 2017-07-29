import viewUtilities from '../../../src/utilities/viewUtilities'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import coordinatesMatch from '../helpers/coordinatesMatch'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

describe('view utilities', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200

	beforeEach(() => {
		resetStore(store)
		composeMainHoundstooth()
	})

	describe('#applyZoomAndScroll', () => {
		let coordinates
		let applyZoomAndScroll
		beforeEach(() => {
			coordinates = [
				[ 3, 5 ],
				[ 4, 5 ],
				[ 3, 4 ],
			]
			applyZoomAndScroll = viewUtilities.applyZoomAndScroll
		})

		it('adjusts the coordinates per the zoom level', () => {
			store.mainHoundstooth.basePattern.viewSettings.zoom = zoom

			expect(applyZoomAndScroll({ coordinates })).toEqual([
				[ 30, 50 ],
				[ 40, 50 ],
				[ 30, 40 ],
			])
		})

		describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
			beforeEach(() => {
				store.mainHoundstooth.basePattern.viewSettings.zoomOnCanvasCenter = true
				store.mainHoundstooth.basePattern.viewSettings.zoom = zoom
			})

			it('works', () => {
				store.mainHoundstooth.basePattern.viewSettings.canvasSize = canvasSize

				expect(applyZoomAndScroll({ coordinates })).toEqual([
					[ -870, -850 ],
					[ -860, -850 ],
					[ -870, -860 ],
				])
			})

			it('does not readjust for zooming on the center if it already is centered', () => {
				store.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress = true

				expect(applyZoomAndScroll({ coordinates })).toEqual([
					[ 405, 425 ],
					[ 415, 425 ],
					[ 405, 415 ],
				])
			})
		})

		describe('centering view on the center of the tile at grid address [ 0, 0 ]', () => {
			beforeEach(() => {
				store.mainHoundstooth.basePattern.viewSettings = {
					centerViewOnCenterOfTileAtZeroZeroAddress: true,
					zoom,
					canvasSize,
				}
				store.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting: tileSize }
			})

			it('adjusts per the zoom, tile, and canvas size', () => {
				store.mainHoundstooth.basePattern.viewSettings.zoom = zoom

				expect(applyZoomAndScroll({ coordinates })).toEqual([
					[
						3 * zoom + canvasSize / 2 - tileSize / 2,
						5 * zoom + canvasSize / 2 - tileSize / 2,
					],
					[
						4 * zoom + canvasSize / 2 - tileSize / 2,
						5 * zoom + canvasSize / 2 - tileSize / 2,
					],
					[
						3 * zoom + canvasSize / 2 - tileSize / 2,
						4 * zoom + canvasSize / 2 - tileSize / 2,
					],
				])
			})
		})
	})

	describe('#rotateCoordinatesAboutCanvasCenter', () => {
		it('works', () => {
			store.mainHoundstooth.basePattern.viewSettings.rotateViewAboutCanvasCenter = Math.PI / 2
			store.mainHoundstooth.basePattern.viewSettings.canvasSize = canvasSize
			const coordinates = [
				[ 0, 0 ],
				[ 40, 0 ],
				[ 0, 40 ],
			]

			const actualCoordinates = viewUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates })

			const expectedCoordinates = [
				[ 200, 0 ],
				[ 200, 40 ],
				[ 160, 0 ],
			]
			expect(coordinatesMatch(expectedCoordinates, actualCoordinates)).toBe(true)
		})

		it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
			const coordinates = [
				[ 0, 0 ],
				[ 0, 40 ],
				[ 40, 40 ],
			]

			const actualCoordinates = viewUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates })

			expect(actualCoordinates).toEqual(coordinates)
			expect(actualCoordinates).toBe(coordinates)
		})
	})
})