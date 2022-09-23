import { FormControl, FormLabel, Input, FormErrorMessage, Text } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormInputField({ fieldName, fieldLabel, fieldUnit, fieldSize, req }: IFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      display="flex"
      flexFlow="row wrap"
      alignItems="center"
      isRequired={req}
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel w={fieldSize ? "8rem" : "100%"}>{fieldLabel}</FormLabel>
      <Field
        as={Input}
        name={fieldName}
        w={fieldSize ? fieldSize : "100%"}
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      />
      <Text fontSize="md" mx={2}>{fieldUnit}</Text>
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}