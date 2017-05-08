// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {BoardDetailsType, BoardDetailModalType} from './types'

export const boardDetailsReducer: Reducer<BoardDetailsType> = handleActions({
  RECEIVE_BOARD_DETAILS: (state, {payload}) => payload,
  HANDLE_CREATED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, notes: []}
    let exist = false
    for(let i = state.notes.length - 1; i >= 0; i--) {
      if(state.notes[i].id === payload.id) {
        exist = true
        break
      }
    }
    if(!exist) {
      state.notes.push({id: payload.id, message: payload.message, done: payload.done})
    }
    newState.notes = state.notes
    return newState
  },
  HANDLE_EDITED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, notes: []}
    newState.notes = state.notes.map( (note) => note.id !== payload.id ? note : {id: payload.id, message: payload.message, done: payload.done} )
    return newState
  },
  HANDLE_DELETED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, notes: []}
    newState.notes = state.notes.filter((note) => note.id !== payload.id)
    return newState
  }
}, {name: '', notes: []})

export const boardDetailsModalReducer: Reducer<BoardDetailModalType> = handleActions({
  CHANGE_DETAILS_MODAL_STATUS: (state, {payload}) => payload,
}, {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false})

export default combineReducers({
  boarddetails: boardDetailsReducer,
  detailmodals: boardDetailsModalReducer,
})
