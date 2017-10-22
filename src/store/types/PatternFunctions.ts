import { Unit } from '../../components'
import { Color } from '../../render'
import { Radian } from '../../space'

interface PatternFunctions {
	colorSettings?: {
		backgroundColor?(): Color,
		colorSet?(): Color[],
		opacity?(): number,
	},
	gridSettings?: {
		gridSize?(): number,
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountContinuumSettings?: {
				deltaStripeCount?(p: number): number,
				initialStripeCount?(p: number): number,
			},
			stripeCount?(p: number): number,
		},
	},
	tileSettings?: {
		tileSize?(p: Unit): Unit,
	},
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: Radian): Radian,
	},
}

export { PatternFunctions }
