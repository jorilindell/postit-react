// @flow

import type {BoardState} from '../board/types'
import type {BoardDetailsState} from '../boarddetails/types'

export type RootState = {
  board: BoardState,
  boarddetails: BoardDetailsState,
}
