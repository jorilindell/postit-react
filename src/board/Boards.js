// @flow

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchBoards, addBoardAction, editBoardAction, deleteBoardAction, changeBoardModalStatuses} from './actions'
import {DeleteBoardModal} from './DeleteBoardModal'
import {AddBoardForm} from './AddBoardForm'
import {EditBoardForm} from './EditBoardForm'
import {getBoards, getBoardModals} from './selectors'
import {Header} from '../common/Header'
import {EmptyTableFooter} from '../common/EmptyTableFooter'
import {SectionHeader} from '../common/SectionHeader'
import css from '../styles/common.css'

import type {RootState} from '$src/root/types'
import type {Board, BoardModalType} from './types'

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
  submitBoard: Function
}

export class Boards extends Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      activeBoard: {id: 0, name: ''},
    }
  }

  componentWillMount() {
    this.props.fetchBoards()
  }

  showAddBoardModal = () => {
    //this.refs.addmodal.clearNameField()
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
  submitBoard = () => {

  }
  render() {
    return (
      <div className={css.page}>
        {this.props.modalStatuses.isAddBoardModalOpen &&
          <AddBoardForm  onCancel={this.closeAddBoardModal} onSubmit={(group) => {this.addBoard(group.name)}} initialValues={{name: ''}}/>
        }
        {this.props.modalStatuses.isEditBoardModalOpen &&
          <EditBoardForm  ref='addmodal' onCancel={this.closeEditBoardModal} onSubmit={(group) => {this.saveBoard(group.name)}} initialValues={{name: this.state.activeBoard.name}}/>
        }
        {this.props.modalStatuses.isDeleteBoardModalOpen &&
          <DeleteBoardModal boardName={this.state.activeBoard.name} onDelete={() => {this.deleteBoard()}} onCancel={this.closeDeleteBoardModal}></DeleteBoardModal>
        }
        <Header></Header>
        <div className={css.content}>
          <div className={css.container}>
            <SectionHeader title='Boards' amount={this.props.boards.length} buttonAction={this.showAddBoardModal}></SectionHeader>
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
                  <EmptyTableFooter cols='3' text='No added boards' />
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
