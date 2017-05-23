import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../constants'
import state from '../../state'

export default ({ squareType }) => {
	const colorKeys = SQUARE_TYPE_TO_COLORS_MAPPING[ squareType ].slice()
	return [
		state.shared[ colorKeys[ 0 ] ],
		state.shared[ colorKeys[ 1 ] ]
	]
}