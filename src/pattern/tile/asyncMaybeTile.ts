import { thisPatternHasNotBeenCanceled } from '../../app'
import { state } from '../../state'
import { documentWrapper, windowWrapper } from '../../utilities'
import { ReferencedGridAddress } from '../grid'
import { maybeTile } from './maybeTile'

const ONE_HUNDRED_PERCENT: number = 100

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		// tslint:disable-next-line:no-unsafe-any
		windowWrapper.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
					maybeTile({ gridAddress, thisPatternRef })

					const percentage: number = Math.ceil(state.tilesCompleted * ONE_HUNDRED_PERCENT / (state.tileCount))

					// tslint:disable-next-line:no-unsafe-any
					const progressBar: HTMLElement | undefined = documentWrapper.querySelector('#progress-bar') as HTMLElement
					if (progressBar) {
						progressBar.style.height = `${ONE_HUNDRED_PERCENT - percentage}%`
					}
				}
			},
			0,
		)
	}

export { asyncMaybeTile }