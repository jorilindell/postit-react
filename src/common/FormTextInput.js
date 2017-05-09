import React from 'react'
import css from '../styles/common.css'

export const FormTextInput = ({input, placeholder, type, label, meta: {touched, error, warning}}: object) => {
  return (
    <div className={css.formGroup}>
      <label htmlFor="name" className={css.controlLabel}>
        <span>{label}</span>
      </label>
      <span className={css.inputGroup}>
        <input {...input} placeholder={placeholder} type={type} className={css.formInput}/>
        {touched && ((error && <div className={css.validationText}>{error}</div>) || (warning && <div className={css.validationText}>{warning}</div>))}
      </span>
    </div>
  )
}
