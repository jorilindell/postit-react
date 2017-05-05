// @flow

import {fork} from 'redux-saga/effects'
import boardSaga from '../board/saga'
import boardDetailsSaga from '../boarddetails/saga'

export default () =>
  // $FlowFixMe
  function* rootSaga() {
    yield [
      fork(boardSaga),
      fork(boardDetailsSaga),
    ]
  }
