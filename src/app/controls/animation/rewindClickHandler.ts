import { to } from '../../../utilities'
import { appState } from '../../appState'
import { clearIntervalAndRemoveFromState, executePattern } from '../../execute'
import { clearMixedDownContext } from '../../render'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: () => void =
	(): void => {
		clearIntervalAndRemoveFromState.default('animationInterval')

		updateCurrentFrame(to.Frame(0))

		if (!appState.controls.animating) {
			appState.dom.rewindButton.disabled = true
			clearMixedDownContext.default()
		}

		executePattern.default()
	}

export default rewindClickHandler