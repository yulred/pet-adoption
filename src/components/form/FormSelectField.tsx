import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";
import { ISelectFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormSelectField({ fieldName, fieldLabel, fieldArray }: ISelectFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();

  return (
    <FormControl
      display="flex"
      alignItems="center"
      isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}
    >
      <FormLabel w="8rem">{fieldLabel}</FormLabel>
      <Field
        as={Select}
        name={fieldName}
        w="12rem"
        value={values[fieldName as keyof typeof values]}
        onChange={handleChange}
      >
        {fieldArray.map(item => <option key={item} value={`${item}`}>{item}</option>)}
      </Field>
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}