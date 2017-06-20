import 'jasmine'

import state from '../../state/state'
import grid from '../../components/grid'

describe('grid', () => {
    let tileSpy
    const gridSize = 2

    beforeEach(() => {
        tileSpy = jasmine.createSpy()
        grid.__Rewire__('tile', tileSpy)
        state.gridConfig = { gridSize }
    })

    describe('when negative quadrants are excluded', () => {
        beforeEach(() => {
            state.gridConfig.includeNegativeQuadrants = false 
        })

        it('only makes tiles with positive addresses', () => {
            grid()

            expect(tileSpy.calls.count()).toEqual(Math.pow(gridSize, 2))
            expect(tileSpy.calls.all()[0].args).toEqual([{ address: [ 0, 0 ] }])
            expect(tileSpy.calls.all()[1].args).toEqual([{ address: [ 0, 1 ] }])
            expect(tileSpy.calls.all()[2].args).toEqual([{ address: [ 1, 0 ] }])
            expect(tileSpy.calls.all()[3].args).toEqual([{ address: [ 1, 1 ] }])
        }) 
    })

    describe('when negative quadrants are included', () => {
        beforeEach(() => {
            state.gridConfig.includeNegativeQuadrants = true 
        })

        it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
            const quadrantCount = 4

            grid()

            expect(tileSpy.calls.count()).toEqual(Math.pow(gridSize, 2) * quadrantCount)
            expect(tileSpy.calls.all()[0].args).toEqual([{ address: [ -2, -2 ] }])
            expect(tileSpy.calls.all()[1].args).toEqual([{ address: [ -2, -1 ] }])
            expect(tileSpy.calls.all()[2].args).toEqual([{ address: [ -2, 0 ] }])
            expect(tileSpy.calls.all()[3].args).toEqual([{ address: [ -2, 1 ] }])
            expect(tileSpy.calls.all()[4].args).toEqual([{ address: [ -1, -2 ] }])
            expect(tileSpy.calls.all()[5].args).toEqual([{ address: [ -1, -1 ] }])
            expect(tileSpy.calls.all()[6].args).toEqual([{ address: [ -1, 0 ] }])
            expect(tileSpy.calls.all()[7].args).toEqual([{ address: [ -1, 1 ] }])
            expect(tileSpy.calls.all()[8].args).toEqual([{ address: [ 0, -2 ] }])
            expect(tileSpy.calls.all()[9].args).toEqual([{ address: [ 0, -1 ] }])
            expect(tileSpy.calls.all()[10].args).toEqual([{ address: [ 0, 0 ] }])
            expect(tileSpy.calls.all()[11].args).toEqual([{ address: [ 0, 1 ] }])
            expect(tileSpy.calls.all()[12].args).toEqual([{ address: [ 1, -2 ] }])
            expect(tileSpy.calls.all()[13].args).toEqual([{ address: [ 1, -1 ] }])
            expect(tileSpy.calls.all()[14].args).toEqual([{ address: [ 1, 0 ] }])
            expect(tileSpy.calls.all()[15].args).toEqual([{ address: [ 1, 1 ] }])
        }) 
    })

    afterEach(() => {
        grid.__ResetDependency__('tile')
    })
})