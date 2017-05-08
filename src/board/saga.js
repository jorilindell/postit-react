// @flow

import {takeLatest} from 'redux-saga'
import {fork, put} from 'redux-saga/effects'
import {receiveBoards, handleCreatedBoard, handleEditedBoard, handleDeletedBoard, changeBoardModalStatuses} from './actions'
import {allModalsDisabled} from './Boards'

function* fetchBoards(): Generator<> {
  const response = yield fetch(`${API_URL}/boards`)
  const boards = yield response.json()
  yield put(receiveBoards(boards))
}

function* addBoard(args): Generator<> {
  const response = yield fetch(`${API_URL}/boards/`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: args.payload.name,
      }),
    })
  switch (response.status) {
    case 200: {
      const createdBoard = yield response.json()
      // Hide Add note modal
      yield put(changeBoardModalStatuses(allModalsDisabled))
      // Update board details view
      yield put(handleCreatedBoard(createdBoard))
      break
    }
    case 400: {
      const errormessage = yield response.json()
      alert(`Cannot create new board: ${errormessage.invalidAttributes.name[0].message}`)
      break
    }
    default: {
      // If case of error show error message
      alert('Board creation failed')
      break
    }
  }
}

function* editBoard(args): Generator<> {
  const response = yield fetch(`${API_URL}/boards/${args.payload.boardId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        name: args.payload.name,
      }),
    })
  switch (response.status) {
    case 200: {
      const editedBoard = yield response.json()
      // Hide Add note modal
      yield put(changeBoardModalStatuses(allModalsDisabled))
      // Update board details view
      yield put(handleEditedBoard(editedBoard[0]))
      break
    }
    case 400: {
      const errormessage = yield response.json()
      alert(`Cannot save board: ${errormessage.invalidAttributes.name[0].message}`)
      break
    }
    default: {
      // If case of error show error message
      alert('Board creation failed')
      break
    }
  }
}

function* deleteBoard(args): Generator<> {
  const response = yield fetch(`${API_URL}/boards/${args.payload.boardId}`,
    {
      method: 'DELETE',
    })
  switch (response.status) {
    case 200: {
      const deletedBoard = yield response.json()
      // Hide Add note modal
      yield put(changeBoardModalStatuses(allModalsDisabled))
      // Update board details view
      yield put(handleDeletedBoard(deletedBoard[0]))
      break
    }
    default: {
      // If case of error show error message
      alert('Deleting board failed')
      break
    }
  }
}

export default function* (): Generator<> {
  yield [
    fork(function* (): Generator<> {
      yield takeLatest('FETCH_BOARDS', fetchBoards),
      yield takeLatest('ADD_BOARD', addBoard)
      yield takeLatest('EDIT_BOARD', editBoard),
      yield takeLatest('DELETE_BOARD', deleteBoard)
    }),
  ]
}
