import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {minLength, required} from './Validations'
import css from '../styles/common.css'

const minLength_1 = minLength(1)

const textInput = ({input, placeholder, type, meta: {touched, error, warning}}: object) => {
  return (
    <div className={css.formGroup}>
      <label htmlFor="name" className={css.controlLabel}>
        <span>Note Message</span>
      </label>
      <span className={css.inputGroup}>
        <input {...input} placeholder={placeholder} type={type} className={css.formInput}/>
        {touched && ((error && <div className={css.validationText}>{error}</div>) || (warning && <div className={css.validationText}>{warning}</div>))}
      </span>
    </div>
  )
}

type AddNoteFormProps = {
  handleSubmit: Function,
  onCancel: Function,
  closeModal: Function,
  noteMessage: string,
  invalid: boolean,
}
export class AddNoteForm extends Component {
  props: AddNoteFormProps

  closeModal = () => {
    this.props.onCancel()
  }

  render() {
    const {handleSubmit, invalid} = this.props

    return (
    <div className={css.modalBackdrop}>
      <div className={css.modal}>
        <div className={css.modalHeader}>
          <h1>Add Note</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={css.modalBody}>
            <Field name="message" type="text"
              component={textInput} placeholder="Enter Note Message"
              validate={[required, minLength_1]}
            />
          </div>
          <div className={css.modalFooter}>
            <button type="button" onClick={this.closeModal} className={css.btnCancel}>Cancel</button>
            <button type="submit" disabled={invalid} className={css.btnPrimary}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

AddNoteForm = reduxForm({
  form: 'addNoteForm',
})(AddNoteForm)

// Decorate with connect to read form values
const selector = formValueSelector('addNoteForm') // <-- same as form name
export default connect(
  state => {
    const noteMessage = selector(state, 'message')
    return {
      noteMessage,
    }
  }
)(AddNoteForm)
