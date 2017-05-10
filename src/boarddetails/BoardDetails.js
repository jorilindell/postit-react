// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchBoardDetails, addNoteAction, editNoteAction, deleteNoteAction, changeNoteSortOrder,
  setActiveNotePage, setNotePageSize, setNoteSearchValue, setDoneAction, setUndoneAction, changeDetailModalStatuses} from './actions'
import {getBoardName, getNotes, getNumberOfHiddenNotes, getSortOrder, getSortField,
  getBoardDetailModals, getActivePage, getPageSize, getSearchValue, getPaginatedNotes} from './selectors'
import css from '../styles/common.css'
import {AddNoteForm} from './AddNoteForm'
import {EditNoteForm} from './EditNoteForm'
import {DeleteNoteModal} from './DeleteNoteModal'
import {Header} from '../common/Header'
import {EmptyTableFooter} from '../common/EmptyTableFooter'
import {SectionHeader} from '../common/SectionHeader'
import {Breadcrumb} from '../common/Breadcrumb'
import {Pagination} from '../common/Pagination'


import type {RootState} from '$src/root/types'
import type {Note, BoardDetailModalType} from './types'

const addModalEnabled = {isAddNoteModalOpen: true, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false}
const editModalEnabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: true, isDeleteNoteModalOpen: false}
const deleteModalEnabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: true}
export const allModalsDisabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false}

type Props = {
  boardName: name,
  notes: Array<Note>,
  hiddenNotesAmount: number,
  paginatedNotes: Array<Note>,
  activePage: number,
  pageSize: number,
  sortAsc: boolean,
  sortField: string,
  searchValue: string,
  modalStatuses: BoardDetailModalType,
  fetchBoardDetails: Function,
  addNoteAction: Function,
  editNoteAction: Function,
  deleteNoteAction: Function,
  changeNoteSortOrder: Function,
  setActiveNotePage: Function,
  setNotePageSize: Function,
  setNoteSearchValue: Function,
  setDoneAction: Function,
  setUndoneAction: Function,
  changeDetailModalStatuses: Function,
  params: React.PropTypes.object,
}
const sortStyle = {
  marginLeft: '10px',
}
const sortableHeader = {
  cursor: 'pointer',
}

