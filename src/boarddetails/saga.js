// @flow

import {takeLatest} from 'redux-saga'
import {fork, put} from 'redux-saga/effects'
import {receiveBoardDetails, changeDetailModalStatuses} from './actions'
import {allModalsDisabled} from './BoardDetails'

function* fetchBoardDetails(args): Generator<> {
  const response = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
  const boarddetails = yield response.json()
  yield put(receiveBoardDetails(boarddetails))
}

function* addNote(args): Generator<> {
  const response = yield fetch(`${API_URL}/notes/${args.payload.boardId}`,
    {
      method: 'POST',
      body: JSON.stringify({
        message: args.payload.message,
      }),
    }
  )
  switch (response.status) {
    case 200: {
      // Hide Add note modal
      yield put(changeDetailModalStatuses(allModalsDisabled))
      // Update board details view
      const detailsResponse = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
      const boarddetails = yield detailsResponse.json()
      yield put(receiveBoardDetails(boarddetails))
      break
    }
    default: {
      // If case of error show error message
      alert('Note creation failed')
      break
    }
  }
}

function* editNote(args): Generator<> {
  const response = yield fetch(`${API_URL}/notes/${args.payload.noteId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: args.payload.message,
      }),
    }
  )
  switch (response.status) {
    case 200: {
      // Hide Edit note modal
      yield put(changeDetailModalStatuses(allModalsDisabled))
      // Update board details view
      const detailsResponse = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
      const boarddetails = yield detailsResponse.json()
      yield put(receiveBoardDetails(boarddetails))
      break
    }
    default: {
      // If case of error show error message
      alert('Editing note settings failed')
      break
    }
  }
}

function* deleteNote(args): Generator<> {
  const response = yield fetch(`${API_URL}/notes/${args.payload.noteId}`, {method: 'DELETE'})
  switch (response.status) {
    case 200: {
      // Hide Delete note modal
      yield put(changeDetailModalStatuses(allModalsDisabled))
      // Update board details view
      const detailsResponse = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
      const boarddetails = yield detailsResponse.json()
      yield put(receiveBoardDetails(boarddetails))
      break
    }
    case 404:
      alert(`Note with id ${args.payload.noteId} doesn't exists`)
      break
    default: {
      // If case of error show error message
      alert('Note deletion failed')
      break
    }
  }
}

function* setDone(args): Generator<> {
  const response = yield fetch(`${API_URL}/notes/${args.payload.noteId}/done`, {method: 'PUT'})
  switch (response.status) {
    case 200: {
      // Update board details view
      const detailsResponse = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
      const boarddetails = yield detailsResponse.json()
      yield put(receiveBoardDetails(boarddetails))
      break
    }
    default: {
      // If case of error show error message
      alert('Saving note settings failed')
      break
    }
  }
}

function* setUndone(args): Generator<> {
  const response = yield fetch(`${API_URL}/notes/${args.payload.noteId}/undone`, {method: 'PUT'})
  switch (response.status) {
    case 200: {
      // Update board details view
      const detailsResponse = yield fetch(`${API_URL}/boards/${args.payload.boardId}`)
      const boarddetails = yield detailsResponse.json()
      yield put(receiveBoardDetails(boarddetails))
      break
    }
    default: {
      // If case of error show error message
      alert('Saving note settings failed')
      break
    }
  }
}

export default function* (): Generator<> {
  yield [
    fork(function* (): Generator<> {
      yield takeLatest('FETCH_BOARD_DETAILS', fetchBoardDetails),
      yield takeLatest('ADD_NOTE', addNote),
      yield takeLatest('EDIT_NOTE', editNote),
      yield takeLatest('DELETE_NOTE', deleteNote),
      yield takeLatest('SET_NOTE_DONE', setDone),
      yield takeLatest('SET_NOTE_UNDONE', setUndone)
    }),
  ]
}
