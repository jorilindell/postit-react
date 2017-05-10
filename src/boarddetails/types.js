// @flow
export type BoardDetailsType = {
  name: string,
  sortAsc: boolean,
  sortField: string,
  notes: Array<Object>
}
export type Note = {
  id: number,
  message: string,
  done: boolean,
}
export type BoardDetailModalType = {
  isAddNoteModalOpen: boolean,
  isEditNoteModalOpen: boolean,
  isDeleteNoteModalOpen: boolean,
}
