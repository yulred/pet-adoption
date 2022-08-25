import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { ITextInputProps } from "../../utils/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormInputField({ fieldName, fieldType, fieldLabel, req }: ITextInputProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      isRequired={req}
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel>{fieldLabel}</FormLabel>
      <Field
        as={Input}
        name={fieldName}
        type={fieldType}
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      />
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}