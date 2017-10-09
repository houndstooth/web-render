const triangularNumber = n => n * (n + 1) / 2

const triangularRoot = n => 0.5 * Math.sqrt(8 * n + 1) - 0.5

const quarterSquareNumber = n => Math.floor(Math.pow(n, 2) / 4)

const trapezoidalNumber = ({ start, height }) => triangularNumber(start + height) - triangularNumber(start)

const termialRoot = ({ rangeStart, rangeDelta, n }) => {
	const c = 2 * rangeStart
	const a = Math.pow(c - rangeDelta, 2)
	const b = 8 * rangeDelta * n
	const d = 2 * rangeDelta
	return ( Math.sqrt(a + b) - c + rangeDelta ) / d
}

export {
	trapezoidalNumber,
	triangularNumber,
	triangularRoot,
	quarterSquareNumber,
	termialRoot,
}
