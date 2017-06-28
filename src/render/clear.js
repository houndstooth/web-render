import ctx from './ctx'
import { CANVAS_SIZE } from '../defaults'

export default () => {
	const canvasSize = settings.initial.viewConfig && settings.initial.viewConfig.canvasSize || CANVAS_SIZE
	ctx.clearRect(0, 0, canvasSize, canvasSize)
}