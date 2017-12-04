// tslint:disable:no-unsafe-any

import Spy = jasmine.Spy
import { applyViewForGrid, grid, setSetting, state } from '../../../../../src'

describe('grid', () => {
	let gridTileSpy: Spy
	const tileResolution: number = 2
	const thisPatternRef: number = 99
	beforeEach(() => {
		setSetting.default('tileResolution', tileResolution)
		gridTileSpy = jasmine.createSpy('gridTile')
		spyOn(applyViewForGrid, 'default')
	})

	it('applies view for the grid', () => {
		grid.default({ gridTile: gridTileSpy, thisPatternRef })

		expect(applyViewForGrid.default).toHaveBeenCalled()
	})

	it('uses the given grid size', () => {
		grid.default({ gridTile: gridTileSpy, thisPatternRef })

		expect(gridTileSpy.calls.all().length).toBe(Math.pow(tileResolution, 2))
	})

	describe('when negative quadrants are excluded', () => {
		beforeEach(() => {
			setSetting.default('includeNegativeQuadrants', false)
		})

		it('only makes tiles with positive addresses', () => {
			grid.default({ gridTile: gridTileSpy, thisPatternRef })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2))
			expect(gridTileSpy.calls.all()[ 0 ].args[ 0 ].gridAddress).toEqual([ 0, 0 ])
			expect(gridTileSpy.calls.all()[ 1 ].args[ 0 ].gridAddress).toEqual([ 0, 1 ])
			expect(gridTileSpy.calls.all()[ 2 ].args[ 0 ].gridAddress).toEqual([ 1, 0 ])
			expect(gridTileSpy.calls.all()[ 3 ].args[ 0 ].gridAddress).toEqual([ 1, 1 ])
		})

		it('sets the tile count on the state correctly', () => {
			state.execute.tileCount = 0

			grid.default({ gridTile: gridTileSpy, thisPatternRef })

			expect(state.execute.tileCount).toBe(Math.pow(tileResolution, 2))
		})
	})

	describe('when negative quadrants are included', () => {
		beforeEach(() => {
			setSetting.default('includeNegativeQuadrants', true)
		})

		// tslint:disable-next-line:max-line-length
		it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
			const quadrantCount: number = 4

			grid.default({ gridTile: gridTileSpy, thisPatternRef })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2) * quadrantCount)
			expect(gridTileSpy.calls.all()[ 0 ].args[ 0 ].gridAddress).toEqual([ -2, -2 ])
			expect(gridTileSpy.calls.all()[ 1 ].args[ 0 ].gridAddress).toEqual([ -2, -1 ])
			expect(gridTileSpy.calls.all()[ 2 ].args[ 0 ].gridAddress).toEqual([ -2, 0 ])
			expect(gridTileSpy.calls.all()[ 3 ].args[ 0 ].gridAddress).toEqual([ -2, 1 ])
			expect(gridTileSpy.calls.all()[ 4 ].args[ 0 ].gridAddress).toEqual([ -1, -2 ])
			expect(gridTileSpy.calls.all()[ 5 ].args[ 0 ].gridAddress).toEqual([ -1, -1 ])
			expect(gridTileSpy.calls.all()[ 6 ].args[ 0 ].gridAddress).toEqual([ -1, 0 ])
			expect(gridTileSpy.calls.all()[ 7 ].args[ 0 ].gridAddress).toEqual([ -1, 1 ])
			expect(gridTileSpy.calls.all()[ 8 ].args[ 0 ].gridAddress).toEqual([ 0, -2 ])
			expect(gridTileSpy.calls.all()[ 9 ].args[ 0 ].gridAddress).toEqual([ 0, -1 ])
			expect(gridTileSpy.calls.all()[ 10 ].args[ 0 ].gridAddress).toEqual([ 0, 0 ])
			expect(gridTileSpy.calls.all()[ 11 ].args[ 0 ].gridAddress).toEqual([ 0, 1 ])
			expect(gridTileSpy.calls.all()[ 12 ].args[ 0 ].gridAddress).toEqual([ 1, -2 ])
			expect(gridTileSpy.calls.all()[ 13 ].args[ 0 ].gridAddress).toEqual([ 1, -1 ])
			expect(gridTileSpy.calls.all()[ 14 ].args[ 0 ].gridAddress).toEqual([ 1, 0 ])
			expect(gridTileSpy.calls.all()[ 15 ].args[ 0 ].gridAddress).toEqual([ 1, 1 ])
		})

		it('sets the tile count on the state correctly', () => {
			state.execute.tileCount = 0

			grid.default({ gridTile: gridTileSpy, thisPatternRef })

			expect(state.execute.tileCount).toBe(Math.pow(tileResolution, 2) * 4)
		})
	})
})
