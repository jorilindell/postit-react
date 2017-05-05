import React, {Component} from 'react'
import css from '../styles/common.css'

type AddModalProps = {
  show: boolean,
  onSave: Function,
  onCancel: Function
}

export class AddNoteModal extends Component {
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

  addNoteButtonAction = () => {
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
            <h1>Add Note</h1>
          </div>
          <div className={css.modalBody}>
            <div className={css.formGroup}>
              <label htmlFor="message" className={css.controlLabel}>
                <span>Message</span>
              </label>
              <span className={css.inputGroup}>
                <input name="message" placeholder="Enter Message"
                  className={css.formInput}
                  value={this.state.textVal}
                  onChange={this.handleChange}/>
              </span>
            </div>
          </div>
          <div className={css.modalFooter}>
            <button onClick={this.props.onCancel} className={css.btnCancel}>Cancel</button>
            <button onClick={this.addNoteButtonAction} className={css.btnPrimary} disabled={!this.state.textVal}>Add</button>
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

export class EditNoteModal extends React.Component {
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

  saveNoteButtonAction = () => {
    this.props.onSave(this.state.textVal)
  }

  setMessageField = (message) => {
    this.setState(
      {textVal: message}
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
            <h1>Edit Note</h1>
          </div>
          <div className={css.modalBody}>
            <div className={css.formGroup}>
              <label htmlFor="message" className={css.controlLabel}>
                <span>Message</span>
              </label>
              <span className={css.inputGroup}>
                <input name="message" placeholder="Enter Message"
                  className={css.formInput}
                  value={this.state.textVal}
                  onChange={this.handleChange}/>
              </span>
            </div>
          </div>
          <div className={css.modalFooter}>
            <button onClick={this.props.onCancel} className={css.btnCancel}>Cancel</button>
            <button onClick={this.saveNoteButtonAction} className={css.btnPrimary} disabled={!this.state.textVal}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

type DeleteModalProps = {
  show: boolean,
  message: string,
  onCancel: Function,
  onDelete: Function
}

export class DeleteNoteModal extends React.Component {
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
            <h1>Delete Note</h1>
          </div>
          <div className={css.modalBody}>
            <p>Are you sure you want to delete note: {this.props.message}?</p>
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
