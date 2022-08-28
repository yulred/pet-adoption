export interface IFormModalProps {
  isOpen: boolean,
  toggleModal: Function,
}

export interface ITextInputProps {
  fieldName: string,
  fieldType: string,
  fieldLabel: string,
  req: boolean,
}

export interface ITextAreaProps {
  fieldName: string,
  fieldLabel: string,
  req: boolean,
}

export interface IPasswordProps {
  fieldName: string,
  fieldLabel: string,
  req: boolean,
}

export interface ISubmitButtonProps {
  buttonLabel: string,
}