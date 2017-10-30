import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { Address, TileOriginAndSize, Unit } from './types'

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize => {
		const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
		const [ x, y ]: number[] = from.Address(gridAddress)

		return {
			tileOrigin: to.Coordinate([ x * from.Unit(tileSize), y * from.Unit(tileSize) ]),
			tileSize,
		}
	}

export { getStandardTileOriginAndSize }
