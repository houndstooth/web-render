import { NullarySideEffector, to } from '../../utilities'
import { clearMixedDownContext } from '../canvas'
import { clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import { state } from '../state'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		clearInterval.default('animationInterval')

		updateCurrentFrame(to.Frame(0))

		if (!state.controls.animating) {
			state.dom.rewindButton.disabled = true
			clearMixedDownContext.default()
		}

		executeSelectedHoundstoothEffects.default()
	}

export default rewindClickHandler
