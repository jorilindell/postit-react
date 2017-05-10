// @flow

import {combineReducers} from 'redux'
import boardReducer from '../board/reducer'
import boardDetailsReducer from '../boarddetails/reducer'
import type {Reducer} from '../types'
import type {RootState} from './types'
import {reducer as formReducer} from 'redux-form'


export default (): Reducer<RootState> =>
  combineReducers({
    board: boardReducer,
    activeboard: boardDetailsReducer,
    form: formReducer,
  })
