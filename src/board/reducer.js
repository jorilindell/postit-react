// @flow

import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import type {Reducer} from '../types'
import type {Board, BoardModalType} from './types'

export const boardReducer: Reducer<Array<Board>> = handleActions({
  RECEIVE_BOARDS: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.boards = payload.map((board) => {
      return(board)
    })
    return newState
  },
  HANDLE_CREATED_BOARD: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.boards = state.boards
    newState.boards.push({id: payload.id, name: payload.name})
    return newState
  },
  HANDLE_EDITED_BOARD: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.boards = state.boards.map( (board) => board.id !== payload.id ? board : {id: payload.id, name: payload.name} )
    return newState
  },
  HANDLE_DELETED_BOARD: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.boards = state.boards.filter((board) => board.id !== payload.id)
    if((newState.boards.length - 1) / newState.pageSize < newState.activePage) {
      newState.activePage = Math.floor((newState.boards.length -1) / newState.pageSize)
    }
    return newState
  },
  CHANGE_BOARD_SORT_ORDER: (state) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.sortAsc = state.sortAsc ? false : true
    newState.boards = state.boards
    return newState
  },
  SET_ACTIVE_BOARD_PAGE: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.activePage = payload.pagenumber
    newState.boards = state.boards
    return newState
  },
  SET_BOARD_PAGE_SIZE: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.activePage = 0
    newState.pageSize = payload.size
    newState.boards = state.boards
    return newState
  },
  SET_BOARD_SEARCH_VALUE: (state, {payload}) => {
    const newState = {boards: [], sortAsc: state.sortAsc, activePage: state.activePage, pageSize: state.pageSize, searchValue: state.searchValue}
    newState.searchValue = payload.text
    newState.activePage = 0
    newState.boards = state.boards
    return newState
  },
}, {boards: [], sortAsc: true, activePage: 0, pageSize: 5, searchValue: ''})

export const boardModalReducer: Reducer<BoardModalType> = handleActions({
  CHANGE_BOARD_MODAL_STATUS: (state, {payload}) => {
    return payload
  },
}, {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false})

export default combineReducers({
  boards: boardReducer,
  boardmodals: boardModalReducer,
})
