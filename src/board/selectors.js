// @flow

import type {Selector} from '$src/types'
import type {Board, BoardModalType} from './types'

export const getBoards: Selector<Array<Board>, *> = (state) => {
  const filteredBoards = state.board.boards.boards.filter((board) => board.name.toLowerCase().includes(state.board.boards.searchValue.toLowerCase()))
  return filteredBoards
}
export const getNumberOfHiddenBoards: Selector<number, *> = (state) => {
  const filteredBoards = state.board.boards.boards.filter((board) => board.name.toLowerCase().includes(state.board.boards.searchValue.toLowerCase()))
  return state.board.boards.boards.length - filteredBoards.length
}

export const getPaginatedBoards: Selector<Array<Board>, *> = (state) => {
  const filteredBoards = state.board.boards.boards.filter((board) => board.name.toLowerCase().includes(state.board.boards.searchValue.toLowerCase()))
  filteredBoards.sort((a, b) => {
    if(state.board.boards.sortAsc) {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0
    } else {
      return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : b.name.toLowerCase() < a.name.toLowerCase() ? -1 : 0
    }
  })
  const firstNoteIndex =  state.board.boards.activePage * state.board.boards.pageSize > filteredBoards.length ?
    filteredBoards.length : state.board.boards.activePage * state.board.boards.pageSize
  const lastNoteIndex =  (state.board.boards.activePage + 1) * state.board.boards.pageSize > filteredBoards.length ?
    filteredBoards.length  : (state.board.boards.activePage + 1) * state.board.boards.pageSize

  return filteredBoards.slice(firstNoteIndex, lastNoteIndex)
}

export const getActivePage: Selector<number, *> = (state) =>  state.board.boards.activePage
export const getSortOrder: Selector<boolean, *> = (state) => state.board.boards.sortAsc
export const getPageSize: Selector<number, *> = (state) =>  state.board.boards.pageSize
export const getSearchValue: Selector<string, *> = (state) => state.board.boards.searchValue
export const getBoardModals: Selector<BoardModalType, *> = (state) => state.board.boardmodals
