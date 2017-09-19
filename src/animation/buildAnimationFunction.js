import state from '../../state'
import execute from '../execute'
import canvas from '../canvas'
import exportFrame from './exportFrame'
import { deepClone } from '../utilities/codeUtilities'

export default ({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas }) => () => {
	if (state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame) return

	if (state.currentAnimationFrame >= startAnimationFrame) {
		if (refreshCanvas) canvas.clear()

		const preLayerSettings = deepClone(state.mainHoundstooth.basePattern)
		execute.executeGrid({ layerFunctions })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) exportFrame()
	}

	execute.callFunctionsPerSetting({ settingsFunctions: animationFunctions })
	state.currentAnimationFrame++
}
