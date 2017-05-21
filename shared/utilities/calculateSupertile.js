import { STANDARD_SUPERTILE } from '../constants'
import { GONGRAM_SUPERTILE } from '../../gongram/gongramConstants'
import state from '../../state'

export default () => state.shared.gongramColors ? GONGRAM_SUPERTILE : STANDARD_SUPERTILE