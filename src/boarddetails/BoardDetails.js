// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchBoardDetails, addNoteAction, editNoteAction, deleteNoteAction,
  setDoneAction, setUndoneAction, changeDetailModalStatuses} from './actions'
import {getBoardDetails, getBoardDetailModals} from './selectors'
import css from '../styles/common.css'
import {Header} from '../common/Header'
import {EmptyTableFooter} from '../common/EmptyTableFooter'
import {SectionHeader} from '../common/SectionHeader'
import {DeleteNoteModal} from './DeleteNoteModal'
import {AddNoteForm} from './AddNoteForm'
import {EditNoteForm} from './EditNoteForm'
import {Breadcrumb} from '../common/Breadcrumb'


import type {RootState} from '$src/root/types'
import type {BoardDetailsType, BoardDetailModalType} from './types'

const addModalEnabled = {isAddNoteModalOpen: true, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false}
const editModalEnabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: true, isDeleteNoteModalOpen: false}
const deleteModalEnabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: true}
export const allModalsDisabled = {isAddNoteModalOpen: false, isEditNoteModalOpen: false, isDeleteNoteModalOpen: false}

type Props = {
  boarddetails: BoardDetailsType,
  modalStatuses: BoardDetailModalType,
  fetchBoardDetails: Function,
  addNoteAction: Function,
  editNoteAction: Function,
  deleteNoteAction: Function,
  setDoneAction: Function,
  setUndoneAction: Function,
  changeDetailModalStatuses: Function,
  params: React.PropTypes.object,
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
        <div className={css.content}>
          <Breadcrumb currentlocation={this.props.boarddetails.name} links={[{href: '/', name: 'Boards'}]} />
          <div className={css.container}>
            <SectionHeader title='Notes' amount={this.props.boarddetails.notes.length} buttonAction={this.showAddNoteModal}></SectionHeader>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>Message</th>
                  <th className={css.statusColumn}>Status</th>
                  <th className={css.actionColumn}></th>
                </tr>
              </thead>
              {this.props.boarddetails.notes.length > 0 ? (
                <tbody>
                {
                  this.props.boarddetails.notes.map((note) =>
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
                <EmptyTableFooter cols='3' text='No added notes' />
              )}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  boarddetails: getBoardDetails(state),
  modalStatuses: getBoardDetailModals(state),
})

export default connect(mapStateToProps, {
  fetchBoardDetails, addNoteAction, editNoteAction, deleteNoteAction,
  setDoneAction, setUndoneAction, changeDetailModalStatuses}) (BoardDetails)
