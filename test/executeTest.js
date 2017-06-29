import execute from '../src/execute'
import consoleWrapper from '../src/consoleWrapper'
// import canvas from '../src/render/canvas'
// import fileSaver from 'file-saver'
// import exportFrame from '../src/exportFrame'
import animator from '../src/animator'

describe('execute', () => {
	let iterating, animating, exportFrames, performanceLogging

	let consoleWrapperLogSpy
	let gridSpy
	beforeEach(() => {
		execute.__Rewire__('animator', ({ animationFunction, stopCondition }) => {
			while (!stopCondition()) animationFunction()
		})
		consoleWrapperLogSpy = spyOn(consoleWrapper, 'log')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')
		gridSpy = jasmine.createSpy()
		execute.__Rewire__('grid', gridSpy)

		// spyOn(fileSaver, 'saveAs').and.callFake(() => {})
		// spyOn(canvas, 'toBlob').and.callFake(fn => {
		// 	fn()
		// 	current.lastSavedFrame-- // to cancel out the real one
		// })
		

		settings.initial.animation = { endAnimationFrame: 100 } // to avoid infinite animation
	})

	afterEach(() => {
		execute.__ResetDependency__('grid')
		execute.__ResetDependency__('animator')
		// execute.__ResetDependency__('exportFrame')
	})

	describe('performance logging', () => {
		describe('when performance logging', () => {
			beforeEach(() => {
				performanceLogging = true
			})

			describe('when not iterating nor animating', () => {
				it('logs only the performance of the grid', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					expect(consoleWrapper.time.calls.all().length).toBe(1)
					expect(consoleWrapper.timeEnd.calls.all().length).toBe(1)
					expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
					expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				})
			})

			describe('when iterating (but not animating)', () => {
				beforeEach(() => {
					iterating = true
					settings.initial.iteration = { endIteration: 10 }
				})

				it('logs the current iteration frame along with the performance measurement', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toBe('current iteration frame: ' + index)
					})

					const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
					expect(consoleWrapperTimeCalls.length).toBe(11)
					consoleWrapperTimeCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})

					const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
					expect(consoleWrapperTimeEndCalls.length).toBe(11)
					consoleWrapperTimeEndCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})
				})
			})

			describe('when animating (but not iterating)', () => {
				beforeEach(() => {
					animating = true
					settings.initial.animation = { endAnimationFrame: 10 }
				})

				it('logs the current animation frame along with the performance measurement', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toEqual('current animation frame: ' + index)
					})

					const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
					expect(consoleWrapperTimeCalls.length).toBe(11)
					consoleWrapperTimeCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})

					const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
					expect(consoleWrapperTimeEndCalls.length).toBe(11)
					consoleWrapperTimeEndCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})
				})
			})

			describe('when animating and iterating', () => {
				beforeEach(() => {
					iterating = true
					animating = true
					settings.initial.iteration = { endIteration: 10 }
					settings.initial.animation = { endAnimationFrame: 10 }
				})

				it('logs the animation frames, iteration frames, and grid performance', () => {

				})
			})
		})

		describe('when not performance logging', () => {
			beforeEach(() => {
				performanceLogging = false
			})

			it('does not track performance or log it', () => {
				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(consoleWrapper.log).not.toHaveBeenCalled()
				expect(consoleWrapper.time).not.toHaveBeenCalled()
				expect(consoleWrapper.timeEnd).not.toHaveBeenCalled()
			})
		})
	})

	describe('neither iterating nor animating', () => {
		beforeEach(() => {
			iterating = false
			animating = false
		})

		it('calls grid only once', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(1)
		})

		it('does not call iteration functions', () => {
			const iterationFunction = jasmine.createSpy()
			settings.iterations.exampleProperty = iterationFunction

			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(iterationFunction).not.toHaveBeenCalled()
		})
	})

	describe('iterating (but not animating)', () => {
		beforeEach(() => {
			iterating = true
			animating = false
			settings.initial.iteration = {
				startIteration: 5,
				endIteration: 8
			}
		})

		it('calls grid once for each iteration between start and end, inclusive', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(4)
		})

		it('calls iteration functions once for each iteration, including before rendering starts', () => {
			const iterationFunction = jasmine.createSpy().and.callFake(p => p * 2)
			settings.initial.exampleConfig = { exampleProperty: 1 }
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const iterationFunctionCalls = iterationFunction.calls.all()
			expect(iterationFunctionCalls.length).toBe(9)
			expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
			expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
			expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
			expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
			expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
			expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
			expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(64)
			expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(128)
			expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(256)
		})

		it('handles iteration functions of the iteration frame', () => {
			const iterationFunction = jasmine.createSpy().and.callFake(() => 1000 - (current.iteration + 1))
			settings.initial.exampleConfig = { exampleProperty: 1000 }
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const iterationFunctionCalls = iterationFunction.calls.all()
			expect(iterationFunctionCalls.length).toBe(9)
			expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
			expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
			expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
			expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
			expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
			expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
			expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(994)
			expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(993)
			expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(992)
		})
	})

	describe('animating (but not iterating)', () => {
		beforeEach(() => {
			animating = true
			iterating = false
			settings.initial.animation = {
				startAnimationFrame: 2,
				endAnimationFrame: 5
			}
		})

		it('calls grid once for each animation between start and end, inclusive', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(4)
		})

		it('calls animation functions once for each animation, including before rendering starts', () => {
			const animationFunction = jasmine.createSpy().and.callFake(p => p * 2)
			settings.initial.exampleConfig = { exampleProperty: 1 }
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
		})

		it('handles animation functions of the current animation frame', () => {
			const animationFunction = jasmine.createSpy().and.callFake(() => 1000 - (current.animation + 1))
			settings.initial.exampleConfig = { exampleProperty: 1000 }
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
		})
	})

	describe('iterating and animating', () => {
		beforeEach(() => {
			animating = true
			iterating = true
			settings.initial.iteration = {
				startIteration: 5,
				endIteration: 8
			}
			settings.initial.animation = {
				startAnimationFrame: 2,
				endAnimationFrame: 5
			}
		})

		it('calls grid once for each iteration within each animation, both inclusively', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(16)
		})

		it('calls iteration functions once for each iteration, each animation frame, starting over each animation frame', () => {
			settings.initial.exampleConfig = { exampleProperty: 0 }

			const animationFunction = jasmine.createSpy().and.callFake(p => p + 10)
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			const iterationFunction = jasmine.createSpy().and.callFake(p => p + 1)
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(10)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(20)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(30)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(40)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(50)

			const iterationFunctionCalls = iterationFunction.calls.all()
			expect(iterationFunctionCalls.length).toBe(36)
			expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(20)
			expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(21)
			expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(22)
			expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(23)
			expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(24)
			expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(25)
			expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(26)
			expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(27)
			expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(28)

			expect(iterationFunctionCalls[ 9 ].args[ 0 ]).toBe(30)
			expect(iterationFunctionCalls[ 10 ].args[ 0 ]).toBe(31)
			expect(iterationFunctionCalls[ 11 ].args[ 0 ]).toBe(32)
			expect(iterationFunctionCalls[ 12 ].args[ 0 ]).toBe(33)
			expect(iterationFunctionCalls[ 13 ].args[ 0 ]).toBe(34)
			expect(iterationFunctionCalls[ 14 ].args[ 0 ]).toBe(35)
			expect(iterationFunctionCalls[ 15 ].args[ 0 ]).toBe(36)
			expect(iterationFunctionCalls[ 16 ].args[ 0 ]).toBe(37)
			expect(iterationFunctionCalls[ 17 ].args[ 0 ]).toBe(38)

			expect(iterationFunctionCalls[ 18 ].args[ 0 ]).toBe(40)
			expect(iterationFunctionCalls[ 19 ].args[ 0 ]).toBe(41)
			expect(iterationFunctionCalls[ 20 ].args[ 0 ]).toBe(42)
			expect(iterationFunctionCalls[ 21 ].args[ 0 ]).toBe(43)
			expect(iterationFunctionCalls[ 22 ].args[ 0 ]).toBe(44)
			expect(iterationFunctionCalls[ 23 ].args[ 0 ]).toBe(45)
			expect(iterationFunctionCalls[ 24 ].args[ 0 ]).toBe(46)
			expect(iterationFunctionCalls[ 25 ].args[ 0 ]).toBe(47)
			expect(iterationFunctionCalls[ 26 ].args[ 0 ]).toBe(48)

			expect(iterationFunctionCalls[ 27 ].args[ 0 ]).toBe(50)
			expect(iterationFunctionCalls[ 28 ].args[ 0 ]).toBe(51)
			expect(iterationFunctionCalls[ 29 ].args[ 0 ]).toBe(52)
			expect(iterationFunctionCalls[ 30 ].args[ 0 ]).toBe(53)
			expect(iterationFunctionCalls[ 31 ].args[ 0 ]).toBe(54)
			expect(iterationFunctionCalls[ 32 ].args[ 0 ]).toBe(55)
			expect(iterationFunctionCalls[ 33 ].args[ 0 ]).toBe(56)
			expect(iterationFunctionCalls[ 34 ].args[ 0 ]).toBe(57)
			expect(iterationFunctionCalls[ 35 ].args[ 0 ]).toBe(58)
		})
	})

	describe('exporting frames (and of course animating)', () => {
		const startAnimationFrame = 2
		const endAnimationFrame = 5
		beforeEach(() => {
			animating = true
			exportFrames = true
			settings.initial.animation = {
				startAnimationFrame,
				endAnimationFrame,
				frameRate: 0
			}
		})

		it('saves the canvas for each animation frame', done => {
			execute.__ResetDependency__('animator')
			// animator.__Rewire__('exportFrame')
			const exportFrameSpy = jasmine.createSpy()
			execute.__Rewire__('exportFrame', exportFrameSpy)

			const interval = setInterval(() => {
				current.lastSavedFrame++
				if (current.lastSavedFrame >= endAnimationFrame) {
					clearInterval(interval)
					execute.__ResetDependency__('exportFrame')
					done()
				}
				// expect(canvas.toBlob.calls.all().length).toBe(current.lastSavedFrame - startAnimationFrame)
				// const saveAsCalls = fileSaver.saveAs.calls.all()
				// expect(saveAsCalls.length).toBe(current.lastSavedFrame - startAnimationFrame)
				// expect(saveAsCalls[saveAsCalls.length - 1].args[1]).toEqual((current.lastSavedFrame - 1) + ".png")
				expect(exportFrameSpy.calls.all().length).toBe(current.lastSavedFrame - startAnimationFrame)
			}, 25)

			execute({ iterating, animating, exportFrames, performanceLogging })

		})

		// afterEach(() => {
									// animator.__ResetDependency__('exportFrame')

		// })
	})
})
