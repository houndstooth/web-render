import { Color, parseColor } from '../../../../../src'

describe('parse color', () => {
	it('converts a color object into a canvas-readable string', () => {
		const colorObject: Color = { r: 150, g: 100, b: 50, a: 0.5 }
		const expectedParsedColor: string = 'rgba(150,100,50,0.5)'
		expect(parseColor.default(colorObject)).toBe(expectedParsedColor)
	})
})
