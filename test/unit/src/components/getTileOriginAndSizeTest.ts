import { from, state, to } from '../../../../src'
import { Address, GetTileOriginAndSize, TileOriginAndSize, Unit } from '../../../../src/components'
import { getTileOriginAndSize } from '../../../../src/components/getTileOriginAndSize'
import { setSetting } from '../../../../src/store/setSetting'

describe('get tile origin and size', () => {
	const gridAddressForSubject: Address = to.Address([ 7, 11 ])
	const tileSize: Unit = to.Unit(40)

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		setSetting('tileSettings', { tileSize })

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 7, from.Unit(tileSize) * 11 ]),
			tileSize: to.Unit(from.Unit(tileSize)),
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom: GetTileOriginAndSize = ({ gridAddress }: { gridAddress: Address }): TileOriginAndSize => {
			const [ x, y ]: number[] = from.Address(gridAddress)

			return {
				tileOrigin: to.Coordinate([ y * from.Unit(tileSize), x * from.Unit(tileSize) ]),
				tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
			}
		}
		setSetting('getTileOriginAndSize', custom)

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 11, from.Unit(tileSize) * 7 ]),
			tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
		})
	})
})
