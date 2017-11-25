import {
	activateTestMarkerCanvas,
	Diagonal,
	ExpectDiagonalDividedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectSolidSection,
	fakeAnimator,
	pixelIsColorWithMarker,
	sectionCenterIsColor,
	StandardTileExpectation,
	standardTileIsColors,
	thisFrameOnly,
	thisLayerOnly,
} from './helpers'

// tslint:disable:no-any no-unsafe-any typedef
declare const require: any

const testsContext = require.context('./tests', true)
testsContext.keys().forEach(testsContext)

const effectTestsContext = require.context('../../effects', true, /integration\/.*Test.ts$/)
effectTestsContext.keys().forEach(effectTestsContext)

export {
	activateTestMarkerCanvas,
	sectionCenterIsColor,
	thisLayerOnly,
	Diagonal,
	ExpectDiagonalDividedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectSolidSection,
	fakeAnimator,
	thisFrameOnly,
	standardTileIsColors,
	StandardTileExpectation,
	pixelIsColorWithMarker,
}
