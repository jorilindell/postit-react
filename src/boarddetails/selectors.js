// @flow

import type {Selector} from '$src/types'
import type {Note, BoardDetailModalType} from './types'

export const getBoardName: Selector<string, *> = (state) =>  state.activeboard.boarddetails.name
export const getNotes: Selector<Array<Note>, *> = (state) => {
  const filteredNotes = state.activeboard.boarddetails.notes.filter((note) => note.message.toLowerCase().includes(state.activeboard.boarddetails.searchValue.toLowerCase()))
  return filteredNotes
}

export const getNumberOfHiddenNotes: Selector<number, *> = (state) => {
  const filteredNotes = state.activeboard.boarddetails.notes.filter((note) => note.message.toLowerCase().includes(state.activeboard.boarddetails.searchValue.toLowerCase()))
  return state.activeboard.boarddetails.notes.length - filteredNotes.length
}

export const getPaginatedNotes: Selector<Array<Note>, *> = (state) => {
  const filteredNotes = state.activeboard.boarddetails.notes.filter((note) => note.message.toLowerCase().includes(state.activeboard.boarddetails.searchValue.toLowerCase()))
  filteredNotes.sort((a, b) => {
    if(state.activeboard.boarddetails.sortField === 'message') {
      if(state.activeboard.boarddetails.sortAsc) {
        return a.message.toLowerCase() > b.message.toLowerCase() ? 1 : a.message.toLowerCase() < b.message.toLowerCase() ? -1 : 0
      } else {
        return b.message.toLowerCase() > a.message.toLowerCase() ? 1 : b.message.toLowerCase() < a.message.toLowerCase() ? -1 : 0
      }
    } else if (state.activeboard.boarddetails.sortField === 'done') {
      if(state.activeboard.boarddetails.sortAsc) {
        return a.done - b.done
      } else {
        return b.done - a.done
      }
    }
  })
  const firstNoteIndex =  state.activeboard.boarddetails.activePage * state.activeboard.boarddetails.pageSize > filteredNotes.length ?
    filteredNotes.length : state.activeboard.boarddetails.activePage * state.activeboard.boarddetails.pageSize
  const lastNoteIndex =  (state.activeboard.boarddetails.activePage + 1) * state.activeboard.boarddetails.pageSize > filteredNotes.length ?
    filteredNotes.length  : (state.activeboard.boarddetails.activePage + 1) * state.activeboard.boarddetails.pageSize
  return filteredNotes.slice(firstNoteIndex, lastNoteIndex)
}


export const getActivePage: Selector<number, *> = (state) =>  {
  const max = (state.activeboard.boarddetails.notes.length) / state.activeboard.boarddetails.pageSize
  state.activeboard.boarddetails.activePage = state.activeboard.boarddetails.activePage > max ? max: state.activeboard.boarddetails.activePage
  return state.activeboard.boarddetails.activePage
}
export const getSortOrder: Selector<boolean, *> = (state) =>  state.activeboard.boarddetails.sortAsc
export const getSortField: Selector<string, *> = (state) =>  state.activeboard.boarddetails.sortField
export const getPageSize: Selector<number, *> = (state) =>  state.activeboard.boarddetails.pageSize
export const getSearchValue: Selector<string, *> = (state) => state.activeboard.boarddetails.searchValue
export const getBoardDetailModals: Selector<BoardDetailModalType, *> = (state) => state.activeboard.detailmodals
