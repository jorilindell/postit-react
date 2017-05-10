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
export const changeBoardSortOrder =
  createAction('CHANGE_BOARD_SORT_ORDER')
export const setActiveBoardPage =
  createAction('SET_ACTIVE_BOARD_PAGE')
export const setBoardPageSize =
  createAction('SET_BOARD_PAGE_SIZE')
export const setBoardSearchValue =
  createAction('SET_BOARD_SEARCH_VALUE')
