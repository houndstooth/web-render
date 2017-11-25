import { Path, Pixel, Px } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { HALF } from '../../constants'
import * as from from '../../from'
import * as to from '../../to'
import { DoAdjustmentParams } from './types'
import { ViewSettings } from './viewSettings'

const applyZoom: (path: Path) => Path =
	(path: Path): Path => to.Path(path.map(adjustPixelForZoom))

const adjustPixelForZoom: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const {
			canvasSize,
			centerViewOnCenterOfTileAtHomeAddress,
			zoom,
			zoomOnCanvasCenter,
		}: ViewSettings = getFromBaseOrDefaultPattern('viewSettings')
		const halfCanvasSize: Px = to.Px(from.Px(canvasSize) * HALF)
		const shouldAdjustForCentering: boolean = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

		return doAdjustment({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom })
	}

const doAdjustment: (_: DoAdjustmentParams) => Pixel =
	({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom }: DoAdjustmentParams): Pixel => {
		let pixelAdjustedForZoom: Pixel = pixel

		if (shouldAdjustForCentering) {
			pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
				from.Px(px) - from.Px(halfCanvasSize)))
		}
		pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
			from.Px(px) * zoom))
		if (shouldAdjustForCentering) {
			pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
				from.Px(px) + from.Px(halfCanvasSize)))
		}

		return pixelAdjustedForZoom
	}

export { applyZoom as main }
