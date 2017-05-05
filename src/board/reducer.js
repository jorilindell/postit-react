// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {Board, BoardModalType} from './types'

export const boardReducer: Reducer<Array<Board>> = handleActions({
  RECEIVE_BOARDS: (state, {payload}) => payload,
}, [])

export const boardModalReducer: Reducer<BoardModalType> = handleActions({
  CHANGE_BOARD_MODAL_STATUS: (state, {payload}) => payload,
}, {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false})

export default combineReducers({
  boards: boardReducer,
  boardmodals: boardModalReducer,
})
