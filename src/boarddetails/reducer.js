// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {BoardDetailsType, BoardDetailModalType} from './types'

export const boardDetailsReducer: Reducer<BoardDetailsType> = handleActions({
  RECEIVE_BOARD_DETAILS: (state, {payload}) => {
    const newState = {name: payload.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.notes = payload.notes
    return newState
  },
  HANDLE_CREATED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.notes = state.notes
    newState.notes.push({id: payload.id, message: payload.message, done: payload.done})
    return newState
  },
  HANDLE_EDITED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.notes = state.notes.map( (note) => note.id !== payload.id ? note : {id: payload.id, message: payload.message, done: payload.done} )
    return newState
  },
  HANDLE_DELETED_NOTE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.notes = state.notes.filter((note) => note.id !== payload.id)
    if((newState.notes.length - 1) / newState.pageSize < newState.activePage) {
      newState.activePage = Math.floor((newState.notes.length -1) / newState.pageSize)
    }
    return newState
  },
  CHANGE_NOTE_SORT_ORDER: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    if(payload.field !== state.sortField) {
      newState.sortAsc = true
      newState.sortField = payload.field
    } else {
      newState.sortAsc = state.sortAsc ? false : true
    }
    newState.notes = state.notes
    return newState
  },
  SET_ACTIVE_NOTE_PAGE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.activePage = payload.pagenumber
    newState.notes = state.notes
    return newState
  },
  SET_NOTE_PAGE_SIZE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.activePage = 0
    newState.pageSize = payload.size
    newState.notes = state.notes
    return newState
  },
  SET_NOTE_SEARCH_VALUE: (state, {payload}) => {
    const newState = {name: state.name, sortAsc: state.sortAsc, sortField: state.sortField, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue, notes: []}
    newState.searchValue = payload.text
    newState.activePage = 0
    newState.notes = state.notes
    return newState
  },
}, {name: '', sortAsc: true, sortField: 'message', activePage: 0, pageSize: 5, searchValue: '', notes: []})

export const boardDetailsModalReducer: Reducer<BoardDetailModalType> = handleActions({
  CHANGE_DETAILS_MODAL_STATUS: (state, {payload}) => {
    return(
      payload
    )
  },
}, {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false})

export default combineReducers({
  boarddetails: boardDetailsReducer,
  detailmodals: boardDetailsModalReducer,
})
