// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {Board, BoardModalType} from './types'

export const boardReducer: Reducer<Array<Board>> = handleActions({
  RECEIVE_BOARDS: (state, {payload}) => payload,
  HANDLE_CREATED_BOARD: (state, {payload}) => {
    return [...state, {id: payload.id, name: payload.name}]
  },
  HANDLE_EDITED_BOARD: (state, {payload}) => {
    return state.map((board) => board.id != payload.id ? board : {id: payload.id, name: payload.name})
  },
  HANDLE_DELETED_BOARD: (state, {payload}) => {
    return state.filter((board) => board.id !== payload.id)
  },
}, [])

export const boardModalReducer: Reducer<BoardModalType> = handleActions({
  CHANGE_BOARD_MODAL_STATUS: (state, {payload}) => {
    return payload
  },
}, {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false})

export default combineReducers({
  boards: boardReducer,
  boardmodals: boardModalReducer,
})
