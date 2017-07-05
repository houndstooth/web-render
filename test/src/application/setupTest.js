import setup from '../../../src/application/setup'
import consoleWrapper from '../../../src/application/consoleWrapper'

describe('setup', () => {
	it('logs the settings when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		setup({ settingsLogging: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(current.settings)
	})

	it('does not log the settings when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		setup()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('sets up settings', () => {
		let propertyFunctionOneD = () => 'D'
		let propertyFunctionOneE = () => 'E'
		let propertyFunctionOneG = () => 'G'
		let propertyFunctionOneH = () => 'H'
		const effectOne = {
			initial: {
				propertyA: 'A',
				propertyB: 'B',
			},
			animations: {
				propertyD: propertyFunctionOneD,
				propertyE: propertyFunctionOneE,
			},
			iterations: {
				propertyG: propertyFunctionOneG,
				propertyH: propertyFunctionOneH,
			},
		}

		let propertyFunctionTwoD = () => 'd'
		let propertyFunctionTwoF = () => 'f'
		let propertyFunctionTwoG = () => 'g'
		let propertyFunctionTwoI = () => 'i'
		const effectTwo = {
			initial: {
				propertyA: 'a',
				propertyC: 'c',
			},
			animations: {
				propertyD: propertyFunctionTwoD,
				propertyF: propertyFunctionTwoF,
			},
			iterations: {
				propertyG: propertyFunctionTwoG,
				propertyI: propertyFunctionTwoI,
			},
		}

		const effects = [ effectOne, effectTwo ]

		setup({ effects })

		expect(current.settings.initial).toEqual(jasmine.objectContaining({
			propertyA: 'a',
			propertyB: 'B',
			propertyC: 'c',
		}))
		expect(current.settings.animations).toEqual(jasmine.objectContaining({
			propertyD: propertyFunctionTwoD,
			propertyE: propertyFunctionOneE,
			propertyF: propertyFunctionTwoF,
		}))
		expect(current.settings.iterations).toEqual(jasmine.objectContaining({
			propertyG: propertyFunctionTwoG,
			propertyH: propertyFunctionOneH,
			propertyI: propertyFunctionTwoI,
		}))
	})
})
