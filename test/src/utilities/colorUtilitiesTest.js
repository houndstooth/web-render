import colorUtilities from '../../../src/utilities/colorUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('color utilities', () => {
	beforeEach(() => resetStore(store))

	describe('#getColorsForTile', () => {
		it('defaults to the basePattern color settings on the settings', () => {
			const gridAddress = []
			spyOn(componentUtilities, 'getSetForTile')
			const defaultColorSettings = { importantThing: 'boingo' }
			store.mainHoundstooth.basePattern.colorSettings = defaultColorSettings

			colorUtilities.getColorsForTile({ gridAddress })

			expect(componentUtilities.getSetForTile.calls.all()[ 0 ].args[ 0 ]).toEqual({
				gridAddress,
				settings: defaultColorSettings,
			})
		})

		it('returns the tile colors gotten from the grid utilities', () => {
			const tileColors = []
			spyOn(componentUtilities, 'getSetForTile').and.returnValue(tileColors)

			const result = colorUtilities.getColorsForTile({ gridAddress: [] })

			expect(result).toEqual(tileColors)
		})

		it('mixes the colors if in gingham mode, returning it as a single-element array', () => {
			const tileColors = [
				{ r: 1, g: 2, b: 50, a: 1 },
				{ r: 3, g: 2, b: 0, a: 0.5 },
			]
			spyOn(componentUtilities, 'getSetForTile').and.returnValue(tileColors)
			store.mainHoundstooth.basePattern.stripeSettings = {
				stripePositionSettings: {
					stripeCountMode: 'GINGHAM',
				},
			}

			const result = colorUtilities.getColorsForTile({ gridAddress: [] })

			const mixedColor = [ { r: 2, g: 2, b: 25, a: 0.75 } ]
			expect(result).toEqual(mixedColor)
		})
	})

	describe('#parseColor', () => {
		it('converts a color object into a canvas-readable string', () => {
			const colorObject = { r: 150, g: 100, b: 50, a: 0.5 }
			const expectedColorString = 'rgba(150,100,50,0.5)'
			expect(colorUtilities.parseColor(colorObject)).toBe(expectedColorString)
		})
	})

	describe('#allColorsAreTheSame', () => {
		it('returns true if all of the colors in the list are the same', () => {
			const colors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(true)
		})

		it('returns false if any of the colors in the list are different', () => {
			const colors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(false)
		})

		it('returns false if all of the colors in the list are different', () => {
			const colors = [
				{ r: 153, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 52, a: 0.5 },
				{ r: 150, g: 144, b: 50, a: 0.7 },
				{ r: 151, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 104, b: 50, a: 0.6 },
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(false)
		})
	})

	describe('#isTileUniform', () => {
		it('returns true if all of the tile colors are the same', () => {
			const tileColors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
			]
			expect(colorUtilities.isTileUniform({ tileColors })).toBe(true)
		})

		it('returns false if any of the tile colors are different', () => {
			const tileColors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
			]
			expect(colorUtilities.isTileUniform({ tileColors })).toBe(false)
		})

		it('returns false if all of the tile colors are different', () => {
			const tileColors = [
				{ r: 153, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 52, a: 0.5 },
				{ r: 150, g: 144, b: 50, a: 0.7 },
				{ r: 151, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 104, b: 50, a: 0.6 },
			]
			expect(colorUtilities.isTileUniform({ tileColors })).toBe(false)
		})
	})
})
