import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {required} from '../common/Validations'
import css from '../styles/common.css'
import {FormTextInput} from '../common/FormTextInput'

type EditNoteFormProps = {
  handleSubmit: Function,
  onCancel: Function,
  closeModal: Function,
  noteMessage: string,
  invalid: boolean,
}
export class EditNoteForm extends Component {
  props: EditNoteFormProps

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
            <Field name="message" type="text" label='Note Message'
              component={FormTextInput} placeholder="Enter Note Message"
              validate={[required]}
            />
          </div>
          <div className={css.modalFooter}>
            <button type="button" onClick={this.closeModal} className={css.btnCancel}>Cancel</button>
            <button type="submit" disabled={invalid} className={css.btnPrimary}>Save</button>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

EditNoteForm = reduxForm({
  form: 'editNoteForm',
})(EditNoteForm)

// Decorate with connect to read form values
const selector = formValueSelector('editNoteForm')
export default connect(
  state => {
    const noteMessage = selector(state, 'message')
    return {
      noteMessage,
    }
  }
)(EditNoteForm)
