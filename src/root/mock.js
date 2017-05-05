// @flow

import {mockBoardState} from '../board/mock'

import type {RootState} from './types'

export const mockRootState = (): RootState => ({
  board: mockBoardState(),
})
