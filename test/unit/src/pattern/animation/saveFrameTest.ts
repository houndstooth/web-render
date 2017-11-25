import { DataBlob, saveBlob, saveFrame, state, to } from '../../../../../src'

describe('save frame', () => {
	const result: DataBlob = {}
	beforeEach(() => {
		state.lastSavedFrame = to.Frame(666)
		spyOn(saveBlob, 'main')

		saveFrame.main(result)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.main).toHaveBeenCalledWith({ blob: result, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedFrame).toBe(to.Frame(667))
	})
})
