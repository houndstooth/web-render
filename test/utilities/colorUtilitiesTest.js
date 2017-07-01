import colorUtilities from '../../src/utilities/colorUtilities'
import gridUtilities from '../../src/utilities/gridUtilities'

describe('color utilities', () => {
	describe('#getColorsForTile', () => {
		it('defaults to the initial color config on the settings', () => {
			const address = []
			spyOn(gridUtilities, 'getSetForTile')
			const defaultConfig = { importantThing: 'boingo' }
			settings.initial.colorConfig = defaultConfig

			colorUtilities.getColorsForTile({ address })

			expect(gridUtilities.getSetForTile.calls.all()[0].args[0]).toEqual(
				{ address, config: defaultConfig }
			)
		})

		it('returns the tile colors gotten from the grid utilities', () => {
			const tileColors = []
			spyOn(gridUtilities, 'getSetForTile').and.returnValue(tileColors)

			const result = colorUtilities.getColorsForTile({ address: [] })

			expect(result).toEqual(tileColors)
		})

		it('mixes the colors if in gingham mode, returning it as a single-element array', () => {
			const tileColors = [
				{ r: 1, g: 2, b: 50, a: 1 },
				{ r: 3, g: 2, b: 0, a: 0.5 },
			]
			spyOn(gridUtilities, 'getSetForTile').and.returnValue(tileColors)
			settings.initial.stripeCountConfig = { mode: 'GINGHAM' }

			const result = colorUtilities.getColorsForTile({ address: [] })

			const mixedColor = [ { r: 2, g: 2, b: 25, a: 0.75 } ]
			expect(result).toEqual(mixedColor)
		})

		describe('fading colors', () => {
			it('fades colors using opacity', () => {
				const colorConfig = { opacity: 0.5 }
				const tileColors = [
					{ r: 1, g: 2, b: 3, a: 1 },
					{ r: 3, g: 2, b: 1, a: 0.5 },
				]
				spyOn(gridUtilities, 'getSetForTile').and.returnValue(tileColors)

				const result = colorUtilities.getColorsForTile({ address: [], colorConfig })

				const fadedTileColors = [
					{ r: 1, g: 2, b: 3, a: 0.5 },
					{ r: 3, g: 2, b: 1, a: 0.25 },
				]
				expect(result).toEqual(fadedTileColors)
			})

			it('defaults opacity to not opaque', () => {
				const colorConfig = { stuffBesidesOpacity: 'mcmyeah' }
				const tileColors = [
					{ r: 1, g: 2, b: 3, a: 1 },
					{ r: 3, g: 2, b: 1, a: 0.5 },
				]
				spyOn(gridUtilities, 'getSetForTile').and.returnValue(tileColors)

				const result = colorUtilities.getColorsForTile({ address: [], colorConfig })

				expect(result).toEqual(tileColors)
			})
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