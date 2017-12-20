import { from } from '../../../utilities'
import { appState } from '../../appState'

const ONE_HUNDRED_PERCENT: number = 100

const updateProgress: () => void =
	(): void => {
		const ratio: number = appState.execute.tilesCompleted / appState.execute.tileCount
		const percentage: number = Math.ceil(ratio * ONE_HUNDRED_PERCENT)

		appState.dom.progressBar.style.width = `${percentage}%`

		const endLayerValue: number = from.Layer(appState.controls.endLayer)
		const currentLayerValue: number = from.Layer(appState.execute.currentLayer)

		const layerCount: number = endLayerValue + 1
		const layersPercentage: number = (percentage + currentLayerValue * ONE_HUNDRED_PERCENT) / layerCount
		appState.dom.layersProgressBar.style.width = `${layersPercentage}%`

		const animationsAndLayersMessages: string[] = []
		if (appState.controls.animating) {
			animationsAndLayersMessages.push(` frame ${appState.controls.currentFrame}`)
		}
		if (endLayerValue) {
			animationsAndLayersMessages.push(` layer ${currentLayerValue}/${endLayerValue}`)
		}
		appState.dom.progressMessage.textContent = `Rendering${animationsAndLayersMessages.join(',')}: ${percentage}%`
	}

export default updateProgress