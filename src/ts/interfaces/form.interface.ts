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