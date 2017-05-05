import React, {Component} from 'react'
import css from '../styles/common.css'

type AddModalProps = {
  show: boolean,
  onSave: Function,
  onCancel: Function
}

export class AddBoardModal extends Component {
  props: AddModalProps

  constructor(props) {
    super(props)
    this.state = {
      textVal: '',
    }
  }

  handleChange = (evt) => {
    this.setState(
      {textVal: evt.target.value.substr(0, 100)})
  }

  addGroupButtonAction = () => {
    this.props.onSave(this.state.textVal)
  }

  clearNameField = () => {
    this.setState(
      {textVal: ''}
    )
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null
    }

    return (
      <div className={css.modalBackdrop}>
        <div className={css.modal}>
          <div className={css.modalHeader}>
            <h1>Add Board</h1>
          </div>
          <div className={css.modalBody}>
            <div className={css.formGroup}>
              <label htmlFor="name" className={css.controlLabel}>
                <span>Board Name</span>
              </label>
              <span className={css.inputGroup}>
                <input name="name" placeholder="Enter Board Name"
                  className={css.formInput}
                  value={this.state.textVal}
                  onChange={this.handleChange}/>
              </span>
            </div>
          </div>
          <div className={css.modalFooter}>
            <button onClick={this.props.onCancel} className={css.btnCancel}>Cancel</button>
            <button onClick={this.addGroupButtonAction} className={css.btnPrimary}
              disabled={!this.state.textVal || this.state.textVal.length > 40 || this.state.textVal.length < 3}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}

type EditModalProps = {
  show: boolean,
  onSave: Function,
  onCancel: Function
}

export class EditBoardModal extends React.Component {
  props: EditModalProps

  constructor(props) {
    super(props)
    this.state = {
      textVal: '',
    }
  }

  handleChange = (evt) => {
    this.setState(
      {textVal: evt.target.value.substr(0, 100)})
  }

  saveGroupButtonAction = () => {
    this.props.onSave(this.state.textVal)
  }

  setGroupNameField = (name) => {
    this.setState(
      {textVal: name}
    )
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null
    }

    return (
      <div className={css.modalBackdrop}>
        <div className={css.modal}>
          <div className={css.modalHeader}>
            <h1>Edit Board</h1>
          </div>
          <div className={css.modalBody}>
            <div className={css.formGroup}>
              <label htmlFor="name" className={css.controlLabel}>
                <span>Board Name</span>
              </label>
              <span className={css.inputGroup}>
                <input name="name" placeholder="Enter Board Name"
                  className={css.formInput}
                  value={this.state.textVal}
                  onChange={this.handleChange}/>
              </span>
            </div>
          </div>
          <div className={css.modalFooter}>
            <button onClick={this.props.onCancel} className={css.btnCancel}>Cancel</button>
            <button onClick={this.saveGroupButtonAction} className={css.btnPrimary}
              disabled={!this.state.textVal || this.state.textVal.length > 40 || this.state.textVal.length < 3}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

type DeleteModalProps = {
  show: boolean,
  boardName: string,
  onCancel: Function,
  onDelete: Function
}

export class DeleteBoardModal extends React.Component {
  props: DeleteModalProps

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null
    }

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
