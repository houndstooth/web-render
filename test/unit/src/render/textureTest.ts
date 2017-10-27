import { texture } from '../../../../src/components/texture'
import { ShapeColorIndex } from '../../../../src/components'
import { Unit } from '../../../../src/components'
import * as render from '../../../../src/render'
import { Coordinate } from '../../../../src/space'
import Spy = jasmine.Spy
import { Outline } from '../../../../src/space'
import * as to from '../../../../src/utilities/to'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(render, 'setClip')
		spyOn(render, 'resetClip')

		const shapeColorCount: number = 2
		const tileOrigin: Coordinate = to.Coordinate([])
		const tileSize: Unit = to.Unit(11)
		const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(3)
		const outline: Outline = to.Outline([])
		const executeTexture: Spy = jasmine.createSpy('executeTexture')

		texture({ outline, executeTexture, shapeColorCount, shapeColorIndex, tileOrigin, tileSize })

		expect(render.setClip).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, shapeColorCount, tileOrigin, tileSize })
		expect(render.resetClip).toHaveBeenCalled()
	})
})
