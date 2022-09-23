import { FormControl, FormLabel, Input, FormErrorMessage, Heading } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormHeaderField({ fieldName, fieldLabel, req }: IFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      display="flex"
      alignItems="center"
      mb={12}
      isRequired={req}
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel display="flex"><Heading size="lg">{fieldLabel}</Heading></FormLabel>
      <Field
        as={Input}
        name={fieldName}
        px={2}
        mr={2}
        variant="flushed"
        fontWeight="bold"
        fontSize="2xl"
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      />
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}