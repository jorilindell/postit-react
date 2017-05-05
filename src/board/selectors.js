// @flow

import type {Selector} from '$src/types'
import type {Board, BoardModalType} from './types'

export const getBoards: Selector<Array<Board>, *> = (state) => state.board.boards
export const getBoardModals: Selector<BoardModalType, *> = (state) => state.boardmodals.boardmodals
