import { Flex, Button, Icon } from "@chakra-ui/react";
import { GiFlamingo, GiHouse, GiReturnArrow } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";

export default function PetDetailsActions() {

  return (
    <Flex wrap="wrap" justify="center" gap={2}>
      <Button 
        leftIcon={<Icon as={GiFlamingo}/>}
        colorScheme="teal"
        variant="solid"
        alignItems="center"
        minW="7.5rem"
        //onClick={}
      >
        Adopt
      </Button>
      <Button
        leftIcon={<Icon as={GiHouse} />}
        colorScheme="teal"
        variant="solid"
        alignItems="center"
        minW="7.5rem"
        //onClick={}
      >
        Foster
      </Button>
      <Button
        leftIcon={<Icon as={GiReturnArrow} />}
        colorScheme="teal"
        variant="solid"
        alignItems="center"
        minW="7.5rem"
        //onClick={}
      >
        Return
      </Button>
      <Button
        leftIcon={<Icon as={BsStarFill}/>}
        colorScheme="teal"
        variant="solid"
        alignItems="center"
        minW="7.5rem"
        //onClick={}
      >
        Favourite
      </Button>
    </Flex>
  )
}