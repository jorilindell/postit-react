// @flow

import type {Selector} from '$src/types'
import type {BoardDetailsType, BoardDetailModalType} from './types'

export const getBoardDetails: Selector<BoardDetailsType, *> = (state) => state.activeboard.boarddetails
export const getBoardDetailModals: Selector<BoardDetailModalType, *> = (state) => state.detailmodals.detailmodals
