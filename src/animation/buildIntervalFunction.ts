import state from '../state'
import windowWrapper from '../utilities/windowWrapper'

const buildIntervalFunction: {
	({}: { animationFunction(): void, stopConditionFunction(): boolean }): () => void,
} = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) {
		windowWrapper.clearInterval(state.interval)
	}
}

export default buildIntervalFunction
