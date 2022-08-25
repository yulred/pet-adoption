import { Button, Icon } from "@chakra-ui/react";
import { IPetButton } from "../../utils/interfaces/pets.interface";

export default function PetDetailsButton({ icon, action, label }: IPetButton) {

  return (
    <Button
      leftIcon={<Icon as={icon}/>}
      colorScheme="teal"
      variant="solid"
      alignItems="center"
      minW="7.5rem"
      onClick={() => action()}
    >
      {label}
    </Button>
  )
}