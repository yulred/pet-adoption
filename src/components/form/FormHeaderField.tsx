import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormHeaderField({ fieldName, fieldLabel, req }: IFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      display="flex"
      alignItems="center"
      className="form-header"
      mb={12}
      isRequired={req}
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel className="form-header-label">{fieldLabel}</FormLabel>
      <Field
        as={Input}
        name={fieldName}
        px={2}
        pb="6px"
        variant="flushed"
        className="form-header-input"
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      />
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}