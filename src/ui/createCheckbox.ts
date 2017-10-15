import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import { InputElement } from '../page'
import buildEffectToggleClickHandler from './buildEffectToggleClickHandler'

const createCheckbox: { ({}: { houndstoothEffect: Houndstooth }): InputElement } = ({ houndstoothEffect }) => {
	const checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	// tslint:disable-next-line:no-void-expression
	checkbox.onclick = buildEffectToggleClickHandler({ checkbox, houndstoothEffect })
	checkbox.style.cursor = 'pointer'

	return checkbox
}

export default createCheckbox
