// tslint:disable:no-unsafe-any

import { FONT_SIZE } from '../constants'
import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createCheckbox } from './createCheckbox'
import { InputElement, LabelElement } from './types'

const createLabel: (_: { houndstoothEffect: Effect }) => LabelElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): LabelElement => {
		const label: LabelElement = document.createElement('label')

		label.style.cursor = 'pointer'
		label.style.padding = '5px'
		label.style.fontFamily = 'Gilda Display'
		label.style.fontSize = FONT_SIZE

		const checkbox: InputElement = createCheckbox({ houndstoothEffect })
		label.appendChild(checkbox)

		const name: HTMLTextAreaElement = document.createTextNode(houndstoothEffect.name)
		label.appendChild(name)

		return label
	}

export { createLabel }
