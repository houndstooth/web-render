import controls from './controls'
import interfaceUtilities from '../utilities/interfaceUtilities'

let warnings = document.querySelector('.warnings')

if (!warnings) {
	warnings = document.createElement('div')
	warnings.classList.add('warnings')
	interfaceUtilities.insertElementRightAfter(warnings, controls)
}

export default warnings