// tslint:disable:max-file-line-count

import { Color } from '../render'
import { Coordinate, GetOutline, GetOutlineParams, Outline } from '../space'

enum _AddressBrand {}

type Address = _AddressBrand & AddressElement[]

interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

enum AssignmentMode {
	Supertile,
	Weave,
}

enum BaseStripeDiagonal {
	Minor,
	Principal,
}

interface ColorOptions {
	readonly shapeColorCount: number,
	readonly shapeColorIndex: ShapeColorIndex,
}

enum _ColorSetBrand {}

type ColorSet = _ColorSetBrand & Color[]

interface ComponentParams extends TileOriginAndSize, ColorOptions, OutlineAsParam {
}

interface DefinedTileParams extends TileOriginAndSize {
	gridAddress: Address,
}

type ExecuteTexture = (_: ExecuteTextureParams) => void

interface ExecuteTextureParams extends TileOriginAndSize, ColorOptions {
}

interface GridAddressParam {
	readonly gridAddress: Address,
}

interface GetShapeColorIndicesWithOffsetParams extends GridAddressParam {
	readonly addressOffset: Address,
}

type GetShapeColorIndices = (_: GridAddressParam) => ShapeColorIndex[]

type GetShapeColorIndicesWithOffset = (_: GetShapeColorIndicesWithOffsetParams) => ShapeColorIndex[]

interface GetStripeArgsParams {
	args: ShapeArgs,
	stripeIndex: number,
	stripePositions: StripePosition[],
	stripeStart: StripePosition,
}

type GetStripePosition = (_: GetStripePositionParams) => StripePosition

interface GetStripePositionParams {
	readonly stripeCount: number,
	readonly stripeIndex: number,
}

// tslint:disable-next-line:no-any
type GetStripePositions = (p?: any) => StripePosition[]

// tslint:disable-next-line:no-any
type GetTileOriginAndSize = (p?: any) => TileOriginAndSize | undefined

type Grid<T> = T[][]

type OffsetAddress = (_: { gridAddress: Address }) => Address

interface OutlineAsParam {
	readonly outline: Outline,
}

interface ShapeColorIndex extends Number {
	// tslint:disable-next-line:no-any
	_ShapeColorIndexBrand: any,
}

interface ShapeParams extends GetOutlineParams {
	readonly getOutline: GetOutline,
	readonly shapeColorIndices: ShapeColorIndex[],
	readonly stripeIndex?: number,
}

interface SolidParams {
	readonly outline: Outline,
	readonly shapeColorIndex: ShapeColorIndex,
}

enum StripeCountMode {
	Standard,
	GinghamChevronContinuum,
}

interface StripePosition extends Number {
	// tslint:disable-next-line:no-any
	_StripePositionBrand: any,
}

enum _SupertileBrand {}

type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

interface TextureParams extends ComponentParams {
	readonly executeTexture: ExecuteTexture,
}

type Tile = (_: TileParams) => void

interface TileOriginAndSize {
	readonly tileOrigin: Coordinate,
	readonly tileSize: Unit,
}

interface TileParams extends TransformShapeColorIndicesParams, TileOriginAndSize {
}

type TransformShapeColorIndices = (_: TransformShapeColorIndicesParams) => ShapeColorIndex[]

interface TransformShapeColorIndicesParams {
	readonly gridAddress: Address,
	readonly shapeColorIndices: ShapeColorIndex[],
}

interface ShapeArgs extends TileOriginAndSize {
	readonly shapeColorIndices: ShapeColorIndex[],
}

interface Unit extends Number {
	// tslint:disable-next-line:no-any
	_UnitsBrand: any,
}

interface Weave {
	readonly columns: number[],
	readonly rows: number[],
}

export {
	Address,
	AddressElement,
	AssignmentMode,
	BaseStripeDiagonal,
	ColorOptions,
	ColorSet,
	ComponentParams,
	DefinedTileParams,
	ExecuteTexture,
	ExecuteTextureParams,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GridAddressParam,
	GetShapeColorIndicesWithOffsetParams,
	GetStripeArgsParams,
	GetStripePosition,
	GetStripePositionParams,
	GetStripePositions,
	GetTileOriginAndSize,
	Grid,
	ShapeArgs,
	OffsetAddress,
	ShapeColorIndex,
	ShapeParams,
	SolidParams,
	StripeCountMode,
	StripePosition,
	Supertile,
	TextureParams,
	Tile,
	TileOriginAndSize,
	TileParams,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Unit,
	Weave,
}
