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
export const editNoteAction =
    createAction('EDIT_NOTE')
export const deleteNoteAction =
    createAction('DELETE_NOTE')
export const setDoneAction =
    createAction('SET_NOTE_DONE')
export const setUndoneAction =
    createAction('SET_NOTE_UNDONE')
