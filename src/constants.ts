// tslint:disable:no-magic-numbers

import { StripePosition } from './components/types'
import { Color } from './render'
import { Radian } from './space'
import * as to from './utilities/to'

const BLACK: Color = { r: 0, g: 0, b: 0, a: 1 }
const WHITE: Color = { r: 255, g: 255, b: 255, a: 1 }
const RED: Color = { r: 255, g: 0, b: 0, a: 1 }
const GREEN: Color = { r: 0, g: 255, b: 0, a: 1 }
const BLUE: Color = { r: 0, g: 0, b: 255, a: 1 }
const CYAN: Color = { r: 0, g: 255, b: 255, a: 1 }
const MAGENTA: Color = { r: 255, g: 0, b: 255, a: 1 }
const YELLOW: Color = { r: 255, g: 255, b: 0, a: 1 }

const TRANSPARENT: Color = { a: 0 }
const ERASE: Color = { a: -1 }

const EIGHTH_OF_CIRCLE_ROTATION: Radian = to.Radian(Math.PI / 4)
const QUARTER_CIRCLE_ROTATION: Radian = to.Radian(Math.PI / 2)

const HALF: number = 1 / 2

const PERIMETER_SCALAR: StripePosition = to.StripePosition(2)

const SQRT_2: number = Math.sqrt(2)

const X_INDEX: number = 0
const Y_INDEX: number = 1

const ANIMATION_RATE: number = 1.000005

export {
	BLACK,
	WHITE,
	RED,
	GREEN,
	BLUE,
	CYAN,
	MAGENTA,
	YELLOW,
	TRANSPARENT,
	ERASE,
	EIGHTH_OF_CIRCLE_ROTATION,
	QUARTER_CIRCLE_ROTATION,
	PERIMETER_SCALAR,
	ANIMATION_RATE,
	SQRT_2,
	X_INDEX,
	Y_INDEX,
	HALF,
}
