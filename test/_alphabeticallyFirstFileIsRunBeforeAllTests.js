import '../vendor/canteen.min'
import 'jasmine'
import state from '../state/state'
import defaultState from '../state/defaultState'
import applicationUtilities from '../utilities/applicationUtilities'

beforeEach(() => {
	applicationUtilities.resetObject({ objectToReset: state, objectToResetTo: defaultState })
})
