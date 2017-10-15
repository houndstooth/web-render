import buildPath from './buildPath'
import clipPath from './clipPath'
import resetClip from './resetClip'
import { RenderFunction } from './types'

const texture: RenderFunction = textureArgs => {
	const { context, outline, renderTexture } = textureArgs

	buildPath({ context, outline })
	clipPath({ context })
	if (renderTexture) {
		renderTexture(textureArgs)
	}
	resetClip({ context })
}

export default texture
