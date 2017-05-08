import React, {Component} from 'react'
import css from '../styles/common.css'

type DeleteModalProps = {
  boardName: string,
  onCancel: Function,
  onDelete: Function
}

export class DeleteBoardModal extends Component {
  props: DeleteModalProps

  render() {
    return (
      <div className={css.modalBackdrop}>
        <div className={css.modal}>
          <div className={css.modalHeader}>
            <h1>Delete Board</h1>
          </div>
          <div className={css.modalBody}>
            <p>Are you sure you want to delete board: {this.props.boardName}?</p>
          </div>
          <div className={css.modalFooter}>
            <button onClick={this.props.onCancel} className={css.btnCancel}>Cancel</button>
            <button onClick={this.props.onDelete} className={css.btnDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}
