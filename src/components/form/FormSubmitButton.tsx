import { Button} from "@chakra-ui/react";
import { ISubmitButtonProps } from "../../utils/interfaces/form.interface";

export default function FormSubmitButton({ buttonLabel }: ISubmitButtonProps) {

  return (
    <div className="submit-button">
      <Button mt={4} colorScheme="teal" type="submit">{buttonLabel}</Button>
    </div>
  )
}