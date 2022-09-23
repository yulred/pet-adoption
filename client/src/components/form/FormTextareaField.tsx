import { FormControl, FormLabel, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormTextareaField({ fieldName, fieldLabel, req }: IFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      isRequired={req}
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel>{fieldLabel}</FormLabel>
      <Field
        as={Textarea}
        name={fieldName}
        resize="vertical"
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      />
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}