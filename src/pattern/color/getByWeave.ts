import { getSetting } from '../../app'
import * as from from '../../from'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { GetShapeColorIndicesWithOffset, GetShapeColorIndicesWithOffsetParams, ShapeColorIndex, Weave } from './types'

const getByWeave: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const { rows, columns }: Weave = getSetting.default('weave')

		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const columnsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: columns,
			index: x + xOffset,
		}))
		const rowsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: rows,
			index: y + yOffset,
		}))

		return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
	}

export default getByWeave
