import { useState } from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import { IPasswordProps } from "../../utils/interfaces/form.interface";

export default function PasswordInput({ handleUserInput, fieldName }: IPasswordProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input type={show ? "text" : "password"} name={fieldName} onChange={(e) => handleUserInput(e)} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}