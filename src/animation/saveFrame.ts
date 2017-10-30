import { DataBlob } from '../page'
import { state } from '../state'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { saveBlob } from './saveBlob'

const saveFrame: (result: DataBlob) => void =
	(result: DataBlob): void => {
		saveBlob({ blob: result, name: `${state.lastSavedFrame}.png` })
		state.lastSavedFrame = to.Frame(from.Frame(state.lastSavedFrame) + 1)
	}

export { saveFrame }
