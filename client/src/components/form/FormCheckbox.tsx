import { Checkbox } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext, Field } from "formik";

export default function FormCheckbox({ fieldName, fieldLabel, isChecked }: IFieldProps) {
  const { handleChange } = useFormikContext<object | Function>();

  return (
      <Field
        as={Checkbox}
        name={fieldName}
        mt={4}
        w="100%"
        flexDirection="row-reverse"
        justifyContent="start"
        gap={8}
        defaultChecked={isChecked}
        onChange={handleChange}
      >
        {fieldLabel}
      </Field>
  )
}