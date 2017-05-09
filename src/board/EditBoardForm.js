import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {minLength, maxLength, required} from '../common/Validations'
import css from '../styles/common.css'
import {FormTextInput} from '../common/FormTextInput'

const minLength_3 = minLength(3)
const maxLength_40 = maxLength(40)

type EditBoardFormProps = {
  handleSubmit: Function,
  onCancel: Function,
  closeModal: Function,
  boardName: string,
  invalid: boolean,
}

export class EditBoardForm extends Component {
  props: EditBoardFormProps

  closeModal = () => {
    this.props.onCancel()
  }

  render() {
    const {handleSubmit, invalid} = this.props

    return (
    <div className={css.modalBackdrop}>
      <div className={css.modal}>
        <div className={css.modalHeader}>
          <h1>Add Board</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={css.modalBody}>
            <Field name="name" type="text" label='Board Name'
              component={FormTextInput} placeholder="New value"
              validate={[required, minLength_3, maxLength_40]}
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

EditBoardForm = reduxForm({
  form: 'editBoardForm',
})(EditBoardForm)

// Decorate with connect to read form values
const selector = formValueSelector('editBoardForm') // <-- same as form name
export default connect(
  state => {
    const boardName = selector(state, 'name')
    return {
      boardName,
    }
  }
)(EditBoardForm)
