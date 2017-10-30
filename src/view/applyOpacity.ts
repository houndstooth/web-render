import { getCurrentContext } from '../canvas'
import { Context } from '../page'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = getFromBaseOrDefaultPattern('opacity')
		if (!opacity || opacity === 1) {
			return
		}

		const context: Context = getCurrentContext()
		context.globalAlpha = opacity
	}

export { applyOpacity }
