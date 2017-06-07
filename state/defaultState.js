import { BLACK, TRANSPARENT } from '../application/constants' // WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW

export default {
	viewConfig: {
		canvasSize: 800,
		zoom: 1,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtZeroZeroAddress: false
	},
	gridConfig: {
		gridSize: 16,
		gridRotationAboutGridCenter: 0,
		includeNegativeQuadrants: false
	},
	tileConfig: {
		tileSize: 50
	},
	colorConfig: {
		set: [ BLACK, TRANSPARENT ],
		mode: 'STANDARD', // 'HOUNDAZZLE'
		houndazzle: {
			substripeCount: 16,
			dazzleContinuum: false,
			orientationConfig: null
		},
		assignment: {
			switcheroo: false,
			flipGrain: false,
			mode: 'WEAVE', // 'SUPERTILE'
			offsetAddress: null,
			supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
			weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
		},
		opacity: 1
	},
	stripeCountConfig: {
		mode: 'STANDARD', // 'GINGHAM', 'GINGHAM_CHEVRON_CONTINUUM'
		stripeCount: 4,
		ginghamChevronContinuum: { initial: 1, delta: 1 }
	},
	baseStripeDiagonal: 'MINOR', // 'PRINCIPAL'
	getShapeOriginAndSizedUnit: null,
	getStripePositions: null,
	animation: {
		frameRate: 1000 / 60,
		refreshCanvas: true
	},
	iteration: {
		startIteration: 0,
		endIteration: 8
	}
}
