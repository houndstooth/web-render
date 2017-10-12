import state from '../state'
import { executeSelectedHoundstoothEffects } from '../execute'
import { Houndstooth } from '../store'
import resetInterface from './resetInterface'

type BuildEffectToggleClickHandler = { ({}: { checkbox: any, houndstoothEffect: Houndstooth }): void }
const buildEffectToggleClickHandler: BuildEffectToggleClickHandler = ({ checkbox, houndstoothEffect }) => () => {
	resetInterface()

	const effectFunction = checkbox.checked ? addEffect : removeEffect
	effectFunction(houndstoothEffect)

	executeSelectedHoundstoothEffects()
}

const addEffect: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	state.selectedHoundstoothEffects.push(houndstoothEffect)
}

const removeEffect: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter(selectedHoundstoothEffect => {
		return selectedHoundstoothEffect.name !== houndstoothEffect.name
	})
}

export default buildEffectToggleClickHandler