export class BoardDetails extends Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      activeNote: {id: 0, message: ''},
    }
  }

  showAddNoteModal = () => {
    this.props.changeDetailModalStatuses(addModalEnabled)
  }

  closeAddNoteModal = () => {
    this.props.changeDetailModalStatuses(allModalsDisabled)
  }

  addNote = (noteMessage) => {
    this.props.addNoteAction({
      message: noteMessage,
      boardId: this.props.params.boardId})
  }

  showEditNoteModal = (note) => {
    this.setState({
      activeNote: note,
    })
    this.props.changeDetailModalStatuses(editModalEnabled)
  }

  closeEditNoteModal = () => {
    this.props.changeDetailModalStatuses(allModalsDisabled)
  }

  saveNote = (noteMessage) => {
    this.props.editNoteAction({
      message: noteMessage,
      noteId: this.state.activeNote.id,
      boardId: this.props.params.boardId})
  }

  setStatusToDone = (note) => {
    this.props.setDoneAction({noteId: note.id, boardId: this.props.params.boardId})
  }

  setStatusToUndone = (note) => {
    this.props.setUndoneAction({noteId: note.id, boardId: this.props.params.boardId})
  }

  showDeleteNoteModal = (note) => {
    this.setState({
      activeNote: note,
    })
    this.props.changeDetailModalStatuses(deleteModalEnabled)
  }

  closeDeleteNoteModal = () => {
    this.props.changeDetailModalStatuses(allModalsDisabled)
  }

  deleteNote = () => {
    this.props.deleteNoteAction({
      noteId: this.state.activeNote.id,
      boardId: this.props.params.boardId})
  }
  setActivePage = (page) => {
    this.props.setActiveNotePage({pagenumber: page})
  }
  setPageSize = (e) => {
    this.props.setNotePageSize({size: e.target.value})
  }
  setSearchValue = (e) => {
    this.props.setNoteSearchValue({text: e.target.value})
  }
  componentWillMount() {
    this.props.fetchBoardDetails({boardId: this.props.params.boardId})
  }

  render() {
    return (
      <div className={css.page}>
        {this.props.modalStatuses.isAddNoteModalOpen &&
          <AddNoteForm  onCancel={this.closeAddNoteModal} onSubmit={(note) => {this.addNote(note.message)}} initialValues={{message: ''}}/>
        }
        {this.props.modalStatuses.isEditNoteModalOpen &&
          <EditNoteForm onCancel={this.closeEditNoteModal} onSubmit={(note) => {this.saveNote(note.message)}} initialValues={{message: this.state.activeNote.message}}/>
        }
        {this.props.modalStatuses.isDeleteNoteModalOpen &&
          <DeleteNoteModal message={this.state.activeNote.message} onDelete={() => {this.deleteNote()}} onCancel={this.closeDeleteNoteModal} />
        }
        <Header></Header>
        <div className={css.contentWithBreadcrumb}>
          <Breadcrumb currentlocation={this.props.boardName} links={[{href: '/', name: 'Boards'}]} />
          <div className={css.container}>
            <SectionHeader hiddenItemsN={this.props.hiddenNotesAmount} search={this.setSearchValue} searchValue={this.props.searchValue} title='Notes' amount={this.props.notes.length} buttonAction={this.showAddNoteModal}></SectionHeader>
            <table className={css.table}>
              <thead>
                <tr>
                  <th style={sortableHeader} onClick={() => this.props.changeNoteSortOrder({field: 'message'})}>
                    <span>Message</span>
                    {this.props.sortField === 'message' && this.props.sortAsc &&
                      <span className="fa fa-sort-amount-asc" style={sortStyle}></span>
                    }
                    {this.props.sortField === 'message' && !this.props.sortAsc &&
                      <span className="fa fa-sort-amount-desc" style={sortStyle}></span>
                    }
                  </th>
                  <th className={css.statusColumn} style={sortableHeader} onClick={() => this.props.changeNoteSortOrder({field: 'done'})}>
                    <span>Status</span>
                    {this.props.sortField === 'done' && this.props.sortAsc &&
                      <span className="fa fa-sort-amount-asc" style={sortStyle}></span>
                    }
                    {this.props.sortField === 'done' && !this.props.sortAsc &&
                      <span className="fa fa-sort-amount-desc" style={sortStyle}></span>
                    }
                  </th>
                  <th className={css.actionColumn}></th>
                </tr>
              </thead>
              {this.props.notes.length > 0 ? (
                <tbody>
                {
                  this.props.paginatedNotes.map((note) =>
                    <tr key={note.id}>
                      <td><span>{note.message}</span></td>
                      {note.done ? (
                        <td>
                          <span className={css.statusDone}>Done</span>
                          <button className={css.btnUndone} onClick={() => this.setStatusToUndone(note)}><span className='fa fa-close'></span></button>
                        </td>
                      ) : (
                        <td>
                          <span className={css.statusUndone}>Undone</span>
                          <button className={css.btnDone} onClick={() => this.setStatusToDone(note)}><span className='fa fa-check'></span></button>
                        </td>
                      )}
                      <td>
                        <button className={css.btnAction} onClick={() => this.showEditNoteModal(note)}><span className='fa fa-edit'></span></button>
                        <button className={css.btnAction} onClick={() => this.showDeleteNoteModal(note)}><span className='fa fa-trash'></span></button>
                      </td>
                    </tr>
                  )
                }
                </tbody>
              ):
              (
                <EmptyTableFooter cols='3' text='No notes found' />
              )}
            </table>
            <Pagination selectPageSize={this.setPageSize} selectPage={this.setActivePage} arraySize={this.props.notes.length} pageSize={this.props.pageSize} activePage={this.props.activePage}></Pagination>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  boardName: getBoardName(state),
  notes: getNotes(state),
  hiddenNotesAmount: getNumberOfHiddenNotes(state),
  paginatedNotes: getPaginatedNotes(state),
  activePage: getActivePage(state),
  pageSize: getPageSize(state),
  sortAsc: getSortOrder(state),
  sortField: getSortField(state),
  searchValue: getSearchValue(state),
  modalStatuses: getBoardDetailModals(state),
})

export default connect(mapStateToProps, {
  fetchBoardDetails, addNoteAction, editNoteAction, deleteNoteAction, changeNoteSortOrder, setActiveNotePage, setNotePageSize,
  setDoneAction, setUndoneAction, setNoteSearchValue, changeDetailModalStatuses}) (BoardDetails)
