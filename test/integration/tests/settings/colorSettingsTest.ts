import { from, to } from '../../../../src'
import { Unit } from '../../../../src/components'
import { BLACK, BLUE, CYAN, MAGENTA, TRANSPARENT, YELLOW } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { AssignmentMode } from '../../../../src/index'
import { Color } from '../../../../src/render'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { Effect } from '../../../../src/store/types'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { pixelIsColorWithMarker } from '../../helpers/pixelIsColorWithMarker'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'
import { PixelColorExpectation, StandardTileExpectation } from '../../helpers/types'

describe('.colorSettings', () => {
	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')

	describe('.colorSet', () => {
		it('lets you change the colors of the pattern', () => {
			const sufficientTileCountToDemonstrateSetting: number = 2
			const houndstoothOverrides: Effect = {
				basePattern: {
					colorSettings: {
						colorSet: to.ColorSet([ YELLOW, BLUE ]),
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(pixelIsColorWithMarker({
				coordinateUnderTest: to.Coordinate([ 25, 75 ]),
				expectedColor: YELLOW,
				id: 1,
			})).toBe(true)
			expect(pixelIsColorWithMarker({
				coordinateUnderTest: to.Coordinate([ 75, 25 ]),
				expectedColor: BLUE,
				id: 2,
			})).toBe(true)
		})

		it('works for more than two colors', () => {
			const sufficientTileCountToDemonstrateSetting: number = 3
			const simplestWeaveToDemonstrateSetting: number[] = [ 0, 1, 2 ]
			const houndstoothOverrides: Effect = {
				basePattern: {
					colorSettings: {
						colorAssignmentSettings: {
							weave: {
								columns: simplestWeaveToDemonstrateSetting,
								rows: simplestWeaveToDemonstrateSetting,
							},
						},
						colorSet: to.ColorSet([ YELLOW, BLUE, CYAN ]),
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let baseId: number = -8
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ YELLOW, YELLOW ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ YELLOW, BLUE ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ YELLOW, CYAN ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
				tileSize,
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ BLUE, YELLOW ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ BLUE, BLUE ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ BLUE, CYAN ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
				tileSize,
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ CYAN, YELLOW ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ CYAN, BLUE ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ CYAN, CYAN ],
				tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
				tileSize,
			})).toBe(true)
		})
	})

	describe('.colorAssignmentSettings', () => {
		describe('.assignmentMode', () => {
			describe('weave', () => {
				it('is the simplest way to describe a pattern w/ colors not varied w/in its rows and columns', () => {
					const sufficientTileCountToDemonstrateSetting: number = 8
					const houndstoothOverrides: Effect = {
						basePattern: {
							colorSettings: {
								colorAssignmentSettings: {
									weave: {
										columns: [ 1, 0, 1 ],
										rows: [ 0, 1, 1, 0 ],
									},
								},
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting,
							},
							viewSettings: {
								canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
							},
						},
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					let baseId: number = -8
					const firstSuperweave: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
					]
					const secondSuperweave: StandardTileExpectation[] = [
						{
							baseId: 96,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: 104,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: 112,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: 120,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: 128,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: 136,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: 144,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: 152,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: 160,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: 168,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: 176,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: 184,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
					]
					const thirdSuperweave: StandardTileExpectation[] = [
						{
							baseId: 192,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 200,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 208,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 216,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 224,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 232,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 240,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 248,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 256,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 264,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
						{
							baseId: 272,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
						{
							baseId: 280,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
					]
					const fourthSuperweave: StandardTileExpectation[] = [
						{
							baseId: 288,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 296,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 304,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 4 ]),
							tileSize,
						},
						{
							baseId: 312,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 320,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 328,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 5 ]),
							tileSize,
						},
						{
							baseId: 336,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 344,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 352,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 6 ]),
							tileSize,
						},
						{
							baseId: 360,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
						{
							baseId: 368,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 4, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
						{
							baseId: 376,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 5, from.Unit(tileSize) * 7 ]),
							tileSize,
						},
					]
					const tiles: StandardTileExpectation[] = firstSuperweave
						.concat(secondSuperweave)
						.concat(thirdSuperweave)
						.concat(fourthSuperweave)
					tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))
				})
			})

			describe('supertile', () => {
				// tslint:disable-next-line:max-line-length
				it('assigns colors to tiles of patterns in any arbitrary way, repeating in a supertile of n by n tiles', () => {
					const sufficientTileCountToDemonstrateSetting: number = 4
					const houndstoothOverrides: Effect = {
						basePattern: {
							colorSettings: {
								colorAssignmentSettings: {
									assignmentMode: AssignmentMode.Supertile,
									supertile: to.Supertile([
										[
											[ 2, 0 ],
											[ 0, 1 ],
										],
										[
											[ 1, 2 ],
											[ 3, 3 ],
										],
									]),
								},
								colorSet: to.ColorSet([ YELLOW, BLUE, CYAN, MAGENTA ]),
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting,
							},
							viewSettings: {
								canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
							},
						},
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					let baseId: number = -8
					const firstSupertile: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ CYAN, YELLOW ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ YELLOW, BLUE ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLUE, CYAN ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
					]
					const secondSupertile: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ CYAN, YELLOW ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ YELLOW, BLUE ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLUE, CYAN ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 0 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
							tileSize,
						},
					]
					const thirdSupertile: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ CYAN, YELLOW ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ YELLOW, BLUE ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLUE, CYAN ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
					]
					const fourthSupertile: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ CYAN, YELLOW ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ YELLOW, BLUE ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ BLUE, CYAN ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 2 ]),
							tileSize,
						},
						{
							baseId: baseId += 8,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
							tileSize,
						},
					]
					const tiles: StandardTileExpectation[] = firstSupertile
						.concat(secondSupertile)
						.concat(thirdSupertile)
						.concat(fourthSupertile)
					tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))
				})
			})
		})

		describe('.switcheroo', () => {
			it('causes the two striped tiles to alternate by diagonal rather than rows/columns', () => {
				const sufficientTileCountToDemonstrateSetting: number = 8
				const houndstoothOverrides: Effect = {
					basePattern: {
						colorSettings: {
							colorAssignmentSettings: {
								switcheroo: true,
							},
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting,
						},
						viewSettings: {
							canvasSize: to.Px(sufficientTileCountToDemonstrateSetting * from.Unit(tileSize)),
						},
					},
				}

				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				let baseId: number = -8
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
					tileSize,
				})).toBe(true)

				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
					tileSize,
				})).toBe(true)
			})
		})

		describe('.flipGrain', () => {
			// tslint:disable-next-line:max-line-length
			it('rotates the stripes by 180 degrees, in effect (switching the colors if there are only two) reversing the grain of the pattern', () => {
				const sufficientTileCountToDemonstrateSetting: number = 2
				const houndstoothOverrides: Effect = {
					basePattern: {
						colorSettings: {
							colorAssignmentSettings: {
								flipGrain: true,
							},
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting,
						},
						viewSettings: {
							canvasSize: to.Px(sufficientTileCountToDemonstrateSetting * from.Unit(tileSize)),
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				let baseId: number = -8
				const tiles: StandardTileExpectation[] = [
					{
						baseId: baseId += 8,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
				]

				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	describe('.opacity', () => {
		it('affects the alpha of the pixels rendered', () => {
			const sufficientTileCountToDemonstrateSetting: number = 2
			const opacity: number = 0.5
			const houndstoothOverrides: Effect = {
				basePattern: {
					colorSettings: {
						colorSet: to.ColorSet([ BLACK, BLUE ]),
						opacity,
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const partiallySeeThroughBlack: Color = { r: BLACK.r, g: BLACK.g, b: BLACK.b, a: BLACK.a * opacity }
			const partiallySeeThroughBlue: Color = { r: BLUE.r, g: BLUE.g, b: BLUE.b, a: BLUE.a * opacity }

			const semiBlackPixel: PixelColorExpectation = {
				coordinateUnderTest: to.Coordinate([ 25, 75 ]),
				expectedColor: partiallySeeThroughBlack,
				id: 1,
			}
			expect(pixelIsColorWithMarker(semiBlackPixel)).toBe(true)
			const semiBluePixel: PixelColorExpectation = {
				coordinateUnderTest: to.Coordinate([ 75, 25 ]),
				expectedColor: partiallySeeThroughBlue,
				id: 2,
			}
			expect(pixelIsColorWithMarker(semiBluePixel)).toBe(true)
		})
	})

	describe('.backgroundColor', () => {
		it('paints it yellow', () => {
			const sufficientTileCountToDemonstrateSetting: number = 2
			const houndstoothOverrides: Effect = {
				basePattern: {
					colorSettings: {
						backgroundColor: YELLOW,
						colorSet: to.ColorSet([ BLACK, TRANSPARENT ]),
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: to.Px(from.Unit(tileSize) * sufficientTileCountToDemonstrateSetting),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const yellowPixel: PixelColorExpectation = {
				coordinateUnderTest: to.Coordinate([ 75, 25 ]),
				expectedColor: YELLOW,
				id: 1,
			}
			expect(pixelIsColorWithMarker(yellowPixel)).toBe(true)
		})
	})
})
