// @flow

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getBoards, getNumberOfHiddenBoards, getBoardModals, getSortOrder, getPaginatedBoards, getActivePage, getPageSize, getSearchValue} from './selectors'
import {fetchBoards, addBoardAction, editBoardAction, deleteBoardAction, changeBoardSortOrder, setActiveBoardPage,
  setBoardSearchValue, setBoardPageSize, changeBoardModalStatuses} from './actions'
import {DeleteBoardModal} from './DeleteBoardModal'
import {AddBoardForm} from './AddBoardForm'
import {EditBoardForm} from './EditBoardForm'
import {Header} from '../common/Header'
import {EmptyTableFooter} from '../common/EmptyTableFooter'
import {SectionHeader} from '../common/SectionHeader'
import {Pagination} from '../common/Pagination'
import css from '../styles/common.css'

import type {RootState} from '$src/root/types'
import type {Board, BoardModalType} from './types'

const addModalEnabled = {isAddBoardModalOpen: true, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false}
const editModalEnabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: true, isDeleteBoardModalOpen: false}
const deleteModalEnabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: true}
export const allModalsDisabled = {isAddBoardModalOpen: false, isEditBoardModalOpen: false, isDeleteBoardModalOpen: false}

type Props = {
  boards: Array<Board>,
  hiddenBoardsAmount: number,
  paginatedBoards: Array<Board>,
  sortAsc: boolean,
  activePage: number,
  pageSize: number,
  searchValue: string,
  modalStatuses: BoardModalType,
  fetchBoards: Function,
  addBoardAction: Function,
  editBoardAction: Function,
  deleteBoardAction: Function,
  changeBoardSortOrder: Function,
  setActiveBoardPage: Function,
  setBoardSearchValue: Function,
  setBoardPageSize: Function,
  changeBoardModalStatuses: Function,
  submitBoard: Function,
  params: React.PropTypes.object,
}

const sortStyle = {
  marginLeft: '10px',
}
const sortableHeader = {
  cursor: 'pointer',
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
  setActivePage = (page) => {
    this.props.setActiveBoardPage({pagenumber: page})
  }
  setPageSize = (e) => {
    this.props.setBoardPageSize({size: e.target.value})
  }
  setSearchValue = (e) => {
    this.props.setBoardSearchValue({text: e.target.value})
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
            <SectionHeader hiddenItemsN={this.props.hiddenBoardsAmount}  search={this.setSearchValue} searchValue={this.props.searchValue} title='Boards' amount={this.props.boards.length} buttonAction={this.showAddBoardModal}></SectionHeader>
            <table className={css.table}>
              <thead>
                <tr>
                  <th style={sortableHeader} onClick={this.props.changeBoardSortOrder}>
                    <span>Name</span>
                    {this.props.sortAsc ?
                      ( <span className="fa fa-sort-amount-asc" style={sortStyle}></span> ) :
                      ( <span className="fa fa-sort-amount-desc" style={sortStyle}></span> )
                    }
                  </th>
                  <th className={css.actionColumn}></th>
                </tr>
              </thead>
              {this.props.boards.length > 0 ?
                (
                  <tbody>
                  {
                    this.props.paginatedBoards.map((board) =>
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
                  <EmptyTableFooter cols='3' text='No boards found' />
                )
              }
            </table>
            <Pagination selectPageSize={this.setPageSize} selectPage={this.setActivePage} arraySize={this.props.boards.length} pageSize={this.props.pageSize} activePage={this.props.activePage}></Pagination>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  boards: getBoards(state),
  hiddenBoardsAmount: getNumberOfHiddenBoards(state),
  paginatedBoards: getPaginatedBoards(state),
  activePage: getActivePage(state),
  pageSize: getPageSize(state),
  sortAsc: getSortOrder(state),
  searchValue: getSearchValue(state),
  modalStatuses: getBoardModals(state),
})

export default connect(mapStateToProps, {fetchBoards, addBoardAction, editBoardAction, deleteBoardAction, changeBoardSortOrder, setBoardSearchValue,
  setActiveBoardPage, setBoardPageSize, changeBoardModalStatuses})(Boards)
