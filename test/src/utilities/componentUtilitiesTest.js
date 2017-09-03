import componentUtilities from '../../../src/utilities/componentUtilities'
import codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import coordinatesMatch from '../helpers/coordinatesMatch'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('component utilities', () => {
	beforeEach(() => {
		resetStore(store)
		composeMainHoundstooth()
	})

	describe('#getSetIndicesForTile', () => {
		let getSetIndicesForTile
		let settings
		const gridAddress = [ 3, 5 ]

		beforeEach(() => getSetIndicesForTile = componentUtilities.getSetIndicesForTile)

		describe('assignment', () => {
			it('can use a weave-based assignment scheme and a grid address to choose the indices of the tile\'s set to later get stuff from', () => {
				settings = {
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 3, 1 ])
			})

			it('can use a supertile-based assignment scheme and a grid address to choose the tile\'s set from the overall grid set', () => {
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]

				settings = {
					assignment: {
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual(expectedSupertileEntry)
			})
		})

		describe('defaults', () => {
			it('defaults the set to a basic color set', () => {
				expect(getSetIndicesForTile({ gridAddress })).toEqual([ 0, 1 ])
			})

			describe('when the assignment settings are present', () => {
				describe('but the mode is missing from it', () => {
					it('defaults the mode setting individually to the default color settings assignment mode', () => {
						settings = {
							assignment: {
								weave: {
									columns: [ undefined, 1 ],
									rows: [ undefined, undefined, 3 ],
								},
							},
						}

						expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 3, 1 ])
					})
				})

				describe('but weave is missing from it', () => {
					it('defaults the weave setting individually to the default color settings assignment weave', () => {
						settings = { assignment: { assignmentMode: 'WEAVE' } }

						expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 0, 1 ])
					})
				})

				describe('but supertile is missing from it', () => {
					it('defaults the supertile setting individually to the default color settings assignment supertile', () => {
						settings = { assignment: { assignmentMode: 'SUPERTILE' } }

						expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 0, 1 ])
					})
				})
			})
		})

		describe('address offset', () => {
			it('when in weave mode, it allows offsetting of the grid address', () => {
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 2 / 5 ]
				settings = {
					assignment: {
						assignmentMode: 'WEAVE',
						offsetAddress,
						weave: {
							columns: [ 1, undefined ],
							rows: [ undefined, 3, undefined ],
						},
					},
				}

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 3, 1 ])
			})

			it('when in supertile mode, it allows offsetting of the grid address', () => {
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 3 / 5 ]
				settings = {
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

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual(expectedSupertileEntry)
			})
		})

		describe('set for grid offset', () => {
			it('when in weave mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const offsetSetForGridIndex = ({ gridAddress }) => gridAddress[ 0 ] + gridAddress[ 1 ]
				settings = {
					assignment: {
						assignmentMode: 'WEAVE',
						offsetSetForGridIndex,
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([ 3 + 3 + 5, 1 + 3 + 5 ])
			})

			it('when in supertile mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const offsetSetForGridIndex = ({ gridAddress }) => gridAddress[ 0 ] + gridAddress[ 1 ]
				settings = {
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

				expect(getSetIndicesForTile({ gridAddress, settings })).toEqual([
					2 + 3 + 5,
					3 + 3 + 5,
					0 + 3 + 5,
					1 + 3 + 5,
				])
			})
		})

		describe('re-ordering of chosen set', () => {
			it('can flip the grain of the houndstooth (by reversing the set)', () => {
				const notFlippedResult = getSetIndicesForTile({ gridAddress })
				settings = { assignment: { flipGrain: true } }

				expect(notFlippedResult.reverse()).toEqual(getSetIndicesForTile({ gridAddress, settings }))
			})

			it('can turn the grain of the pattern into switcheroo', () => {
				settings = {
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
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetIndicesForTile({
					gridAddress,
					settings,
				})))

				const expectedSetsForTiles = [
					[ [ 0, 1 ], [ 1, 2 ], [ 3, 2 ], [ 3, 4 ] ],
					[ [ 4, 5 ], [ 6, 5 ], [ 6, 7 ], [ 7, 8 ] ],
					[ [ 9, 8 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
					[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 16, 15 ] ],
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
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetIndicesForTile({
					gridAddress,
					settings,
				})))

				const expectedSetsForTiles = [
					[
						[ 1, 0 ],
						[ 0, 0 ],
					],
					[
						[ 1, 1, 1, 1 ],
						[ 0, 1, 0, 1 ],
					],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})
		})
	})

	describe('#rotateCoordinatesAboutTileCenter', () => {
		const coordinates = [
			[ 0, 0 ],
			[ 5, 0 ],
			[ 0, 5 ],
		]

		let rotateCoordinatesAboutTileCenter
		beforeEach(() => rotateCoordinatesAboutTileCenter = componentUtilities.rotateCoordinatesAboutTileCenter)

		describe('basePattern stripe diagonal', () => {
			describe('when principal', () => {
				beforeEach(() => {
					store.mainHoundstooth.basePattern.stripeSettings = {
						baseStripeDiagonal: 'PRINCIPAL',
					}
				})

				it('rotates the outline a quarter of the way around, about the tile\'s center', () => {
					const tileOrigin = [ 0, 0 ]
					const tileSize = 5

					const result = rotateCoordinatesAboutTileCenter({ coordinates, tileOrigin, tileSize })

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

					const result = rotateCoordinatesAboutTileCenter({ coordinates, tileOrigin, tileSize })

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

					const actualCoordinates = rotateCoordinatesAboutTileCenter({ coordinates, tileOrigin, tileSize })

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

				expect(rotateCoordinatesAboutTileCenter({ coordinates, tileOrigin, tileSize })).toEqual(coordinates)
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

	describe('#tileCenter', () => {
		let tileCenter
		beforeEach(() => tileCenter = componentUtilities.tileCenter)

		it('finds the center of the tile', () => {
			const tileOrigin = [ 12, 14 ]
			const tileSize = 3
			expect(tileCenter({ tileOrigin, tileSize })).toEqual([ 13.5, 15.5 ])
		})
	})
})
