import { buildFill, Color, constants, Context, parseColor, state } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'

const { ERASE } = constants

describe('build fill', () => {
	const shapeColor: Color = { a: 1 }
	const parsedColor: string = '#012345'
	let context: Context
	beforeEach(() => {
		context = buildMockContext()
		state.contexts = [ context ]
		spyOn(parseColor, 'main').and.returnValue(parsedColor)

		buildFill.main({ shapeColor })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(parseColor.main).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('defaults the global composite operation to source-over', () => {
		expect(context.globalCompositeOperation).toEqual('source-over')
	})

	describe('when erasing', () => {
		it('sets the operation to destination-out', () => {
			buildFill.main({ shapeColor: ERASE })

			expect(context.globalCompositeOperation).toEqual('destination-out')
		})
	})
})
