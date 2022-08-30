import { useState } from "react";
import { FormControl,FormLabel, InputGroup, Input, InputRightElement, Button, FormErrorMessage } from "@chakra-ui/react";
import { IFieldProps } from "../../ts/interfaces/form.interface";
import { useFormikContext,Field } from "formik";

export default function FormPasswordField({ fieldName, fieldLabel, req }: IFieldProps) {
  const { values, errors, touched, handleChange } = useFormikContext<object | Function>();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isRequired={req} isInvalid={errors[fieldName as keyof typeof errors] !== undefined && touched[fieldName as keyof typeof errors]}>
      <FormLabel>{fieldLabel}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          type={show ? "text" : "password"}
          name={fieldName}
          value={values[fieldName as keyof typeof values]}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors[fieldName as keyof typeof errors]}</FormErrorMessage>
    </FormControl>
  )
}