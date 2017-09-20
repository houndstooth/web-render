import buildEffectToggleClickHandler from './buildEffectToggleClickHandler'
import { createEffectTogglesContainer } from '../page'

export default houndstoothEffect => {
	const label = document.createElement('label')
	label.style.cursor = 'pointer'
	label.style.display = 'block'

	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildEffectToggleClickHandler(checkbox, houndstoothEffect)
	checkbox.style.cursor = 'pointer'
	label.appendChild(checkbox)

	const name = document.createTextNode(houndstoothEffect.name)
	label.appendChild(name)

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}
