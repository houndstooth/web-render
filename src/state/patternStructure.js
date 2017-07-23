const PATTERN_STRUCTURE = {
	viewSettings: {
		canvasSize: true,
		zoom: true,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtZeroZeroAddress: true,
		rotateViewAboutCanvasCenter: true,
	},
	gridSettings: {
		gridSize: true,
		includeNegativeQuadrants: true,
	},
	tileSettings: {
		tileSizeSetting: true,
		getTileOriginAndSize: true,
		collapseSameColoredShapesWithinTile: true,
		isTileUniform: true,
		tileToShapes: true,
		getCoordinates: {
			whenTileIsUniform: true,
			whenTileIsMultiform: true,
		},
	},
	colorSettings: {
		set: true,
		houndazzle: {
			substripeCount: true,
			dazzleContinuum: true,
			orientationSettings: {
				set: true,
			},
			colorSettings: {
				assignment: {
					offsetSetForGridIndex: true,
				},
			},
		},
		assignment: {
			switcheroo: true,
			flipGrain: true,
			transformAssignedSet: true,
			assignmentMode: true,
			offsetAddress: true,
			supertile: true,
			weave: {
				rows: true,
				columns: true,
			},
		},
		opacity: true,
	},
	stripeSettings: {
		stripePositionSettings: {
			stripeCountMode: true,
			stripeCountSetting: true,
			ginghamChevronContinuumSettings: {
				initialStripeCount: true,
				deltaStripeCount: true,
			},
			getStripePositions: true,
		},
		baseStripeDiagonal: true,
	},
	gatherOptions: {
		getDazzle: true,
	},
	animationSettings: {
		frameRate: true,
		startAnimationFrame: true,
		endAnimationFrame: true,
		refreshCanvas: true,
	},
	iterationSettings: {
		startIterationFrame: true,
		endIterationFrame: true,
	},
}

export default { PATTERN_STRUCTURE }
