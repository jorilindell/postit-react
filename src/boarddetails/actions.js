// @flow

import {createAction} from 'redux-actions'

//export const fetchBoardDetails = (boardId) => ({type: 'FETCH_BOARD_DETAILS', boardId})
export const fetchBoardDetails =
  createAction('FETCH_BOARD_DETAILS')
export const receiveBoardDetails =
  createAction('RECEIVE_BOARD_DETAILS')
export const changeDetailModalStatuses =
  createAction('CHANGE_DETAILS_MODAL_STATUS')
export const addNoteAction =
  createAction('ADD_NOTE')
export const handleCreatedNote =
  createAction('HANDLE_CREATED_NOTE')
export const editNoteAction =
  createAction('EDIT_NOTE')
export const handleEditedNote =
  createAction('HANDLE_EDITED_NOTE')
export const deleteNoteAction =
  createAction('DELETE_NOTE')
export const handleDeletedNote =
  createAction('HANDLE_DELETED_NOTE')
export const setDoneAction =
  createAction('SET_NOTE_DONE')
export const setUndoneAction =
  createAction('SET_NOTE_UNDONE')
export const changeNoteSortOrder =
  createAction('CHANGE_NOTE_SORT_ORDER')
export const setActiveNotePage =
  createAction('SET_ACTIVE_NOTE_PAGE')
export const setNotePageSize =
  createAction('SET_NOTE_PAGE_SIZE')
export const setNoteSearchValue =
  createAction('SET_NOTE_SEARCH_VALUE')
