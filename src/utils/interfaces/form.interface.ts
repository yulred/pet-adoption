export interface IFormModalProps {
  isOpen: boolean,
  toggleModal: Function,
}

export interface IPasswordProps {
  fieldName: string,
}

export interface IFormikContext {
  fieldName: string,
  password: string,
  passwordConfirm: string,
  handleChange: Function,
}