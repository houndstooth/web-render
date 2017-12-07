import { DECIMAL_RADIX } from '../../constants'
import { to } from '../../utilities'
import { appState } from '../appState'
import { clearMixedDownContext } from '../canvas'
import { executeSelectedEffects } from '../execute'

const frameInputChangeHandler: (event: Event) => void =
	(event: Event): void => {
		const target: HTMLInputElement = event.target as HTMLInputElement
		appState.controls.currentFrame = to.Frame(parseInt(target.value, DECIMAL_RADIX))

		clearMixedDownContext.default()
		executeSelectedEffects.default()
	}

export default frameInputChangeHandler