import setElementDimensions from '../../../src/display/setElementDimensions'

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element = document.createElement('div')

		setElementDimensions(element, [ 400, 500 ])

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})