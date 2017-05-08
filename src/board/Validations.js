export const minLength = min => value => value && value.length < min && `Minimum length is ${ min }` || undefined
export const required = value => value ? undefined : 'Required field'
export const maxLength = max => value =>
value && value.length > max ? `Maximum length is ${max}` : undefined
