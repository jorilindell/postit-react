// @flow

import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {ToastContainer, ToastMessage} from 'react-toastr'

import {fetchBoards, addBoardAction, editBoardAction, deleteBoardAction, changeBoardModalStatuses} from './actions'
import {AddBoardModal, EditBoardModal, DeleteBoardModal} from './BoardModals.js'
import {getBoards, getBoardModals} from './selectors'
import {Header} from '../common/Header.js'
import css from '../styles/common.css'

import type {RootState} from '$src/root/types'
import type {Board, BoardModalType} from './types'

//var ToastMessageFactory = React.createFactory(ToastMessage.animation)

const addModalEnabled = {isAddBoardModalOpen: true, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false}
const editModalEnabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: true, isDeleteBoardModalOpen: false}
const deleteModalEnabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: true}
export const allModalsDisabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false}

type Props = {
  boards: Array<Board>,
  modalStatuses: BoardModalType,
  fetchBoards: Function,
  addBoardAction: Function,
  editBoardAction: Function,
  deleteBoardAction: Function,
  changeBoardModalStatuses: Function,
  params: React.PropTypes.object,
}

export class Boards extends Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      activeBoard: {id: 0, name: ''},
    }
  }
  /*
  showSuccessMessage(title, message) {
    this.refs.container.success(message, title, {
      closeButton: true,
    })
  }

  showErrorMessage(title, message) {
    this.refs.container.error(message, title, {
      closeButton: true,
    })
  }
  */

  componentWillMount() {
    this.props.fetchBoards()
  }

  showAddBoardModal = () => {
    this.refs.addmodal.clearNameField()
    this.props.changeBoardModalStatuses(addModalEnabled)
  }

  closeAddBoardModal = () => {
    this.props.changeBoardModalStatuses(allModalsDisabled)
  }

  addBoard = (boardName) => {
    this.props.addBoardAction({
      name: boardName})
  }

  showEditBoardModal = (board) => {
    this.setState({
      activeBoard: board,
    })
    this.refs.editmodal.setGroupNameField(board.name)
    this.props.changeBoardModalStatuses(editModalEnabled)
  }

  closeEditBoardModal = () => {
    this.props.changeBoardModalStatuses(allModalsDisabled)
  }

  saveBoard = (newGroupName) => {
    this.props.editBoardAction({name: newGroupName, boardId: this.state.activeBoard.id})
  }

  showDeleteBoardModal = (board) => {
    this.setState({
      activeBoard: board,
    })
    this.props.changeBoardModalStatuses(deleteModalEnabled)
  }

  closeDeleteBoardModal = () => {
    this.props.changeBoardModalStatuses(allModalsDisabled)
  }

  deleteBoard = () => {
    this.props.deleteBoardAction({boardId: this.state.activeBoard.id})
  }

  render() {
    return (
      <div className={css.page}>
        {/* <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right"></ToastContainer> */}
        <AddBoardModal ref='addmodal'
          show={this.props.modalStatuses.isAddBoardModalOpen}
          onSave={(groupName) => {this.addBoard(groupName)}}
          onCancel={this.closeAddBoardModal}>
        </AddBoardModal>
        <EditBoardModal ref='editmodal'
          show={this.props.modalStatuses.isEditBoardModalOpen}
          onSave={(groupName) => {this.saveBoard(groupName)}}
          onCancel={this.closeEditBoardModal}>
        </EditBoardModal>
        <DeleteBoardModal
          boardName={this.state.activeBoard.name}
          show={this.props.modalStatuses.isDeleteBoardModalOpen}
          onDelete={() => {this.deleteBoard()}}
          onCancel={this.closeDeleteBoardModal}>
        </DeleteBoardModal>
        <Header></Header>
        <div className={css.content}>
          <div className={css.container}>
            <div className={css.sectionHeaderContainer}>
              <div className={css.sectionHeaderLayout}>
                <h3><span>{this.props.boards.length} BOARDS</span></h3>
              </div>
              <div className={css.sectionHeaderActions}>
                <button className={css.btnAdd} onClick={this.showAddBoardModal}><span>+</span></button>

              </div>
            </div>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className={css.actionColumn}></th>
                </tr>
              </thead>
              {this.props.boards.length > 0 ?
                (
                  <tbody>
                  {
                    this.props.boards.map((board) =>
                      <tr key={board.id}>
                      <td><a href={`/${board.id}`}>{board.name}</a></td>
                      <td>
                        <button className={css.btnAction} onClick={() => this.showEditBoardModal(board)}>
                          <span className='fa fa-edit'></span>
                        </button>
                        <button className={css.btnAction} onClick={() => this.showDeleteBoardModal(board)}>
                          <span className='fa fa-trash'></span>
                        </button>
                      </td>
                    </tr>
                    )
                  }
                  </tbody>
                ) :
                (
                  <tbody>
                    <tr>
                        <td colSpan="3">No added boards</td>
                    </tr>
                  </tbody>
                )
              }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  boards: getBoards(state),
  modalStatuses: getBoardModals(state),
})

export default connect(mapStateToProps, {fetchBoards, addBoardAction, editBoardAction, deleteBoardAction, changeBoardModalStatuses})(Boards)
