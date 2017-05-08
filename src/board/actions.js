// @flow

import {createAction} from 'redux-actions'

export const fetchBoards =
  createAction('FETCH_BOARDS')
export const receiveBoards =
  createAction('RECEIVE_BOARDS')
export const changeBoardModalStatuses =
  createAction('CHANGE_BOARD_MODAL_STATUS')
export const addBoardAction =
  createAction('ADD_BOARD')
export const handleCreatedBoard =
  createAction('HANDLE_CREATED_BOARD')
export const editBoardAction =
  createAction('EDIT_BOARD')
export const handleEditedBoard =
    createAction('HANDLE_EDITED_BOARD')
export const deleteBoardAction =
  createAction('DELETE_BOARD')
export const handleDeletedBoard =
  createAction('HANDLE_DELETED_BOARD')
