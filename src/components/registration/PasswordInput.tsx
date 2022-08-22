import { useState } from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import { IPasswordProps, IFormikContext } from "../../utils/interfaces/form.interface";
import { useFormikContext } from "formik";

export default function PasswordInput({ fieldName }: IPasswordProps) {
  const { values, handleChange } = useFormikContext<IFormikContext>();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        name={fieldName} value={fieldName === "password" ? values.password : values.passwordConfirm}
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}