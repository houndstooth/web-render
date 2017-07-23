import execute from '../../../src/application/execute'
import composeMainHoundstooth from '../../../src/state/composeMainHoundstooth'
import standardTileIsColors from '../helpers/standardTileIsColors'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import settingsPaths from '../../helpers/settingsPaths'
import store from '../../../store'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('.stripeSettings', () => {
	const tileSizeInPixels = getFromBasePatternOrDefault(settingsPaths.TILE_SIZE)
	beforeEach(() => store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE))

	describe('.stripePositionSettings', () => {
		describe('.stripeCountMode', () => {
			let houndstoothOverrides
			beforeEach(() => {
				houndstoothOverrides = {
					basePattern: {
						viewSettings: { canvasSize: tileSizeInPixels },
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: undefined,
							},
						},
					},
				}
			})

			it('works in standard mode', () => {
				composeMainHoundstooth({ houndstoothEffects: [], houndstoothOverrides })
				activateTestMarkerCanvas()

				execute()

				const tile = {
					baseId: 0,
					originInPixels: [ 0, 0 ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, BLACK ],
				}
				expect(standardTileIsColors(tile)).toBe(true)
			})

			it('works in gingham mode', () => {
				houndstoothOverrides.basePattern.stripeSettings.stripePositionSettings.stripeCountMode = 'GINGHAM'
				composeMainHoundstooth({ houndstoothEffects: [], houndstoothOverrides })
				activateTestMarkerCanvas()

				execute()

				const HALF_TRANSPARENT_BLACK = { r: 0, g: 0, b: 0, a: 0.5 }
				const tile = {
					baseId: 0,
					originInPixels: [ 0, 0 ],
					tileSizeInPixels,
					colors: [ HALF_TRANSPARENT_BLACK, HALF_TRANSPARENT_BLACK ],
				}
				expect(standardTileIsColors(tile)).toBe(true)
			})
		})

		describe('.stripeCount', () => {
			it('changes the number of stripes in striped tiles', () => {
				composeMainHoundstooth({
					houndstoothEffects: [],
					houndstoothOverrides: {
						basePattern: {
							gridSettings: { gridSize: 2 },
							stripeSettings: {
								stripePositionSettings: {
									stripeCount: 5,
								},
							},
						},
					},
				})
				activateTestMarkerCanvas()
				execute()

				let originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]
				expect(tileSectorCenterIsColor({
					id: 1,
					originInPixels,
					tileSizeInPixels,
					x: 0,
					y: 0,
					n: 5,
					color: TRANSPARENT,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 2,
					originInPixels,
					tileSizeInPixels,
					x: 1,
					y: 1,
					n: 5,
					color: BLACK,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 3,
					originInPixels,
					tileSizeInPixels,
					x: 2,
					y: 2,
					n: 5,
					color: TRANSPARENT,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 4,
					originInPixels,
					tileSizeInPixels,
					x: 3,
					y: 3,
					n: 5,
					color: BLACK,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 5,
					originInPixels,
					tileSizeInPixels,
					x: 4,
					y: 4,
					n: 5,
					color: TRANSPARENT,
				})).toBe(true)

				originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]
				expect(tileSectorCenterIsColor({
					id: 6,
					originInPixels,
					tileSizeInPixels,
					x: 0,
					y: 0,
					n: 5,
					color: BLACK,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 7,
					originInPixels,
					tileSizeInPixels,
					x: 1,
					y: 1,
					n: 5,
					color: TRANSPARENT,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 8,
					originInPixels,
					tileSizeInPixels,
					x: 2,
					y: 2,
					n: 5,
					color: BLACK,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 9,
					originInPixels,
					tileSizeInPixels,
					x: 3,
					y: 3,
					n: 5,
					color: TRANSPARENT,
				})).toBe(true)
				expect(tileSectorCenterIsColor({
					id: 10,
					originInPixels,
					tileSizeInPixels,
					x: 4,
					y: 4,
					n: 5,
					color: BLACK,
				})).toBe(true)
			})
		})
	})

	describe('.baseStripeDiagonal', () => {
		it('can be set to principal, to change the orientation of the stripes', () => {
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						stripeSettings: {
							baseStripeDiagonal: 'PRINCIPAL',
						},
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			let originInPixels
			const tileSizeInPixels = store.currentState.mainHoundstooth.basePattern.tileSettings.tileSize

			originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]

			expect(tileSectorCenterIsColor({
				id: 1,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 2,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 3,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 4,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 5,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 6,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 7,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 8,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)


			originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]

			expect(tileSectorCenterIsColor({
				id: 9,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 10,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 11,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 12,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 13,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 14,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 15,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 16,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
		})
	})
})
