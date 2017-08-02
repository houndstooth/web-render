import componentUtilities from '../../../src/utilities/componentUtilities'
import codeUtilities from '../../../src/utilities/codeUtilities'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import coordinatesMatch from '../helpers/coordinatesMatch'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

describe('component utilities', () => {
	let getSetForTile
	let settings
	const gridAddress = [ 3, 5 ]
	beforeEach(() => {
		resetStore(store)
		composeMainHoundstooth()
		getSetForTile = componentUtilities.getSetForTile
	})

	describe('#getSetForTile', () => {
		describe('assignment', () => {
			it('can use a weave-based assignment scheme and a grid address to choose the tile\'s set from the overall grid set', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})

			it('can use a supertile-based assignment scheme and a grid address to choose the tile\'s set from the overall grid set', () => {
				// expected set for the tile takes the indicies of the supertile entry
				// and maps them to entries in the set for grid
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]

				// expected enty is in the 3rd column, 5th row, per the grid address,
				// modulus the rank of this supertile
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('defaults', () => {
			it('defaults the set to a basic color set', () => {
				const expectedSetForTile = [ TRANSPARENT, BLACK ]
				settings = {
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 0 ],
							rows: [ undefined, 1 ],
						},
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})

			it('defaults assignment to a basic weave, binary alternating and offset', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				settings = { set: setForGrid }

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})

			describe('when the assignment settings are present', () => {
				describe('but the mode is missing from it', () => {
					it('defaults the mode setting individually to the default color settings assignment mode', () => {
						const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]
						settings = {
							set: setForGrid,
							assignment: {
								weave: {
									columns: [ undefined, 1 ],
									rows: [ undefined, undefined, 3 ],
								},
							},
						}

						expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
					})
				})

				describe('but weave is missing from it', () => {
					it('defaults the weave setting individually to the default color settings assignment weave', () => {
						const setForGrid = [ 'FIRST', 'SECOND' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]
						settings = {
							set: setForGrid,
							assignment: { assignmentMode: 'WEAVE' },
						}

						expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
					})
				})

				describe('but supertile is missing from it', () => {
					it('defaults the supertile setting individually to the default color settings assignment supertile', () => {
						const setForGrid = [ 'FIRST', 'SECOND' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]

						settings = {
							set: setForGrid,
							assignment: { assignmentMode: 'SUPERTILE' },
						}

						expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
					})
				})
			})
		})

		describe('address offset', () => {
			it('when in weave mode, it allows offsetting of the grid address', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 2 / 5 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						offsetAddress,
						weave: {
							columns: [ 1, undefined ],
							rows: [ undefined, 3, undefined ],
						},
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})

			it('when in supertile mode, it allows offsetting of the grid address', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 3 / 5 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						offsetAddress,
						supertile: [
							[ [], [] ],
							[ expectedSupertileEntry, [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('set for grid offset', () => {
			it('when in weave mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'THIRD', 'FIRST' ]
				const offsetSetForGridIndex = ({ gridAddress }) => gridAddress[ 0 ] + gridAddress[ 1 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						offsetSetForGridIndex,
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})

			it('when in supertile mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'SECOND', 'THIRD', 'THIRD', 'FIRST' ]
				const offsetSetForGridIndex = ({ gridAddress }) => gridAddress[ 0 ] + gridAddress[ 1 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						offsetSetForGridIndex,
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ gridAddress, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('re-ordering of chosen set', () => {
			it('can flip the grain of the houndstooth (by reversing the set)', () => {
				const notFlippedResult = getSetForTile({ gridAddress })
				settings = { assignment: { flipGrain: true } }

				expect(notFlippedResult.reverse()).toEqual(getSetForTile({ gridAddress, settings }))
			})

			it('can turn the grain of the pattern into switcheroo', () => {
				const setForGrid = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q' ]
				settings = {
					set: setForGrid,
					assignment: {
						switcheroo: true,
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
							[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 7, 8 ] ],
							[ [ 8, 9 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
							[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 15, 16 ] ],
						],
					},
				}
				const iterator = codeUtilities.iterator
				const addresses = iterator(4).map(x => iterator(4).map(y => [ x, y ]))
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetForTile({
					gridAddress,
					settings,
				})))

				const expectedSetsForTiles = [
					[ [ 'a', 'b' ], [ 'b', 'c' ], [ 'd', 'c' ], [ 'd', 'e' ] ],
					[ [ 'e', 'f' ], [ 'g', 'f' ], [ 'g', 'h' ], [ 'h', 'i' ] ],
					[ [ 'j', 'i' ], [ 'j', 'k' ], [ 'k', 'l' ], [ 'l', 'm' ] ],
					[ [ 'm', 'n' ], [ 'n', 'o' ], [ 'o', 'p' ], [ 'q', 'p' ] ],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})

			it('calls an arbitrary set transformation function if provided', () => {
				const transformAssignedSet = ({ setForTile, gridAddress }) => {
					return gridAddress[ 0 ] === 1 ? setForTile.concat(setForTile) : setForTile
				}
				settings = { assignment: { transformAssignedSet } }
				const iterator = codeUtilities.iterator
				const addresses = iterator(2).map(x => iterator(2).map(y => [ x, y ]))
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetForTile({
					gridAddress,
					settings,
				})))

				const expectedSetsForTiles = [
					[
						[ TRANSPARENT, BLACK ],
						[ BLACK, BLACK ],
					],
					[
						[ TRANSPARENT, TRANSPARENT, TRANSPARENT, TRANSPARENT ],
						[ BLACK, TRANSPARENT, BLACK, TRANSPARENT ],
					],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})
		})
	})

	describe('#rotateCoordinatesAboutCanvasCenter', () => {
		const coordinates = [
			[ 0, 0 ],
			[ 5, 0 ],
			[ 0, 5 ],
		]

		let rotateCoordinatesAboutCanvasCenter
		beforeEach(() => rotateCoordinatesAboutCanvasCenter = componentUtilities.rotateCoordinatesAboutCanvasCenter)

		describe('basePattern stripe diagonal', () => {
			describe('when principal', () => {
				beforeEach(() => {
					store.mainHoundstooth.basePattern.stripeSettings = {
						baseStripeDiagonal: 'PRINCIPAL',
					}
				})

				it('rotates the outline a quarter of the way around, about the shape\'s center', () => {
					const tileOrigin = [ 0, 0 ]
					const tileSize = 5

					const result = rotateCoordinatesAboutCanvasCenter({ coordinates, tileOrigin, tileSize })

					const expectedCoordinates = [
						[ 5, 0 ],
						[ 5, 5 ],
						[ 0, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
					}))
				})

				it('handles the situation where the center of the shape is outside its outline', () => {
					const tileOrigin = [ 0, 0 ]
					const tileSize = 10

					const result = rotateCoordinatesAboutCanvasCenter({ coordinates, tileOrigin, tileSize })

					const expectedCoordinates = [
						[ 10, 0 ],
						[ 10, 5 ],
						[ 5, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
					}))
				})

				it('handles the situation where the origin of the shape is outside its outline', () => {
					const tileOrigin = [ 5, 5 ]
					const tileSize = 5

					const actualCoordinates = rotateCoordinatesAboutCanvasCenter({ coordinates, tileOrigin, tileSize })

					const expectedCoordinates = [
						[ 15, 0 ],
						[ 15, 5 ],
						[ 10, 0 ],
					]
					expect(coordinatesMatch(expectedCoordinates, actualCoordinates)).toBe(true)
				})
			})

			it('defaults basePattern stripe diagonal to minor, i.e. no rotation', () => {
				const coordinates = [
					[ 0, 0 ],
					[ 5, 0 ],
					[ 0, 5 ],
				]
				const tileOrigin = [ 0, 0 ]
				const tileSize = 5

				expect(rotateCoordinatesAboutCanvasCenter({ coordinates, tileOrigin, tileSize })).toEqual(coordinates)
			})
		})
	})

	describe('#getTileOriginAndSize', () => {
		const gridAddress = [ 7, 11 ]
		const tileSizeSetting = 40
		let getTileOriginAndSize
		beforeEach(() => getTileOriginAndSize = componentUtilities.getTileOriginAndSize)

		it('returns the tile size, and scales the grid address by it to get the origin', () => {
			store.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

			expect(getTileOriginAndSize({ gridAddress })).toEqual({
				tileSize: tileSizeSetting,
				tileOrigin: [ 7 * tileSizeSetting, 11 * tileSizeSetting ],
			})
		})

		it('uses a custom get tile origin and sized unit function if provided', () => {
			const custom = ({ gridAddress }) => ({
				tileSize: tileSizeSetting * tileSizeSetting,
				tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting, gridAddress[ 0 ] * tileSizeSetting ],
			})
			store.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize = custom

			expect(getTileOriginAndSize({ gridAddress })).toEqual({
				tileSize: tileSizeSetting * tileSizeSetting,
				tileOrigin: [ 11 * tileSizeSetting, 7 * tileSizeSetting ],
			})
		})
	})

	describe('#distanceFromZeroZeroAddress', () => {
		let distanceFromZeroZeroAddress
		beforeEach(() => distanceFromZeroZeroAddress = componentUtilities.distanceFromZeroZeroAddress)

		it('gives the distance, in address positions, from grid address 0, 0', () => {
			expect(distanceFromZeroZeroAddress({ gridAddress: [ 0, 0 ] })).toBe(0)
			expect(distanceFromZeroZeroAddress({ gridAddress: [ 3, 0 ] })).toBe(3)
			expect(distanceFromZeroZeroAddress({ gridAddress: [ 0, 5 ] })).toBe(5)
			expect(distanceFromZeroZeroAddress({ gridAddress: [ 2, 7 ] })).toBe(9)
		})

		it('works for addresses of more than 2 dimensions', () => {
			expect(distanceFromZeroZeroAddress({ gridAddress: [ 1, 2, 3 ] })).toBe(6)
		})

		it('gives absolute distance, so it works for addresses with negative values', () => {
			expect(distanceFromZeroZeroAddress({ gridAddress: [ -3, -2 ] })).toBe(5)
			expect(distanceFromZeroZeroAddress({ gridAddress: [ -3, 2 ] })).toBe(5)
		})
	})

	describe('gather options', () => {
		let gridAddress
		beforeEach(() => {
			resetStore(store)
			gridAddress = [ 3, 5 ]
		})

		it('calls every options gathering function with the grid address, saving each result onto an object it returns', () => {
			store.mainHoundstooth.basePattern.gatherOptions = {
				optionOne: ({ gridAddress }) => ({ resultOne: [ gridAddress[ 0 ] + 1, gridAddress[ 1 ] + 1 ] }),
				optionTwo: ({ gridAddress }) => ({ resultTwo: [ gridAddress[ 0 ] - 1, gridAddress[ 1 ] - 1 ] }),
			}

			const options = componentUtilities.gatherOptions({ gridAddress })

			const expectedOptions = {
				resultOne: [ 4, 6 ],
				resultTwo: [ 2, 4 ],
			}
			expect(options).toEqual(expectedOptions)
		})

		it('if there are no options gathering functions, options should be empty', () => {
			const options = componentUtilities.gatherOptions({ gridAddress })

			expect(options).toEqual({})
		})
	})
})
