export interface IFormModalProps {
  isOpen: boolean,
  toggleModal: Function,
}

export interface IFieldProps {
  fieldName: string,
  fieldLabel: string,
  fieldUnit?: string,
  fieldSize?: string,
  isChecked?: boolean,
  req?: boolean,
}

export interface ISelectFieldProps {
  fieldName: string,
  fieldLabel: string,
  fieldArray: string[],
}

export interface ISubmitButtonProps {
  buttonLabel: string,
}