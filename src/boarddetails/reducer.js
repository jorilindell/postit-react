// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {BoardDetailsType, BoardDetailModalType} from './types'

export const boardDetailsReducer: Reducer<BoardDetailsType> = handleActions({
  RECEIVE_BOARD_DETAILS: (state, {payload}) => payload,
}, {name: '', notes: []})

export const boardDetailsModalReducer: Reducer<BoardDetailModalType> = handleActions({
  CHANGE_DETAILS_MODAL_STATUS: (state, {payload}) => payload,
}, {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false})

export default combineReducers({
  boarddetails: boardDetailsReducer,
  detailmodals: boardDetailsModalReducer,
})
