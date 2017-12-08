// tslint:disable:no-unsafe-any

import { globalWrapper, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const storeDomElements: NullarySideEffector =
	(): void => {
		appState.dom.descriptionsContainer = globalWrapper.document.querySelector('#descriptions-container') as HTMLElement
		appState.dom.frameInput = globalWrapper.document.querySelector('#frame-input') as HTMLInputElement
		appState.dom.layersProgressBar = globalWrapper.document.querySelector('#layers-progress-bar') as HTMLElement
		appState.dom.pauseButton = globalWrapper.document.querySelector('#pause-button') as HTMLButtonElement
		appState.dom.playButton = globalWrapper.document.querySelector('#play-button') as HTMLButtonElement
		appState.dom.progressBar = globalWrapper.document.querySelector('#progress-bar') as HTMLElement
		appState.dom.progressMessage = globalWrapper.document.querySelector('#progress-message') as HTMLElement
		appState.dom.rewindButton = globalWrapper.document.querySelector('#rewind-button') as HTMLButtonElement
		appState.dom.snapshotButton = globalWrapper.document.querySelector('#snapshot-button') as HTMLButtonElement
	}

export default storeDomElements
